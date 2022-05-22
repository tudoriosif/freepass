import Event from './model';
import System from '../System/model';

export const getSystemEvents = async (req, res, next) => {
    try {
        const { systemID } = req.user;

        const system = await System.findOne({ systemID });

        const systemEvents = await Event.find({ systemID: system._id })
            .populate('systemID user')
            .sort({ createdAt: -1 });

        return res.status(200).json({ events: systemEvents });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
};
