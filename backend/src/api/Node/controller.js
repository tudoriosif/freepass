import Node from './model';
import System from '../System/model';

export const getSystemNodes = async (req, res, next) => {
    try {
        const { systemID } = req.user;

        const system = await System.findOne({ systemID });

        const systemNodes = await Node.find({ systemID: system._id });

        return res.status(200).json({ nodes: systemNodes });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
};
