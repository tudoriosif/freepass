import User from './model';
import System from '../System/model';
import { getSystemByUser } from '../../utils/getSystemIdByUser';

export const getUsersBySystem = async (req, res, next) => {
    try {
        const { noSystem, systemID } = req.user;

        if (noSystem !== 1) {
            // not admin
            return res.status(401).send({ error: "You don't have the required access!" });
        }

        const system = await System.findOne({ systemID });

        const users = await User.find({ systemID: system._id }).sort({ noSystem: 1 });

        return res.status(200).json({ users: users });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

export const addUser = async (req, res, next) => {
    try {
        const system = await getSystemByUser(req.user);

        const { noSystem } = req.user;

        if (noSystem !== 1) {
            // not admin
            return res.status(401).send({ error: "You don't have the required access!" });
        }

        const usersOfSystem = await User.find({ systemID: system._id }).sort({ noSystem: -1 });

        const newUser = await User.create({
            ...req.body,
            systemID: system._id,
            hasFace: false,
            hasFinger: false,
            noSystem: usersOfSystem[0].noSystem + 1
        });

        return res.status(200).json({ message: 'New user has been added!' });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { noSystem } = req.user;
        const { id } = req.params;

        if (noSystem !== 1) {
            // not admin
            return res.status(401).send({ error: "You don't have the required access!" });
        }

        const doc = await User.deleteOne({ _id: id });

        if (!doc.deletedCount) {
            throw new Error(`Error deleting the ${model.name}`);
        }

        return res.status(200).json({ message: 'The user has been deleted!' });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};


