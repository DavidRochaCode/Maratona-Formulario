import{prisma} from "../services/prisma"

//criar usuário
export const createUser = async(data) =>{
    const user = await prisma.usuario.create({
        data
    })
    return user
}

//Deletar todos usuários que contém o mesmo id da equipe
export const deleteAllUsers = async (equipeId) =>{
    const user = await prisma.usuario.deleteMany({
        where:{
            equipeId,
        }
    })
    return
}

//Listar todos os usuários que possuem o mesmo id da equipe
export const getAllById = async (equipeId) => {
    const users = await prisma.usuario.findMany({
      where: {
        equipeId,
      },
      include: { //vai incluir também o nome da equipe
        equipe: {
          select: {
            nomeEquipe: true,
          },
        },
      },
    });
    return users;
  };

  export const getUser = async(identifier) =>{
    const user = await prisma.usuario.findFirst({
      where: {
        OR: [
          { cpf: identifier },
          { email: identifier }
        ]
      }
    });
    return user;
  }
