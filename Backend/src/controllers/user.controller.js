import e from "express"
import{createUser, deleteAllUsers, getAllById, getEmails, getUser} from "../repositories/user.repository"
import { prisma } from "../services/prisma"
import {userValidation} from "../validations/user.validation"

//Criar usuário
export const create = async(req, res) =>{
    try {

        //validar os dados antes de criar
        await userValidation.validate(req.body)

        const user = await createUser(req.body)
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
}


//Deletar todos usuários que contém o mesmo id da equipe
export const removeAll = async(req,res) =>{
    try {
        await deleteAllUsers(Number(req.params.equipeId))
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
}


//Listar todos os usuários que possuem o mesmo id da equipe
//também vai listar o nome que colocaram na equipe
export const getAllById = async(req, res) => {
    try {
        const user = await getAllById(Number(req.params.equipeId))
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
}

//Listar todos os emails dos usuários que possuem o mesmo id da equipe
export const getAllEmails = async(req,res) =>{
    try {
        const email = await getEmails(Number(req.params.equipeId))
        res.status(200).send(email)
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
}


export const getUserById = async (req, res) => {
    try {
        const identifier = req.params.identifier; // Altere o nome do parâmetro para "identifier"
        const userGet = await getUser(identifier); // Use o parâmetro "identifier" na chamada da função
        res.status(200).send(userGet);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}