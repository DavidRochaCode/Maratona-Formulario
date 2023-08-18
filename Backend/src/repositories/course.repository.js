import{prisma} from "../services/prisma"

//Criar curso
export const createCurso = async(data) =>{
    const curso = await prisma.curso.create({
        data
    })
    return curso
}