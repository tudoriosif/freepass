import { Router } from 'express';
import userRoutes from './User';
import systemRoutes from './System';
import photoRoutes from './Photo';
import loginRoutes from './Auth';
import fingerprintRoutes from './Fingerprint';
import nodeRoutes from './Node';

const router = new Router();

router.use('/users', userRoutes);
router.use('/systems', systemRoutes);
router.use('/photo', photoRoutes);
router.use('/auth', loginRoutes);
router.use('/fingerprint', fingerprintRoutes);
router.use('/node', nodeRoutes);

export default router;
