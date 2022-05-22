import WebSocket from 'ws';
import { wssFECAM, wssFEPIR } from '../../app';
import { eventMiddleware } from '../Event/middleware';
import { buildWSURL, checkClientConnection, getSocketClient } from './service';

export const startTransmission = async (req, res, next) => {
    const { nodeNumber } = req.body;
    // const wssCAM = new WebSocket(buildWSURL(20, 80)); // ESP-CAM WS
    const wssPIR = new WebSocket(buildWSURL(20, 81)); // PIR WS

    // wssCAM.on('open', function open() {
    //     console.log('WSSCAM open!')
    // });

    // wssCAM.onerror = (error) => console.log(error);

    // wssCAM.on('message', function message(data) {
    //     console.log('received: %s', data);
    // });

    wssPIR.on('open', function open() {
        console.log('WSSCAM open!')
    });

    wssPIR.onerror = (error) => console.log(error);

    wssPIR.on('message', function message(data) {
        wssFECAM.clients.forEach((client) => client.send(data.toString()));
    });

    // Add events PIR = DETECT, START_VIDEO

    //TO CLOSE CONNECTION IF CLIENT CLOSES

    //GENERATE EVENTS - PIR

    if (!checkClientConnection(wssFECAM) || !checkClientConnection(wssFEPIR)) {
        return res.status(400).send({ error: 'Client web sockets are closed!' });
    }


    // eventMiddleware('video_start', req.user);

    return res.status(200).json({ message: 'Web sockets are working!' });
};

export const stopTransmissionClient = async (req, res, next) => {
    const camClient = getSocketClient(wssFECAM);
    const pirClient = getSocketClient(wssFEPIR);

    camClient.close();
    pirClient.close();

    return res.status(200).json({ message: 'Web sockets are closed!' });
};
