const fs = require('fs');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

async function pdfTransporter(nome, cpf, email, cursoFaculdade, periodoFaculdade, faculdadeNome, nomeEquipe) {
    // Crie um novo documento PDF
    const doc = new PDFDocument();
    const pdfPath = `confirmacao_de_inscricao_${email}.pdf`; // Defina o caminho do arquivo PDF
    const outputStream = fs.createWriteStream(pdfPath);

    // Pipe o conteúdo do PDF para um arquivo
    doc.pipe(outputStream);

    // Centralize todo o conteúdo na página
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const contentWidth = 400;
    const xPosition = (pageWidth - contentWidth) / 2;

    // Defina estilos de fonte para títulos e conteúdo
    doc.font('Helvetica-Bold');
    const titleFont = 'Helvetica-Bold';
    const regularFont = 'Helvetica';

    // Adicione um fundo colorido para cada seção
    const backgroundColor = '#f0f0f0';

    // Função para criar uma caixa com um fundo colorido e título em negrito
    function createBox(title, content, color, justifyText = false) {
        const titleFontSize = 11;
        const regularFontSize = 10;

        doc.rect(xPosition, doc.y, contentWidth, doc.currentLineHeight() + 20).fill(color);

        doc.fontSize(titleFontSize);
        doc.fillColor('#6c043c').font(titleFont).text(title, xPosition, doc.y + 10, { align: 'center', width: contentWidth });

        doc.moveDown(0.5);

        doc.fontSize(regularFontSize);
        doc.fillColor('#000').font(regularFont);

        if (justifyText) {
            doc.text(content, { align: 'justify', width: contentWidth, continued: false });
        } else {
            doc.text(content, { align: 'left', width: contentWidth, continued: false });
        }

        doc.moveDown(1);
    }

    let participanteData = "";

    if (nomeEquipe === "Sem Equipe") {
        participanteData = 
        `
         Confirmamos a participação do(a) estudante ${nome}, atualmente no ${periodoFaculdade}º período do curso de ${cursoFaculdade} na ${faculdadeNome},
         sob o número de CPF ${cpf}, na prestigiada Maratona de Programação - 2023.

         O(A) estudante ${nome} encontra-se sem equipe.
        `;
    } else {
        participanteData = 
        `
         Confirmamos a participação do(a) estudante ${nome}, atualmente no ${periodoFaculdade}º período do curso de ${cursoFaculdade} na ${faculdadeNome},
         sob o número de CPF ${cpf}, na prestigiada Maratona de Programação - 2023.

         O(A) estudante ${nome} estará contribuindo como membro da equipe "${nomeEquipe}". 
        `;
    }

   // Defina as informações sobre a maratona como uma lista HTML
const maratonaData = 
`
- Data da Maratona: 14/09/2023
- Horário: 09:30am - 17:30pm
- Endereço: Universidade de Pernambuco, campus Garanhuns, localizada na Rua Cap. Pedro Rodrigues - São José.
`;

// Defina outras informações como uma lista HTML
const outrasInformacoes = 
`
- A maratona envolve equipes de desenvolvedores solucionando desafios de programação.
- Os problemas têm diferentes níveis de dificuldade.
- As equipes podem escolher qualquer linguagem de programação.
- É proibido o uso de dispositivos eletrônicos e acesso à Internet durante a competição.
- As equipes podem discutir apenas internamente e a submissão de soluções é feita na plataforma do evento.
- Um problema é considerado resolvido se passar em todos os testes.
- A equipe vencedora é a que resolve a maior quantidade de problemas no tempo definido.
- Os participantes são responsáveis por suas despesas de transporte, hospedagem, alimentação, etc.
`;


    // Adicione as seções com fundo colorido e títulos em negrito
    createBox('CONFIRMAÇÃO', participanteData, backgroundColor, true); // Texto justificado
    createBox('INFORMAÇÕES SOBRE A MARATONA', maratonaData, backgroundColor, true); // Texto justificado
    createBox('OUTRAS INFORMAÇÕES', outrasInformacoes, backgroundColor, true);

    // Gere o QR code
    const qrCodeValue = cpf; // Use o CPF como valor para o QR code

    // Use o método toDataURL da biblioteca qrcode para gerar o QR code em formato de dados URL
    QRCode.toDataURL(qrCodeValue, { errorCorrectionLevel: 'H' }, function (err, url) {
        if (err) {
            console.error(err);
            return;
        }

        // Defina a posição horizontal da imagem do QR code
        const qrCodeWidth = 150;
        const qrCodeHeight = 150;
        const imageXPosition2 = (pageWidth - qrCodeWidth) / 2;

        // Adicione o QR code ao rodapé
        doc.image(url, imageXPosition2, pageHeight - qrCodeHeight - 20, {
            width: qrCodeWidth,
            height: qrCodeHeight
        });

        // Finalize o documento PDF
        doc.end();

        console.log('PDF criado com sucesso no caminho: ' + pdfPath);
    });
}

module.exports = pdfTransporter;
