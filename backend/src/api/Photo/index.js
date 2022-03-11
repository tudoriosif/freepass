import { Router } from 'express';
import { storePhoto } from './controller';

const router = new Router();

router.post('/upload', storePhoto);

export default router;
