import ImageDataURI from 'image-data-uri';
import fs from 'fs';
import { nanoid5 } from '../../config/nanoid';
import { facePy, pyFace } from './service';

export const storeTrainPhoto = async (req, res, next) => {
    try {
        const { photoBase64 } = req.body;
        const { email } = req.user;

        const path = `./src/faces/${email}/train`;

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        ImageDataURI.outputFile(photoBase64, `${path}/${nanoid5()}.jpg`);

        return res.status(200).json({ message: 'Everything went ok!' });
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

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const fileName = fs.readdirSync(`./src/faces/${email}/check`);
        const lastFileNum = fileName.map((file) => +file.replace(/\.[^/.]+$/, '')).sort((a, b) => b - a)[0] || 0;

        await ImageDataURI.outputFile(photoBase64, `${path}/${lastFileNum + 1}.jpg`);

        // Call python face detection
        const results = await pyFace(`${path}/${lastFileNum + 1}.jpg`); // this needs to be changed after save photo in +1

        console.log(results);

        return res.status(200).json({ message: 'Everything went ok!' });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: error });
    }
};
