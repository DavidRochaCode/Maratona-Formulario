const { exec } = require('child_process');
const fs = require('fs/promises'); // Para trabalhar com sistema de arquivos

const html = require('../views/createPdfTemplate');

const pdfTransporter = async function (nome, cpf, email, cursoFaculdade, periodoFaculdade, faculdadeNome, nomeEquipe) {
  const htmlContent = html(nome, cpf, email, cursoFaculdade, periodoFaculdade, faculdadeNome, nomeEquipe);

  const pdfPath = `confirmacao_de_inscricao_${email}.pdf`; // Caminho para salvar o PDF

  // Salva o HTML em um arquivo temporário
  const tempHtmlPath = '/tmp/temp.html'; // Caminho temporário para o arquivo HTML
  await fs.writeFile(tempHtmlPath, htmlContent, 'utf-8');

  // Comando para converter HTML para PDF usando wkhtmltopdf
  const command = `wkhtmltopdf ${tempHtmlPath} ${pdfPath}`;

  // Executa o comando
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao criar o PDF: ${error}`);
      return;
    }

    console.log('PDF criado com sucesso!');

    // Remove o arquivo HTML temporário
    await fs.unlink(tempHtmlPath);

    // Agora você pode continuar com a manipulação do PDF, como envio por email, etc.
    // Retorne o caminho do PDF gerado
    resolve(pdfPath);
  });
};

module.exports = pdfTransporter;
