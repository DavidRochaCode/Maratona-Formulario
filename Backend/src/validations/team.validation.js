import * as yup from "yup"

//Dados obrigatórios
export const teamValidation = yup.object({
  nomeEquipe: yup.string().required(),
  id: yup.string().required(),
})