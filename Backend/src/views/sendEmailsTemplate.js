var emailTemplate = function(nome){
    return `<h2>Confirmação de Inscrição</h2><p>Olá ${nome} ,
    </p><p>É com grande satisfação que confirmamos a sua inscrição na Maratona de Programação - 2023.
    </p><p>Essa será uma excelente oportunidade para testar suas habilidades e conhecimentos em programação, além de interagir com outros participantes e aprender muito.
    </p><p>Guarde bem as seguintes informações para o dia do evento:</p>
    <ul><li>Data da Abertura: 11/09 às 09h:30min
    <li>Conclusão da Maratona: 11/09 às 17h:30min
    <li>Endereço: Universidade de Pernambuco, campus Garanhuns, localizada na Rua Cap. Pedro Rodrigues - São José.
    <li>Local: Laboratório 01 de Engenharia de Software</ul>
    <p>Se prepare e traga consigo muita disposição e vontade de aprender. Estamos ansiosos para vê-lo(a) lá!</p>
    <p>Caso surja alguma dúvida ou necessite de mais informações ou correções do formulário, não hesite em nos contatar por meio desse endereço de email.</p>
    <br>
    <p>Abaixo está um documento comprovatório da sua inscrição. <em>Imprima-o e leve-o no dia da maratona.</em></p>
    `

}
module.exports = emailTemplate;
