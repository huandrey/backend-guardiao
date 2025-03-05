import express from 'express';
import { criarDenuncia } from './denuncia-controller';
import { upload } from '../../integration/multer';

const router = express.Router();

router.post('/denuncia', upload.single('pdf'), criarDenuncia);

export { router as denunciaRoutes };

