export interface Denuncia {
  id?: number;
  protocolo: string;
  data_criacao?: string; // ISO date string
  regiao: string;
}

export enum Regiao {
  NORTE = 'norte',
  SUL = 'sul',
  LESTE = 'leste',
  OESTE = 'oeste'
}

export interface EnviarDenunciaRequest {
  protocolo: string
  pdf: Express.Multer.File
  regiao: Regiao
}