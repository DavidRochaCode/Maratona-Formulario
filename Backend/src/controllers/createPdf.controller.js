const fs = require('fs');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

async function pdfTransporter(nome, cpf, email, cursoFaculdade, periodoFaculdade, faculdadeNome, nomeEquipe) {
    // Crie um novo documento PDF
    const doc = new PDFDocument();
    const outputStream = fs.createWriteStream(`confirmacao_de_inscricao_${email}.pdf`);

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
    function createBox(title, content, color) {
        const titleFontSize = 11;
        const regularFontSize = 10;

        doc.rect(xPosition, doc.y, contentWidth, doc.currentLineHeight() + 20).fill(color);

        doc.fontSize(titleFontSize);
        doc.fillColor('#6c043c').font(titleFont).text(title, xPosition, doc.y + 10, { align: 'center', width: contentWidth });

        doc.moveDown(0.5);

        doc.fontSize(regularFontSize);
        doc.fillColor('#000').font(regularFont).text(content, { align: 'left', width: contentWidth, continued: false });

        doc.moveDown(1);
    }

    // Defina os dados do participante
    const participanteData = `
    Confirmamos a participação do estudante ${nome}, atualmente no ${periodoFaculdade} período do curso de ${cursoFaculdade} na ${faculdadeNome},
    sob o número de CPF ${cpf}, na prestigiada Maratona de Programação - 2023.

    O estudante ${nome} estará contribuindo como membro da equipe "${nomeEquipe}". 
    `;

    // Defina as informações sobre a maratona
    const maratonaData = `
    Data da Maratona: 21/22/2024 

    Horário: 09:30am

    Endereço: Universidade de Pernambuco, campus Garanhuns, localizada na Rua Cap. Pedro Rodrigues - São José.
    `;

    // Defina outras informações
    const outrasInformacoes = `
    A maratona envolve equipes de desenvolvedores solucionando desafios de programação.

    Os problemas têm diferentes níveis de dificuldade.

    As equipes podem escolher qualquer linguagem de programação.

    É proibido o uso de dispositivos eletrônicos e acesso à Internet durante a competição.

    As equipes podem discutir apenas internamente e a submissão de soluções é feita na plataforma do evento.

    Um problema é considerado resolvido se passar em todos os testes.

    A equipe vencedora é a que resolve a maior quantidade de problemas no tempo definido.

    Os participantes são responsáveis por suas despesas de transporte, hospedagem, alimentação, etc.
    `;

    // Adicione as seções com fundo colorido e títulos em negrito
    createBox('CONFIRMAÇÂO', participanteData, backgroundColor);
    createBox('INFORMAÇÕES SOBRE A MARATONA', maratonaData, backgroundColor);
    createBox('OUTRAS INFORMAÇÕES', outrasInformacoes, backgroundColor);

    // Defina a posição horizontal da primeira imagem
    const imageXPosition1 = xPosition;

    // Adicione a primeira imagem ao rodapé
    const imagePath1 = './assets/logo.png'; // Substitua pelo caminho da sua primeira imagem
    const imageWidth1 = 100; // Largura da primeira imagem em pixels
    const imageHeight1 = 100; // Altura da primeira imagem em pixels
    doc.image(imagePath1, imageXPosition1, pageHeight - imageHeight1 - 20, {
        width: imageWidth1,
        height: imageHeight1
    });

    // Gere o QR code
    const qrCodeValue = cpf; // Use o CPF como valor para o QR code

    // Use o método toDataURL da biblioteca qrcode para gerar o QR code em formato de dados URL
    QRCode.toDataURL(qrCodeValue, { errorCorrectionLevel: 'H' }, function (err, url) {
        if (err) {
            console.error(err);
            return;
        }

        // Defina a posição horizontal da imagem do QR code
        const imageXPosition2 = xPosition + contentWidth - 100;

        // Adicione o QR code ao rodapé
        doc.image(url, imageXPosition2, pageHeight - 100 - 20, {
            width: 100,
            height: 100
        });

        // Finalize o documento PDF
        doc.end();

        console.log('PDF criado com sucesso.');
    });
}
module.exports = pdfTransporter
