import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import passport from 'passport';
import config from '../../config/config';
import User from '../User/model';
import { checkSystem, checkUsers } from './service';
import { eventMiddleware } from '../Event/middleware';
import { EVENT_TYPES } from '../../utils/constants';

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
                systemID: user.systemID?.systemID || user.mainUser?.systemID?.systemID,
                role: user.mainUser ? 'SUB' : 'MAIN',
                noSystem: user.noSystem,
                hasFace: user.hasFace,
                hasFinger: user.hasFinger
            };

            const token = jwt.sign({ user: payload }, config.secretKey);

            eventMiddleware(EVENT_TYPES.LOGIN, user);

            return res.status(200).json({ token, ...payload });
        });
    })(req, res, next); // auto-invoke
};

export const signupUser = async (req, res, next) => {
    const { email, password, systemID } = req.body;

    let newUser;

    try {
        const system = await checkSystem(systemID);

        console.log(system);

        if (!system)
            return res.status(400).json({
                error: 'Please provide a valid System ID'
            });

        if (!(email && password)) return res.status(400).json({ error: 'Please provide an email & password!' });

        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ error: 'Email is already taken!' });

        const existingUsers = await checkUsers(systemID);

        const mainUser = !existingUsers.length
            ? undefined
            : mongoose.Types.ObjectId(existingUsers[existingUsers.length - 1].id); // if it's first user is the main one
        const noSystem = existingUsers.length + 1;

        newUser = await User.create({
            email,
            password,
            systemID: mongoose.Types.ObjectId(system.id),
            mainUser,
            noSystem
        });

        const payload = {
            id: newUser._id || newUser.id,
            email: newUser.email,
            systemID,
            role: newUser.mainUser ? 'SUB' : 'MAIN',
            noSystem: newUser.noSystem,
            hasFace: false,
            hasFinger: false
        };

        const token = jwt.sign({ user: payload }, config.secretKey);

        eventMiddleware(EVENT_TYPES.NEW_ACCOUNT, newUser);

        return res.status(201).json({ mesasge: 'New user created!', ...payload, token });
    } catch (error) {
        newUser?.remove();
        return next(error);
    }
};
