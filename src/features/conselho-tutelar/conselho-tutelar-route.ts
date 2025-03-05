import { Router } from 'express';
import { ConselhoTutelarController } from './conselho-tutelar-controller';
import { ConselhoTutelarService } from './conselho-tutelar-service';
import { ConselhoTutelarRepository } from './conselho-tutelar-repository';

const router = Router();
const repository = new ConselhoTutelarRepository();
const service = new ConselhoTutelarService(repository);
const controller = new ConselhoTutelarController(service);

router.get('/conselhos-tutelares', (req, res) => controller.getAll(req, res));
router.get('/conselhos-tutelares/search', (req, res) => controller.search(req, res));
router.get('/conselhos-tutelares/:id', (req, res) => controller.getById(req, res));
router.get('/conselhos-tutelares/cidade/:cidade', (req, res) => controller.getByCidade(req, res));

export { router as conselhoTutelarRoutes };
