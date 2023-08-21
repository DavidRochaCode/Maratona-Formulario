import * as yup from "yup"

//Dados obrigatórios
export const userValidation = yup.object({
  cpf: yup.string().required(),
  nome: yup.string().required(),
  email: yup.string().required(),
  celular: yup.string().required(), 
  //participarCurso: yup.boolean().required(),
  equipeId: yup.string().required(),
  //cursoNome: yup.string().nullable(true), //não obrigatório
  faculdadeNome: yup.string().required(),
  cursoFaculdade: yup.string().required(),
  periodoFaculdade: yup.number().required()
})