import * as yup from "yup"

//Dados obrigatórios
export const courseValidation = yup.object({
    participanteNome: yup.string().required(),
    participanteEmail: yup.string().required(),
    participanteCelular: yup.string().required(),
    cursoEscollhido: yup.string().required(),
})