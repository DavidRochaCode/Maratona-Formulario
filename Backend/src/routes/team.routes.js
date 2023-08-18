import{create, deleteTeam, get, getTeamLength, getAll, getTeamMembers} from "../controllers/team.controller"


const teamRoutes = app =>{
    //cadastrar time
    app.post("/team/create", create)
    //deletar time
    app.delete("/team/delete/:equipeId")
    //buscar por time 
    app.get("/team/get/:id", get)
      //buscar todo time 
    app.get("/team/getall/", getAll)
    //buscar quantidade de usuários na equipe
    app.get("/team/get/length/:id", getTeamLength)
    app.get("/team/get/members/:id", getTeamMembers)
}

export default teamRoutes