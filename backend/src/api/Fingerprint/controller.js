import { nanoid5 } from '../../config/nanoid';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

export const scanFingerprint = async (req, res, next) => {
    // try {
    //     const { email } = req.user;

    //     const path = `./src/faces/${email}/train`;

    //     if (!fs.existsSync(path)) {
    //         fs.mkdirSync(path, { recursive: true });
    //     }

    //     await Promise.all(
    //         photosBase64.map((photoBase64) => {
    //             return ImageDataURI.outputFile(photoBase64, `${path}/${nanoid5()}.jpg`);
    //         })
    //     );

    //     const result = await pyTrain(path);

    //     const payload = {
    //         id: req.user._id || req.user.id,
    //         email: req.user.email,
    //         path
    //     };

    //     const faceToken = jwt.sign({ user: payload }, config.secretKey);

    //     return res.status(200).json({ message: result, faceToken });
    // } catch (error) {
    //     console.log(error);
    //     return res.status(401).send({ error: error });
    // }
};
export const checkFingerprint = async (req, res, next) => {
    // try {
    //     const { email } = req.user;

    //     const path = `./src/faces/${email}/train`;

    //     if (!fs.existsSync(path)) {
    //         fs.mkdirSync(path, { recursive: true });
    //     }

    //     await Promise.all(
    //         photosBase64.map((photoBase64) => {
    //             return ImageDataURI.outputFile(photoBase64, `${path}/${nanoid5()}.jpg`);
    //         })
    //     );

    //     const result = await pyTrain(path);

    //     const payload = {
    //         id: req.user._id || req.user.id,
    //         email: req.user.email,
    //         path
    //     };

    //     const faceToken = jwt.sign({ user: payload }, config.secretKey);

    //     return res.status(200).json({ message: result, faceToken });
    // } catch (error) {
    //     console.log(error);
    //     return res.status(401).send({ error: error });
    // }
};