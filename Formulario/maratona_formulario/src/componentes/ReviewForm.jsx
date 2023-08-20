/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { useState } from "react";

//Função de buscar rota para o envio de e-mails

export const sendEmail = async (cpf) => {
  try {
    const response = await axios.get(
      `https://maratona-8tfe.onrender.com/emails/${cpf}`
    );
    return response
  } catch (error) {
    throw new Error("Erro ao enviar o email");
  }
};

//função para buscar time

export const temExist = async(id)=>{
  try {
    const response = await axios.get(
      `https://maratona-8tfe.onrender.com/team/get/${id}`
    );
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Função para obter a quantidade de participantes em uma equipe
export const getTeamParticipantsCount = async (equipeId) => {
  try {
    const response = await axios.get(
      `https://maratona-8tfe.onrender.com/team/get/length/${equipeId}`
    );
    return response.data.numberOfUsers;
  } catch (error) {
    throw new Error("Erro ao obter a quantidade de participantes da equipe.");
  }
};


// Função para obter participante
export const getUser = async (cpfOrEmail) => {
  try {
    const response = await axios.get(
      `https://maratona-8tfe.onrender.com/user/get/${cpfOrEmail}`
    );
    return response.data
  } catch (error) {
    console.log(error)
    return null;
  }
};

// Função cadastrar que utiliza a função getTeamParticipantsCount
export const cadastrar = async (data) => {
  try {

    // Verificar se o usuário já está cadastrado
   const userCpf = await getUser(data.cpf);
   const userEmail = await getUser(data.email);
   if (userCpf) {
     return ; // Sai da função se o usuário com o seu cpf já estiver cadastrado
   }

   if (userEmail) {
    return ; // Sai da função se o usuário com o seu email já estiver cadastrado
  }

   const team = await temExist(data.equipeId)
   if(!team){
     // Cadastrar Equipe
     const equipe = await axios.post("https://maratona-8tfe.onrender.com/team/create", {
      id: data.equipeId,
      nomeEquipe: data.nomeTeam
    });
    console.log("Equipe Cadastrada: " + equipe.data);
   }
  
    // Verificar se o grupo está cheio
    const participantsCount = await getTeamParticipantsCount(data.equipeId);
    if (data.equipeId != 0 && participantsCount === 3) {
      return; // Sai da função se o grupo estiver cheio
    }


    // Cadastro de Participante
    const cadastrarUsuario = await axios.post(
      "https://maratona-8tfe.onrender.com/user/create",
      {
        cpf: data.cpf,
        nome: data.nome,
        email: data.email,
        celular: data.celular,
        equipeId: data.equipeId,
        faculdadeNome: data.faculdade,
        cursoFaculdade: data.curso,
        periodoFaculdade: data.periodo,
      }
    );
    console.log("Usuário cadastrado com sucesso:", cadastrarUsuario.data);

    await sendEmail(data.cpf);
    console.log("Email enviado:");

    return cadastrarUsuario.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao cadastrar participante.");
  }
};

const ReviewForm = ({ data}) => {
  return (
    <div>
        <div className="review_form">
      <h2>Informações do participante </h2>
      <p>
        <label>Nome:</label> {data.nome}
      </p>
      <p>
        <label>Email:</label> {data.email}
      </p>
      <p>
        <label>CPF:</label> {data.cpf}
      </p>
      <p>
        <label>Celular:</label> {data.celular}
      </p>
      <p>
        <label>Curso:</label> {data.curso}
      </p>
      <p>
        <label>Período da Faculdade:</label>
        {data.periodo}
      </p>
      {data.nomeTeam != "Sem Equipe" ? (
        <>
          <p>
            <label>Nome da Equipe:</label> {data.nomeTeam}
          </p>
        </>
      ) : (
        <>
          <p>
            <label>Nome da Equipe:</label> Participante sem equipe.
          </p>
        </>
      )}
    </div>
    </div>
    
  );
};

export default ReviewForm;
