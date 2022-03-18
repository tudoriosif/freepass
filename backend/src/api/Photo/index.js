import { Router } from 'express';
import { storeTrainPhoto, checkPhoto } from './controller';
import passport from 'passport';

const router = new Router();

router.use(passport.authenticate('jwt', { session: false }));

router.post('/upload', storeTrainPhoto);

router.post('/check', checkPhoto);

export default router;
