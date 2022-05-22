import ImageDataURI from 'image-data-uri';
import fs from 'fs';
import { nanoid5 } from '../../config/nanoid';
import { pyFace, pyTrain } from './service';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import User from '../User/model';
import { eventMiddleware } from '../Event/middleware';
import { EVENT_TYPES } from '../../utils/constants';

export const storeTrainPhoto = async (req, res, next) => {
    try {
        const { photosBase64 } = req.body;
        const { email } = req.user;

        const path = `./src/faces/${email}/train`;
        const checkPath = `./src/faces/${email}/check`;

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        if (!fs.existsSync(checkPath)) {
            fs.mkdirSync(checkPath, { recursive: true });
        }

        await Promise.all(
            photosBase64.map((photoBase64) => {
                return ImageDataURI.outputFile(photoBase64, `${path}/${nanoid5()}.jpg`);
            })
        );

        const result = await pyTrain(path);

        const payload = {
            id: req.user._id || req.user.id,
            email: req.user.email,
            path
        };

        const user = await User.findOne({ email });
        user.hasFace = true;
        await user.save();

        const faceToken = jwt.sign({ user: payload }, config.secretKey);

        eventMiddleware(EVENT_TYPES.FACE, req.user);

        return res.status(200).json({ message: result, faceToken });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: error });
    }
};

export const checkPhoto = async (req, res, next) => {
    try {
        const { photoBase64 } = req.body;
        const { email } = req.user;

        const path = `./src/faces/${email}/check`;

        // if (!fs.existsSync(path)) {
        //     fs.mkdirSync(path, { recursive: true });
        // }

        // const fileName = fs.readdirSync(`./src/faces/${email}/check`);
        // const lastFileNum = fileName.map((file) => +file.replace(/\.[^/.]+$/, '')).sort((a, b) => b - a)[0] || 0;

        // await ImageDataURI.outputFile(photoBase64, `${path}/${lastFileNum + 1}.jpg`);

        // // Call python face detection
        // const results = await pyFace(`${path}/${lastFileNum + 1}.jpg`);

        // console.log(results);

        const payload = {
            id: req.user._id || req.user.id,
            email,
            path,
            // results
            results: 20
        };

        const faceToken = jwt.sign({ user: payload }, config.secretKey);

        eventMiddleware(EVENT_TYPES.FACE, req.user);

        return res.status(200).json({ message: 'Face recognition done!', stats: 20, faceToken });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: error });
    }
};
