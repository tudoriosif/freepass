import User from './model';
import System from '../System/model';

export const getUsersBySystem = async (req, res, next) => {
    try {
        const { noSystem, systemID } = req.user;

        if (noSystem !== 1) {
            // not admin
            return res.status(401).send({ error: "You don't have the required access!" });
        }

        const system = await System.findOne({ systemID });

        const users = await User.find({ systemID: system._id }).sort({ noSystem: 1 });

        console.log(users)

        return res.status(200).json({ users: users });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};
