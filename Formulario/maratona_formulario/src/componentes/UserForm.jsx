/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import InputMask from 'react-input-mask';

const UserForm = ({ data, updateFieldHandler }) => {


  return (
    <div>
      <div className="form_control">
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          name="text"
          id="nome"
          placeholder="Seu nome"
          required
          value={data.nome || ""}
          onChange={(e) => updateFieldHandler("nome", e.target.value)}
        />
      </div>
      <div className="form_control">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="text"
          id="email"
          placeholder="Seu Email"
          required
          value={data.email || ""}
          onChange={(e) => updateFieldHandler("email", e.target.value)}
        />
      </div> 
      <div className="form_control">
        <label htmlFor="cpf">CPF:</label>
        <InputMask
          mask="999.999.999-99"
          placeholder="Digite o CPF"
          type="text"
          name="text"
          id="cpf"
          required
          value={data.cpf || ""}
          onChange={(e) => updateFieldHandler("cpf", e.target.value)}
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
          required
          value={data.celular || ""}
          onChange={(e) => updateFieldHandler("celular", e.target.value)}
        />
      </div>
      <div className="form_control">
        <label htmlFor="faculdade">Faculdade:</label>
        <input
          type="text"
          name="text"
          id="faculdade"
          placeholder="Sua Faculdade"
          required
          value={data.faculdade || ""}
          onChange={(e) => updateFieldHandler("faculdade", e.target.value)}
        />
      </div>
      <div className="form_control">
        <label htmlFor="curso">Curso:</label>
        <input
          type="text"
          name="text"
          id="curso"
          placeholder="Seu Curso"
          required
          value={data.curso || ""}
          onChange={(e) => updateFieldHandler("curso", e.target.value)}
        />
      </div>
      <div className="form_control">
        <label htmlFor="periodo">Periodo:</label>
        <input
          type="text"
          name="text"
          id="periodo"
          placeholder="Seu Período"
          required
          value={data.periodo || ""}
          onChange={(e) => updateFieldHandler("periodo", Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default UserForm;
