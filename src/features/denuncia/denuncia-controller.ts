import { Request, Response } from 'express';
import { upload } from '../../integration/multer';
import { EnviarDenunciaRequest } from './@types';
import { DenunciaService } from './denuncia-service';

export const criarDenuncia = async (req: Request, res: Response) => {
  const service = await DenunciaService()

  const denuncia = req.body as EnviarDenunciaRequest;
  const pdf = req.file;

  if (!denuncia.regiao) {
    return res.status(400).json({ error: 'O campo "regiao" é obrigatório.' });
  }

  try {
    const result = await service.enviarDenuncia({ 
      protocolo: denuncia.protocolo, 
      regiao: denuncia.regiao, 
      pdf: pdf! 
    });
    return res.status(201).json({ message: result.message, protocolo: result.protocolo });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao enviar denúncia.' });
  }
};

export const listaTodasDenuncias = async (req: Request, res: Response) => {
  const service = await DenunciaService()
  
  try {
    const denuncias = await service.listaTodasDenuncias()
    return res.status(200).json(denuncias)
  } catch (err) {
    console.error(err)
  }
}

export const criarDenunciaRoute = upload.single('pdf');
