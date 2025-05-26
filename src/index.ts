import express from 'express';
import bodyParser from 'body-parser';
import { conselhoTutelarRoutes } from './features/conselho-tutelar/conselho-tutelar-route';
import { denunciaRoutes } from './features/denuncia/denuncia-route';
import dotenv from 'dotenv';
import cors from 'cors';
import dbPromise from './database/db';

dotenv.config();

const requiredEnvVars = [
  'ODONTO_GUARDIAO_EMAIL',
  'ODONTO_GUARDIAO_PWD',
  'CONSELHO_REGIAO_NORTE_EMAIL',
  'CONSELHO_REGIAO_SUL_EMAIL',
  'CONSELHO_REGIAO_LESTE_EMAIL',
  'CONSELHO_REGIAO_OESTE_EMAIL'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`❌ Variável de ambiente obrigatória faltando: ${envVar}`);
  } else {
    console.log(`✅ ${envVar}: [DEFINIDO (oculto)]`);
  }
});

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
app.use('/api', denunciaRoutes);
app.use('/api', conselhoTutelarRoutes);

async function startServer() {
  try {
    const db = await dbPromise; 
    console.log('Banco de dados conectado e pronto.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados ou iniciar o servidor:', error);
    process.exit(1); 
  }
}

startServer();
