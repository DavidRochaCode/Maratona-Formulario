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
  


app.listen( process.env.PORT || 3001)
console.log("Servidor iniciado")
