import Node from './model';
import System from '../System/model';
import { getSystemByUser } from '../../utils/getSystemIdByUser';

export const getSystemNodes = async (req, res, next) => {
    try {
        const system = await getSystemByUser(req.user);

        const systemNodes = await Node.find({ systemID: system._id });

        return res.status(200).json({ nodes: systemNodes });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
};

export const addSystemNode = async (req, res, next) => {
    try {
        const system = await getSystemByUser(req.user);

        const newNode = await Node.create({ ...req.body, systemID: system._id });

        return res.status(200).json({ message: 'New node has been created!' });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
};
