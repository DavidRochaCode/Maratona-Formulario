import { AiOutlineUser, AiOutlineCode, AiOutlineTeam } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
const InicialInformation = () => {
  return (
    <div>
      <div className="review_form">
        <h2 className="etapas">Etapas </h2>
        <div className="inconesContainer">
          <div className="incones">
            <AiOutlineCode />
          </div>
          <label htmlFor=""> 
            Na etapa inicial, é possível se inscrever nos cursos de JavaScript, Dart/Flutter ou em ambos. Para participar da Maratona de Programação - 2023, basta prosseguir clicando no botão Avançar.
           </label>
        </div>
        <div className='inconesContainer'>
          <div className="incones">
            <AiOutlineTeam />
          </div>
          <label htmlFor="">Nesta fase, você pode se inscrever na maratona. Se você é o representante da equipe, crie um novo time especificando o nome. Se não for o representante, selecione sua equipe da lista e continue. Se estiver sem equipe, escolha a opção do Select e prossiga. </label>
        </div >
        <div className='inconesContainer'>
          <div className="incones">
            <AiOutlineUser />
          </div>
          <label htmlFor="">Nesta fase, insira seus dados para continuar com a inscrição. </label>
        </div>
        <div className='inconesContainer'>
          <div className="incones">
            <FiSend />
          </div>
          <label htmlFor="">Nesta etapa, revise seus dados. Se estiverem corretos, clique em Finalizar. </label>
        </div>
      </div>
    </div>
  );
};

export default InicialInformation;
