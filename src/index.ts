import express from 'express';
import bodyParser from 'body-parser';
import { conselhoTutelarRoutes } from './features/conselho-tutelar/conselho-tutelar-route';
import { denunciaRoutes } from './features/denuncia/denuncia-route';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
app.use('/api', denunciaRoutes);
app.use('/api', conselhoTutelarRoutes);

// Inicialização do Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
