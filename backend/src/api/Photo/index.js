import { Router } from 'express';
import { storePhoto } from './controller';
import passport from 'passport';

const router = new Router();

router.use(passport.authenticate('jwt', { session: false }));

router.post('/upload', storePhoto);

export default router;
