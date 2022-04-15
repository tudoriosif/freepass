import jwt from 'jsonwebtoken';
import { FINGER_OP, NODE_TYPES } from '../../utils/constants';
import { fingerprintService } from './service';
import Node from '../Node/model';
import System from '../System/model';

export const scanFingerprint = async (req, res, next) => {
    try {
        const { email, noSystem } = req.user;

        const { systemID } = req.body;

        const systemObj = await System.findOne({ systemID });

        const fingerprintNode = await Node.findOne({ systemID: systemObj._id, type: NODE_TYPES.FP });

        const scanResults = await fingerprintService(FINGER_OP.SCAN, noSystem, fingerprintNode.nodeID);

        const payload = {
            id: req.user._id || req.user.id,
            email,
            templateTen: scanResults.template.slice(0, 10)
        };

        const fingerprintToken = jwt.sign({ user: payload }, config.secretKey);

        return res.status(200).json({ message: 'Finger print was saved successfully', fingerprintToken });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: error });
    }
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
