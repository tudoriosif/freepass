import WebSocket from 'ws';
import { wssFECAM, wssFEPIR } from '../../app';
import { closeWS, startWSCAM, startWSPIR } from '../../utils/startWS';
import { eventMiddleware } from '../Event/middleware';
import { buildWSURL, checkClientConnection, getSocketClient } from './service';

let wssPIR, wssCAM;

export const startTransmission = async (req, res, next) => {
    const { nodeNumber } = req.body;
    try {
        if (!!wssCAM && wssCAM._readyState === 1) await closeWS(wssCAM);
        if (!!wssPIR && wssPIR._readyState === 1) await closeWS(wssPIR);
        wssCAM = await startWSCAM(wssCAM, nodeNumber, 80); // ESP-CAM WS
        wssPIR = await startWSPIR(wssPIR, nodeNumber, 81); // PIR WS

        // Add events PIR = DETECT, START_VIDEO

        //TO CLOSE CONNECTION IF CLIENT CLOSES

        //GENERATE EVENTS - PIR

        // if (!checkClientConnection(wssFECAM) || !checkClientConnection(wssFEPIR)) {
        //     return res.status(400).send({ error: 'Client web sockets are closed!' });
        // }

        eventMiddleware('video_start', req.user);

        return res.status(200).json({ message: 'Web sockets are working!' });
    } catch (error) {
        console.log(error, 'Error occured');
        return res.status(400).json({ error: 'Web sockets starting failed!' });
    }
};

export const stopTransmissionClient = async (req, res, next) => {
    try {
        if (!!wssPIR) await closeWS(wssPIR);
        if (!!wssCAM) await closeWS(wssCAM);

        return res.status(200).json({ message: 'Web sockets are closed!' });
    } catch (error) {
        console.log('Closing failed!');
        return res.status(400).json({ error: 'Web sockets closing failed!' });
    }
};
