const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const emailTemplate = require("../views/sendEmailsTemplate");
const pdfTransporter = require("../controllers/createPdf.controller");
const fs = require('fs').promises;
require("dotenv").config();
const { format } = require('date-fns');

const prisma = new PrismaClient();

// Configuração do provedor
// Habilitar 2 step verification e criar um app password no seu provedor de email, antes de rodar a api.

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Função para enviar e-mails com anexos personalizados
const sendEmail = async (to, subject, text, pdfPath) => {
  const mailOptions = {
    from: 'manoeudavi20@gmail.com',
    to: to,
    subject: subject,
    html: text,
    attachments: [
      {
        filename: pdfPath, // Nome do arquivo PDF no anexo
        path: pdfPath, // Caminho para o arquivo PDF personalizado
      },
    ],
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email com anexo do PDF enviado para ${to}`);
  } catch (error) {
    console.error(`Erro ao enviar email para ${to}: ${error}`);
  }
};

exports.sendEmailParticipante = async (req, res) => {
  const cpf = req.params.cpf;

  // Verificar se existe um usuário com o cpf fornecido
  try {
    const user = await prisma.usuario.findUnique({
      where: {
        cpf: cpf,
      },
      select: {
        nome: true,
        cpf: true,
        email: true,
        cursoFaculdade: true,
        periodoFaculdade: true,
        faculdadeNome: true,
        equipe:{
          select:{
            nomeEquipe:true,
          }
        }
      },
    });

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    const { nome, email, cursoFaculdade, periodoFaculdade, faculdadeNome, equipe:{nomeEquipe} } = user;
    const pdfPath = await pdfTransporter(nome, cpf, email, cursoFaculdade, periodoFaculdade, faculdadeNome, nomeEquipe); // Gera o PDF personalizado
    const caminhoDoPdf = `../pdf/confirmacao_de_inscrição_${email}.pdf`; // Caminho do PDF gerado na mesma pasta que pdfTransporter
    await sendEmail(email, 'Confirmação de participação', emailTemplate(nome), caminhoDoPdf);
    await fs.unlink(pdfPath); // Exclui o arquivo PDF após o envio do email
    console.log(`PDF ${pdfPath} excluído após o envio do email.`);
      
    await prisma.$disconnect(); // Fechar a conexão com o Prisma após o uso

    res.status(200).send('Email enviado com sucesso!');
  } catch (error) {
    console.error(`Erro ao enviar o Email: ${error}`);
    res.status(500).send('Erro ao enviar o email');
  }
};
