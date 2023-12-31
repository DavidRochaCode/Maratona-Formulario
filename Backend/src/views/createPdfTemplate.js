const fs = require('fs');
const path = require('path');

const imagePath = '../assets/logo.png';

// Conversão do caminho absoluto para relativo
const imageRelativePath = path.resolve(__dirname, imagePath);

// Leitura da imagem como bytes
const imageBytes = fs.readFileSync(imageRelativePath);

// Conversão para base64
const base64Image = imageBytes.toString('base64');

const html = function(nome, cpf, email, cursoFaculdade, periodoFaculdade, faculdadeNome, nomeEquipe ){
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <title>Confirmação de Inscrição - Maratona de Programação</title>
        <style>
            *{
                margin: 0;
            }
            h1 {
                color: #910142;
                
            }
    
            h2 {
                color: #6c043c;
               
            }
    
            label,
            p {
                color: #210123;
            }
    
            hr {
                border-color: #0ec0c1;
            }

            ul li{
                text-align: justify;
            }
        </style>
    </head>
    
    <body>
        <div style="text-align: center;">
        <img src="data:image/png;base64,${base64Image}" style="width: 200px; height: auto;" alt="Descrição da imagem">
            <h1>Maratona de Programação</h1>
            <h2 >Confirmação de Inscrição</h2>
        </div>
    
        <div style="margin: 20px auto; max-width: 600px;">
            <hr>
    
            <div style="border: 1px solid #0ec0c1; padding: 15px; margin: 10px;">
                <h2 style="text-align: center; font-size: 16px;margin-bottom: 25px; color: #6c043c;">DADOS DO PARTICIPANTE</h2>
                <label style="color: #910142; font-weight: bold;" for="nome">Nome:</label>
                <label style="color: #910142;">${nome}</label>
                <br>
                <label style="color: #910142;font-weight: bold;" for="cpf">CPF:</label>
                <label style="color: #910142;">${cpf}</label>
                <br>
                <label style="color: #910142;font-weight: bold;" for="email">Email:</label>
                <label style="color: #910142;">${email}</label>
                <br>
                <label style="color: #910142;font-weight: bold;" for="curso">Curso:</label>
                <label style="color: #910142;">${cursoFaculdade}</label>
                <br>
                <label style="color: #910142;font-weight: bold;" for="periodo">Período do Curso:</label>
                <label style="color: #910142;">${periodoFaculdade}º</label>
                <br>
                <label style="color: #910142;font-weight: bold;" for="campus">Campus:</label>
                <label style="color: #910142;">${faculdadeNome}</label>
                <br>
                <label style="color: #910142;font-weight: bold;" for="campus">Equipe:</label>
                <label style="color: #910142;">${nomeEquipe}</label>
            </div>
    
    
            <div style="border: 1px solid #0ec0c1; padding: 15px; margin: 10px;">
                <h2 style="text-align: center;font-size: 16px;margin-bottom: 25px; color: #6c043c;">INFORMAÇÕES SOBRE A MARATONA</h2>
                <label style="color: #910142;font-weight: bold;" for="data_maratona">Data da Maratona:</label>
                <label style="color: #910142;">11/09/2023</label>
                <br>
                <label style="color: #910142;font-weight: bold;" for="horario_maratona">Horário:</label>
                <label style="color: #910142;">09:30am</label>
                <br>
                <label style="color: #910142;font-weight: bold;" for="endereco_maratona">Endereço:</label>
                <label style="color: #910142;"> Universidade de Pernambuco, campus Garanhuns, localizada na Rua Cap. Pedro Rodrigues - São José.</label>
            </div>
    
            <div style="border: 1px solid #0ec0c1; padding: 20px; margin: 10px; margin-bottom: 20px;">
                <h2 style="text-align: center;font-size: 16px;margin-bottom: 25px; color: #6c043c;">OUTRAS INFORMAÇÕES</h2>
                <p style="color: #910142;"> <ul style="color: #910142;">
                    <li>A maratona envolve equipes de desenvolvedores solucionando desafios de programação.</li>
                    <li>Os problemas têm diferentes níveis de dificuldade.</li>
                    <li>As equipes podem escolher qualquer linguagem de programação.</li>
                    <li>É proibido o uso de dispositivos eletrônicos e acesso à Internet durante a competição.</li>
                    <li>As equipes podem discutir apenas internamente e a submissão de soluções é feita na plataforma do evento.</li>
                    <li>Um problema é considerado resolvido se passar em todos os testes.</li>
                    <li>A equipe vencedora é a que resolve a maior quantidade de problemas no tempo definido.</li>
                    <li>Os participantes são responsáveis por suas despesas de transporte, hospedagem, alimentação, etc.</li>

                </ul></p>
            </div>
        </div>
    </body>
    
    </html>
    `
}

module.exports = html