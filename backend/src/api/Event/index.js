import { Router } from 'express';
import crudService from '../CRUD';
import Event from './model';
import passport from 'passport';
import { getSystemEvents } from './controller';

const router = new Router();

router.use(passport.authenticate(['jwtFace', 'jwtFinger', 'jwtUser'], { session: false }));

router.post('/', crudService.createObject(Event));

router.get('/', crudService.readObject(Event));

router.put('/:id', crudService.updateObject(Event));

router.delete('/:id', crudService.deleteObject(Event));

router.get('/system', getSystemEvents);

export default router;
