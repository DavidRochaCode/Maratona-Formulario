/* eslint-disable react/jsx-key */

import { SyncLoader } from "react-spinners";
//Components
import "./App.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import TeamForm from "./componentes/TeamForm";
import CursoForm from "./componentes/CursoForm";
import UserForm from "./componentes/UserForm";
import ReviewForm from "./componentes/ReviewForm";
import Countdown from "./componentes/Countdown";
import {AiFillGithub} from 'react-icons/ai'
import Steps from "./componentes/Steps";
import Modal from "./componentes/Modal";
//HOOKS
import { useForm } from "./hooks/useForm";
import { useState } from "react";


//AxiosFunctions
import { cadastrar } from "../src/componentes/ReviewForm";
import { getTeamParticipantsCount } from "./componentes/ReviewForm";
import axios from "axios";
import InicialInformation from "./componentes/InicialInformation";
import { PATH_URL } from "./services";

function App() {

   const getUser = async (cpfOrEmail) => {
    try {
      const response = await axios.get(
        `${PATH_URL}/user/get/${cpfOrEmail}`
      );
  
     return response.data
    } catch (error) {
      console.log(error)
    }
  };

  const [isLoading, setIsLoading] = useState(false);


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  const formTemplate = {
    nome: "",
    email: "",
    cpf: "",
    celular: "",
    faculdade: "",
    curso: "",
    periodo: "",
    cursoProgramacao: "",
  };

  const formTeamTemplate = {
    nomeTeam: "",
    checked: "",
  };

  const handleTeamChange = (name, id) => {
    // Atualize o ID e o nome da equipe selecionada no estado do componente App
    setData((prev) => {
      return { ...prev, equipeId: id, nomeTeam: name  };
    });

    setDataTeam((prev) => {
      return { ...prev, equipeId: id, nomeTeam: name };
    });
  };
  const [data, setData] = useState(formTemplate);
  const [dataTeam, setDataTeam] = useState(formTeamTemplate);

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });

    setDataTeam((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const formComponents = [
    <InicialInformation/>,
    <CursoForm/>,
    <TeamForm
      data={dataTeam}
      updateFieldHandler={updateFieldHandler}
      handleTeamChange={handleTeamChange}
    />,
    <UserForm data={data} updateFieldHandler={updateFieldHandler} />,
    <ReviewForm data={data} />,
  ];

  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } =
    useForm(formComponents);

  return (
    <div className="app">
      <div className="footer">
        <div className="footer-contend">
            <AiFillGithub/>
          <a href="https://github.com/DavidRochaCode">by David Rocha</a>
        </div>
      </div>
      <div className="header">
         {isLoading ? (
        <div className="loader-container">
          <SyncLoader color={"#210123"} loading={true} />
          <br />
          <p>Validando</p>
        </div>
      ):(
        <>
        <h2>Formulário de Inscrição</h2>
        <Countdown/>
        </>
      )
      }
        {isModalVisible ? (
          <Modal onClose={() => setIsModalVisible(false)}>
            {modalType === "success" ? (
              <div className="modalInfo">
                <h2>
                  Olá, <label>{data.nome}.</label>
                </h2>
                <p>
                  Sua inscrição na Maratona de Programação 2023 foi realizada
                  com sucesso.
                </p>
                <p>
                  Em alguns instantes, você receberá um e-mail de confirmação no
                  endereço: <label>{data.email}</label>.
                </p>
                <p>
                  Qualquer dúvida ou retificação, entre em contato com o comitê
                  pelo e-mail: <label>comite.da.maratona@gmail.com</label>.
                </p>
              </div>
            ) : modalType === "error" ? (
              <div className="modalInfo">
                <h2>Ops, ocorreu um erro!</h2>
                <p>
                  Não foi possível realizar a inscrição na Maratona de
                  Programação.
                </p>
                <p>
                  Caso você tenha inserido um e-mail ou CPF duplicado, sua
                  inscrição não poderá ser deferida.
                </p>
                <p>
                  Caso o erro não seja esse, por favor, tente novamente mais
                  tarde ou entre em contato com o comitê pelo e-mail:{" "}
                  <label>comite.da.maratona@gmail.com</label>.
                </p>
              </div>
            ) :modalType === "listaCheia" ? (
              <div className="modalInfo">
                <h2>Ops, ocorreu um erro!</h2>
                <p>
                Não foi possível realizar a sua inscrição na Maratona de Programação, pois essa equipe já está completa.
                </p>
                <p>
                  Por favor, escolha outra equipe.
                </p>
                <p>
                  Para mais informação, entre em contato com o comitê pelo e-mail:{" "}
                  <label>comite.da.maratona@gmail.com</label>.
                </p>
              </div>
            ) : null}
          </Modal>
        ) : null}
        
      </div>
      <div className="form_container">
        <Steps currentStep={currentStep} />
        <form
          onSubmit={(evento) => {
            changeStep(currentStep + 1, evento);
          }}
        >
          <div className="inputs_container">{currentComponent}</div>
          <div className="actions">
            {!isFirstStep && (
              <button
               disabled={isLoading} 
               type="button" onClick={() => changeStep(currentStep - 1)}
               style={{
                  backgroundColor: isLoading ? "#78a5a6" : "#0ec0c1", 
                  cursor: isLoading ? "not-allowed" : "pointer", 
                }}
               
               >
                <GrFormPrevious />
                <span>Voltar</span>
              </button>
            )}
            {!isLastStep ? (
              <button type="submite">
                <span>Avançar</span>
                <GrFormNext />
              </button>
            ) : (
              <button
                type="button"
                onClick={async function () {
                  setIsLoading(true)
                  const userData = await cadastrar(data);
                  const participantsCount = await getTeamParticipantsCount(data.equipeId);
                  const userCpf = await getUser(data.cpf)
                  const userEmail = await getUser(data.email)
                  
                  setIsLoading(false)
                  if (userData != undefined) {
                    setIsModalVisible(true);
                    setModalType("success");
                  } else if(participantsCount===3) {
                    setIsModalVisible(true);
                    setModalType("listaCheia")
                  }else if(userCpf || userEmail){
                    console.log("Usuário já existe");
                    setIsModalVisible(true);
                    setModalType("error");
                  }
                }}
                disabled={isLoading}
                style={{
                  backgroundColor: isLoading ? "#78a5a6" : "#0ec0c1", 
                  cursor: isLoading ? "not-allowed" : "pointer", 
                }}
              >
                <span>Confirmar</span>
                <FiSend />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
