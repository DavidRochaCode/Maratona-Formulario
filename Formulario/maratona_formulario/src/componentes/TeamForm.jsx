/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PATH_URL } from "../services";
import CryptoJS from 'crypto-js'
let carregado;

// Buscar todas as equipes
const getTeams = async () => {
  try {

    const response = await axios.get(
      `${PATH_URL}/team/getall/` 
    );
    carregado = true
    return response.data;

  } catch (error) {
    throw new Error("Erro ao obter a quantidade de participantes da equipe.");
  }
};

const TeamForm = ({
  data,
  updateFieldHandler,
  handleTeamChange,
}) => {
  const [teamNames, setTeamNames] = useState([]);
  const [desejaSeguirInscricaoSozinho, setDesejaSeguirInscricaoSozinho] =
    useState(false);
  const [nextTeamId, setNextTeamId] = useState(1);

  
  
  // Busca equipes na montagem do componente
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teams = await getTeams();
        // Mapear equipes para o formato desejado
        const formattedTeams = teams.map(team => ({
          id: team.id,
          name: team.nomeEquipe
        }));
        setTeamNames(formattedTeams);
        // Determine o próximo ID de equipe disponível
        if (formattedTeams.length > 0) {
          const maxId = Math.max(...formattedTeams.map(team => team.id));
          setNextTeamId(maxId + 1);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTeams();
  }, []);

  const handleCheckboxChange = (e) => {
    setDesejaSeguirInscricaoSozinho(e.target.checked);
    updateFieldHandler("checked", e.target.checked);

    // Se o checkbox foi marcado, envie true para handleTeamChange e false para updateFieldHandler
    if (e.target.checked) {
      handleTeamChange("Sem Equipe", "0");
    } else {
      handleTeamChange(teamNames.name, teamNames.id);
      updateFieldHandler("nomeTeam", teamNames.name);
    }
  };

  const [participantsCount, setParticipantsCount] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [nomeEquipeSelecionada, setNomeEquipeSelecionada] = useState('');

  useEffect(() => {
    setDesejaSeguirInscricaoSozinho(data.checked);

    // Buscar quantidade de participantes
    const fetchParticipantsCount = async () => {
      try {
        const count = await getTeamParticipantsCount(data.equipeId);
        setParticipantsCount(count);
      } catch (error) {
        console.error(error.message);
        setParticipantsCount("Erro ao obter a quantidade de participantes.");
      }
    };

    // Buscar os usuários da equipe
    const fetchParticipants = async () => {
      try {
        const participantsData = await getTeamParticipants(data.equipeId);
        setParticipants(participantsData.usuarios);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (data.equipeId) {
      fetchParticipantsCount();
      fetchParticipants();
    }
  }, [data.checked, data.equipeId]);

  //pre-cadastrar uma equipe
  const cadastrarEquipe = () => {
    if (nomeEquipeSelecionada === "") {
      return toast.error("Por favor, digite o nome da sua equipe");
    }
    if (nomeEquipeSelecionada) {
      // Calcular o hash SHA-256 do nome da equipe
      const sha256 = CryptoJS.SHA256(nomeEquipeSelecionada);
      const encryptedText = sha256.toString(CryptoJS.enc.Hex).slice(0, 16);

      // Criar um novo time com o hash criptografado como ID
      const newTeam = { id: encryptedText, name: nomeEquipeSelecionada };

      // Exibir o valor do ID no console para fins de teste
      console.log("Novo ID da Equipe:", encryptedText);

      setTeamNames([...teamNames, newTeam]);
      setNomeEquipeSelecionada("");
    }
  };

  // Buscar quantidade de participantes
  const getTeamParticipantsCount = async (equipeId) => {
    try {
      const response = await axios.get(
        `${PATH_URL}/team/get/length/${equipeId}`
      );
      return response.data.numberOfUsers;
    } catch (error) {
      throw new Error("Erro ao obter a quantidade de participantes da equipe.");
    }
  };

  // Buscar participantes de uma equipe
  const getTeamParticipants = async (equipeId) => {
    try {
      const response = await axios.get(
        `${PATH_URL}/team/get/members/${equipeId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Erro ao obter os participantes da equipe.");
    }
  };

  return (
    <div>
      <div className="cadastrarEquipe">
        <div className="form_control">
          <input
            className="equipeNome"
            type="text"
            name="text"
            id="team"
            placeholder="1º - Digite um nome para a sua equipe"
            value={nomeEquipeSelecionada}
            onChange={(e) => setNomeEquipeSelecionada(e.target.value)}
          />

          <button
            className="button"
            type="button"
            onClick={cadastrarEquipe}
          >
            <span>Cadastrar</span>
          </button>
          <ToastContainer />
        </div>
      </div>

      <div className="form_control">
        <select
          className="select_groupe"
          name="nomeTeam"
          id="team"
          required
          value={data.nomeTeam || ""}
          onChange={(e) => {
            const name = e.target.value;
            const selectedTeam = teamNames.find(
              (team) => team.name === name
            );
            const id = selectedTeam ? selectedTeam.id : null;
            handleTeamChange(name, id);
            updateFieldHandler("nomeTeam", name);
          }}
          disabled={desejaSeguirInscricaoSozinho}
        > 
          <option className="option-select" value="" disabled>
            <label htmlFor="">2º - Escolha a sua equipe</label>
          </option >
           {/* Renderizar o PulseLoader enquanto as equipes estão sendo carregadas */}
       
          {teamNames
            .filter(team => team.id !== "0") 
            .map(team => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
             {!carregado && (
          <option className="loading-message"value="" disabled>
           Carregando as outras equipes. Aguarde ...
            
          </option>
        )}
        </select>
        <div className="check">
          <input
            id="checkbox"
            type="checkbox"
            checked={desejaSeguirInscricaoSozinho}
            onChange={handleCheckboxChange}
          />
          <label className="seguirInscricao" htmlFor="checkbox">
            Desejo seguir a inscrição sem equipe
          </label>
        </div>
      </div>
      <div className="review-group">
        {data.nomeTeam && !desejaSeguirInscricaoSozinho ? (
          <>
            <p>Essa equipe possui {participantsCount} participante(s):</p>
            {participants && participants.map(participant => (
              <p key={participant.cpf}>
                - {participant.nome}
              </p>
            ))}
          </>
        ) : (
          <p></p>
        )}
        {desejaSeguirInscricaoSozinho ? (
          <>
            <p>
              Ao prosseguir, você concorda que o comitê poderá alocar
              você para um grupo.
            </p>
          </>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default TeamForm;
