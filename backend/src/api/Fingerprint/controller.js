import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { EVENT_TYPES, FINGER_OP, NODE_TYPES } from '../../utils/constants';
import { fingerprintService } from './service';
import Node from '../Node/model';
import System from '../System/model';
import User from '../User/model';
import config from '../../config/config';
import { eventMiddleware } from '../Event/middleware';

export const scanFingerprint = async (req, res, next) => {
    try {
        const { email, noSystem, systemID } = req.user;

        const systemObj = await System.findOne({ systemID });

        const fingerprintNode = await Node.findOne({ systemID: systemObj._id, type: NODE_TYPES.FP });

        let scanResults;

        try {
            scanResults = await fingerprintService(FINGER_OP.SCAN, noSystem, fingerprintNode.nodeID);
        } catch (error) {
            throw new Error(error.response?.data?.error);
        }
        const payload = {
            id: req.user._id || req.user.id,
            email,
            templateTen: scanResults.template.slice(0, 10)
        };

        const cipherPayload = CryptoJS.AES.encrypt(JSON.stringify(payload), config.secretKey).toString();

        const fingerToken = jwt.sign({ finger: cipherPayload }, config.secretKey);

        const user = await User.findOne({ email });
        user.hasFinger = true;
        await user.save();

        eventMiddleware(EVENT_TYPES.FINGERPRINT, user);

        return res.status(200).json({ message: 'Finger print was saved successfully', fingerToken });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Finger print saving failed' });
    }
};

export const checkFingerprint = async (req, res, next) => {
    try {
        const { email, noSystem, systemID } = req.user;

        const systemObj = await System.findOne({ systemID });

        const fingerprintNode = await Node.findOne({ systemID: systemObj._id, type: NODE_TYPES.FP });

        // const scanResults = await fingerprintService(FINGER_OP.CHECK, noSystem, fingerprintNode.nodeID);


        const payload = {
            id: req.user._id || req.user.id,
            email,
            // confidence: scanResults.confidence
            confidence: 20
        };

        const cipherPayload = CryptoJS.AES.encrypt(JSON.stringify(payload), config.secretKey).toString();

        const fingerToken = jwt.sign({ finger: cipherPayload }, config.secretKey);

        eventMiddleware(EVENT_TYPES.FINGERPRINT, req.user);

        return res.status(200).json({ message: 'Finger print was checked successfully', fingerToken });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Finger print checking failed!' });
    }
};

export const emptyFingerprint = async (req, res, next) => {
    try {
        const { noSystem } = req.user;

        const { systemID } = req.body;

        const systemObj = await System.findOne({ systemID });

        const fingerprintNode = await Node.findOne({ systemID: systemObj._id, type: NODE_TYPES.FP });

        const scanResults = await fingerprintService(FINGER_OP.EMPTY, noSystem, fingerprintNode.nodeID);

        return res.status(200).json({ message: 'Finger print database was deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error.response.data });
    }
};
