/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";


//Buscar todas as equipes
const getTeams = async () => {
  try {
    const response = await axios.get(
      `https://maratona-8tfe.onrender.com/team/getall/`
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao obter a quantidade de participantes da equipe.");
  }
};

//const time = await getTeams() --> descomentar depois de fazer deploy do backend

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
        // Determine the next available team ID
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
      handleTeamChange("Sem Equipe", 0);
    }else{
      handleTeamChange(teamNames.name, teamNames.id);
      updateFieldHandler("nomeTeam", teamNames.name)
    }
  };

  const [participantsCount, setParticipantsCount] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [nomeEquipeSelecionada, setNomeEquipeSelecionada] = useState('');

  useEffect(() => {
    setDesejaSeguirInscricaoSozinho(data.checked);

    //Buscar quantidade de participantes
    const fetchParticipantsCount = async () => {
      try {
        const count = await getTeamParticipantsCount(data.equipeId);
        setParticipantsCount(count);
      } catch (error) {
        console.error(error.message);
        setParticipantsCount("Erro ao obter a quantidade de participantes.");
      }
    };

    //Buscar os usuários da equipe
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
    if (nomeEquipeSelecionada) {
      const newTeam = { id: nextTeamId, name: nomeEquipeSelecionada };
      setTeamNames([...teamNames, newTeam]);
      setNomeEquipeSelecionada("");
      setNextTeamId(nextTeamId + 1); // Increment the next available ID
    }
  };

  //Buscar quantidade de participantes
  const getTeamParticipantsCount = async (equipeId) => {
    try {
      const response = await axios.get(
        `https://maratona-8tfe.onrender.com/team/get/length/${equipeId}`
      );
      return response.data.numberOfUsers;
    } catch (error) {
      throw new Error("Erro ao obter a quantidade de participantes da equipe.");
    }
  };

  //Buscar participantes de uma equipe
  const getTeamParticipants = async (equipeId) => {
    try {
      const response = await axios.get(
        `https://maratona-8tfe.onrender.com/team/get/members/${equipeId}`
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
            placeholder="Cadastrar uma equipe"
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
            <label htmlFor="">Escolha a sua equipe</label>
          </option>
          {teamNames
            .filter(team => team.id !== 0) // Mostra apenas o time que tiverem id maior que 0.
            .map(team => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
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
              {participants && participants.map(  participant => (
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
