import { Router } from 'express';
import crudService from '../CRUD';
import User from './model';
import { getUsersBySystem, addUser, deleteUser } from './controller';
import passport from 'passport';

const router = new Router();

router.use(passport.authenticate(['jwtFace', 'jwtFinger', 'jwtUser'], { session: false }));

router.post('/', addUser);

router.get('/', crudService.readObject(User));

router.put('/:id', crudService.updateObject(User));

router.delete('/:id', deleteUser);

router.get('/all', getUsersBySystem);

export default router;
