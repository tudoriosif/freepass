import { Router } from 'express';
import { scanFingerprint, checkFingerprint } from './controller';
import passport from 'passport';

const router = new Router();

router.use(passport.authenticate('jwt', { session: false }));

router.post('/scan', scanFingerprint);

router.post('/check', checkFingerprint);

router.post('/empty', checkFingerprint);

export default router;
