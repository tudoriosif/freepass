import { Router } from 'express';
import userRoutes from './User';
import systemRoutes from './System';

const router = new Router();

router.use('/users', userRoutes);
router.use('/systems', systemRoutes);

export default router;