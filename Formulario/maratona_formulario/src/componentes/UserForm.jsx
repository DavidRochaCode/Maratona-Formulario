/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

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
          placeholder="Email do participante"
          required
          value={data.email || ""}
          onChange={(e) => updateFieldHandler("email", e.target.value)}
        />
      </div>
      <div className="form_control">
        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          name="text"
          id="cpf"
          placeholder="CPF do participante"
          required
          value={data.cpf || ""}
          onChange={(e) => updateFieldHandler("cpf", e.target.value)}
        />
      </div>
      <div className="form_control">
        <label htmlFor="celular">Celular:</label>
        <input
          type="text"
          name="text"
          id="celular"
          placeholder="Celular do participante"
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
          placeholder="Faculdade do participante"
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
          placeholder="Curso do participante"
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
          placeholder="Período do participante"
          required
          value={data.periodo || ""}
          onChange={(e) => updateFieldHandler("periodo", e.target.value)}
        />
      </div>
    </div>
  );
};

export default UserForm;
