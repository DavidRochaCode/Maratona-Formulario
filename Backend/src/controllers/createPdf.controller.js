const puppeteer = require('puppeteer');
const fs = require('fs');
const util = require('util');
const html = require ("../views/createPdfTemplate")
const writeFile = util.promisify(fs.writeFile);

const pdfTransporter = async function (nome, cpf, email, cursoFaculdade, periodoFaculdade, faculdadeNome, nomeEquipe) {
  const pdfPath = `../pdf/confirmacao_de_inscrição_${email}.pdf`;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Gere o conteúdo HTML que deseja converter em PDF
    const htmlContent = html(nome, cpf, email, cursoFaculdade, periodoFaculdade, faculdadeNome, nomeEquipe);

    await page.setContent(htmlContent);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
    });

    await browser.close();
    console.log(`PDF criado em: ${pdfPath}`);
    return pdfPath;
  } catch (error) {
    console.error(`Erro ao criar o PDF: ${error}`);
    throw error;
  }
};

module.exports = pdfTransporter;