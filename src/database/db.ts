import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Configuração do banco de dados
const DB_PATH = path.join(__dirname, '../../data/denuncias.db');

// Abre a conexão com o banco de dados
async function initializeDatabase(): Promise<Database> {
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });

  // Cria tabelas se não existirem
  await db.exec(`
    CREATE TABLE IF NOT EXISTS denuncias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      protocolo TEXT NOT NULL UNIQUE,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      regiao TEXT NOT NULL
    )
  `);

  console.log('Banco de dados inicializado');
  return db;
}

// Exporta uma Promise que resolve para a instância do banco
export default initializeDatabase();