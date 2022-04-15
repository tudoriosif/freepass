import { Router } from 'express';
import crudService from '../CRUD';
import Node from './model';

const router = new Router();

router.post('/', crudService.createObject(Node));

router.get('/', crudService.readObject(Node));

router.put('/:id', crudService.updateObject(Node));

router.delete('/:id', crudService.deleteObject(Node));

export default router;
