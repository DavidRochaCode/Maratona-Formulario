import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import routes from "./routes";
import { getAll } from "./controllers/team.controller";

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

routes(app)

// Rota de verificação de saúde
app.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'OK' });
  });
  


app.listen( process.env.PORT || 3001, ()=>{
  // A ideia é a cada 3 minutos fazer uma requisição ao servidor
  setInterval(()=>{
    try {
      getAll
      console.log("Equipe buscada")
    } catch (error) {
      console.log("Ocorreu um erro em carregar a equipe no servidor: " + error)
    }
  },1000)
})
console.log("Servidor iniciado")
