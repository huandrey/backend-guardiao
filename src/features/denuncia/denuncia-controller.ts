import { Request, Response } from 'express';
import { enviarDenuncia } from './denuncia-service';
import { upload } from '../../integration/multer';

export const criarDenuncia = async (req: Request, res: Response) => {
  console.log(req.params)
  console.log(req.body)
  const denuncia = req.body.denuncia as string;
  const pdf = req.file;

  if (!denuncia) {
    return res.status(400).json({ error: 'O campo "denuncia" é obrigatório.' });
  }

  try {
    const result = await enviarDenuncia({ denuncia, pdf : pdf! });
    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao enviar denúncia.' });
  }
};

export const criarDenunciaRoute = upload.single('pdf');
