import{createCurso} from "../repositories/course.repository"
import {courseValidation} from "../validations/courseValidation"

//Criar curso
export const createCourse = async(req, res) =>{
    try {

        //validar os dados antes de criar
        await courseValidation.validate(req.body)
        
        await createCurso(req.body)
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
}