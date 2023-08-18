import{prisma} from "../services/prisma"

//Criar time
export const createTeam = async(data) =>{
    const team = await prisma.equipe.create({
        data
    })
    return team
}

//Buscar time
export const getTeam = async(id) =>{
    const team = await prisma.equipe.findUnique({
        where:{
            id,
        }
    })
    return team
}

//Buscar times
export const getTeams = async() =>{
  const team = await prisma.equipe.findMany({
    select:{
      id: true,
      nomeEquipe:true
    }
  })
  return team
}

//Buscar Quantidade de usuarios em uma equipe
export const getTeamLength = async (id) => {
    const team = await prisma.equipe.findUnique({
      where: {
        id,
      },
      select: {
        usuarios: true,
      },
    });
  
    if (team) {
      const numberOfUsers = team.usuarios.length;
      return {numberOfUsers};
    } else {
      return {numberOfUsers:0}; // Equipe não encontrada ou sem usuários
    }
  };

  //Buscar os participantes de uma equipe
export const getTeamParticipants = async (id) => {
  const team = await prisma.equipe.findUnique({
    where: {
      id,
    },
    select: {
      usuarios: true,
    },
  });
  return team
};







//Deletar Time
export const deleteTeam = async(equipeId) =>{
    const team = await prisma.equipe.delete({
        where:{
            equipeId,
        }
    })
    return
}