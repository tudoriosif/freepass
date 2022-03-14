import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import passport from 'passport';
import config from '../../config/config';
import User from '../User/model';
import { checkSystem } from './service';

export const loginUser = async (req, res, next) => {
    passport.authenticate('login', async (error, user, info) => {
        if (error) return next(error);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized!' });
        }

        req.login(user, { session: false }, (error) => {
            if (error) {
                return next(error);
            }

            const payload = {
                id: user._id || user.id,
                email: user.email,
                systemID: user.systemID.systemID,
                role: user.mainUser ? 'SUB' : 'MAIN'
            };

            const token = jwt.sign({ user: payload }, config.secretKey);

            return res.status(200).json({ token, ...payload });
        });
    })(req, res, next); // auto-invoke
};

export const signupUser = async (req, res, next) => {
    const { email, password, systemID } = req.body;

    try {
        const system = await checkSystem(systemID);
        if (!system)
            return res.status(400).json({
                error: 'Please provide a valid System ID or contact Main user to add a new account on this system'
            });
        if (!(email && password)) return res.status(400).json({ error: 'Please provide an email & password!' });

        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ error: 'Email is already taken!' });

        const newUser = await User.create({ email, password, systemID: mongoose.Types.ObjectId(system.id) });

        return res.status(201).json({ mesasge: 'New user created!', newUser });
    } catch (error) {
        return next(error);
    }
};
