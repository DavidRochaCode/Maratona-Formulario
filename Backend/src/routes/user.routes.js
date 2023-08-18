import{create, removeAll, getAllById, getUserById } from "../controllers/user.controller"


const userRoutes = app =>{
    //cadastrar usuário
    app.post("/user/create", create)

    //Deletar todos usuários que contém o mesmo id da equipe
    app.delete("/user/deleteall/:equipeId", removeAll)

    //Listar todos os usuários que possuem o mesmo id da equipe
    app.get("/user/get/allbyid/:equipeId", getAllById)

    //Lista o usuario por id
    app.get("/user/get/:identifier", getUserById)

}   
 export default userRoutes

