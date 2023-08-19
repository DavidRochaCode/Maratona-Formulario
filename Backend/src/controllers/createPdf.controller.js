const html = require ("../views/createPdfTemplate")
const pdf = require('html-pdf');

// Opções de configuração para a biblioteca html-pdf
const options = {
    format: 'A4',
    orientation: 'portrait',
};

const pdfTransporter = function (nome, cpf, email, cursoFaculdade, periodoFaculdade, faculdadeNome, nomeEquipe) {
    return new Promise((resolve, reject) => {
      const pdfPath = `confirmacao_de_inscrição_${email}.pdf`; 
  
      pdf.create(html(nome, cpf, email, cursoFaculdade, periodoFaculdade, faculdadeNome, nomeEquipe), options).toFile(pdfPath, function (err, res) {
        if (err) {
          console.error(`Erro ao criar o PDF: ${err}`);
          reject(err);
          return;
        }
        console.log(`PDF criado em: ${res.filename}`);
        resolve(pdfPath);
      });
    });
  };

module.exports = pdfTransporter
