/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import InputMask from 'react-input-mask';
import {Multiselect} from 'multiselect-react-dropdown'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const matricular = async (info, limparCampos, sucesso, erro)=>{
     try {
        await axios.post(
            "http://localhost:3001/course/create",
            {
              participanteNome: info.nome,
              participanteEmail: info.email,
              participanteCelular: info.celular,
              cursoEscollhido: info.curso,
            }
          );
          sucesso()
          
        } catch (error) {
          console.log("Algo deu errado: " + error)
          erro()
          
        } 
        
        //limparCampos()
}


const CursoForm = () => {

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [celular, setCelular] = useState("")

  const cursos = [
    {Curso: "Javascript", id:1},
    {Curso: "Dart/Flutter", id:2},
  ]

  const handleCursoSelect = (selectedList) => {
    setSelectedCursos(selectedList);
    //const listaCursos = selectedList.map(curso => curso.Curso).join(', ')
  };

  const [options] = useState(cursos)
  const [selectedCursos, setSelectedCursos] = useState([]);

  const data = {
    nome,
    email,
    celular,
    curso: selectedCursos.map(curso => curso.Curso).join(', ')
  }

  const sucesso = () => toast.success("Matriculado no curso com sucesso!");
  const erro = () => toast.error("Preencha todos os campos para seguir com a matrícula");


  function limparCampos(){
    setNome("")
    setEmail("")
    setCelular("")
    setSelectedCursos([])
  }
      

  return (
 
    <div >
      <div className="form_control">
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          name="text"
          id="nome"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        
        />
      </div>
      <div className="form_control">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="text"
          id="email"
          placeholder="Seu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
     
 
        />
      </div> 
      <div className="form_control">
        <label htmlFor="celular">Celular:</label>
        <InputMask
          mask="(99) 9 9999-9999"
          placeholder="Seu Celular"
          type="text"
          name="text"
          id="celular"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
    
        />
      </div>
      <div  className="form_control">
      <label htmlFor="celular">Cursos:</label>
      <Multiselect
          placeholder="Selecione quantos quiser"
          options={options}
          displayValue="Curso"
          selectedValues={selectedCursos}
          onSelect={handleCursoSelect}
          onRemove={handleCursoSelect}
          showCheckbox
          style={{
            chips: {
              background: '#0ec0c1'
            },
            searchBox:{
              background:"#963156",
             'border-radius': '17px',
            }
          }}
        />
      </div>

      <button type="button" className="matricula" onClick={async function(){
        await matricular(data, limparCampos(), sucesso, erro)
      }}>Matricular-se</button>
      <ToastContainer />
      <div className="review_form_groupe">
        <p>Caso você tenha interesse em participar da maratona, por favor, prossiga clicando no botão de avançar.</p>
      </div>

    </div>
  );
};

export default CursoForm;
