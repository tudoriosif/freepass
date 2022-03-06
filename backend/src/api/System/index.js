import { Router } from 'express';
import crudService from '../CRUD';
import System from './model';

const router = new Router();

router.post('/', crudService.createObject(System));

router.get('/', crudService.readObject(System));

router.put('/:id', crudService.updateObject(System));

router.delete('/:id', crudService.deleteObject(System));


export default router;
