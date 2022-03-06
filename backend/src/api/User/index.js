import { Router } from 'express';
import crudService from '../CRUD';
import User from './model';

const router = new Router();

router.post('/', crudService.createObject(User));

router.get('/', crudService.readObject(User));

router.put('/:id', crudService.updateObject(User));

router.delete('/:id', crudService.deleteObject(User));


export default router;
