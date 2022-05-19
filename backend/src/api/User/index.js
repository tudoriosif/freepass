import { Router } from 'express';
import crudService from '../CRUD';
import User from './model';
import { getUsersBySystem } from './controller';
import passport from 'passport';

const router = new Router();

router.use(passport.authenticate('jwt', { session: false }));

router.post('/', crudService.createObject(User));

router.get('/', crudService.readObject(User));

router.put('/:id', crudService.updateObject(User));

router.delete('/:id', crudService.deleteObject(User));

router.get('/all', getUsersBySystem)


export default router;
