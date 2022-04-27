import { Router } from 'express';
import { startTransmission, stopTransmissionClient } from './controller';
import passport from 'passport';

const router = new Router();

router.use(passport.authenticate('jwt', { session: false }));

router.post('/start', startTransmission);
router.post('/stop', stopTransmissionClient);

export default router;
