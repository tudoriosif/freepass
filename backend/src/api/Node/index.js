import { Router } from 'express';
import crudService from '../CRUD';
import Node from './model';
import { getSystemNodes } from './controller';
import passport from 'passport';

const router = new Router();

router.use(passport.authenticate(['jwtFace', 'jwtFinger' ,'jwtUser'], { session: false }));


router.post('/', crudService.createObject(Node));

router.get('/', crudService.readObject(Node));

router.get('/system', getSystemNodes);

router.put('/:id', crudService.updateObject(Node));

router.delete('/:id', crudService.deleteObject(Node));

export default router;
