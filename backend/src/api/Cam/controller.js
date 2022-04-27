import WebSocket from 'ws';
import { wssFECAM, wssFEPIR } from '../../app';
import { buildWSURL, checkClientConnection, getSocketClient } from './service';

export const startTransmission = async (req, res, next) => {
    const { nodeNumber } = req.body;
    // const wssCAM = new WebSocket(buildWSURL(nodeNumber, 8000)); // ESP-CAM WS
    // const wssPIR = new WebSocket(buildWSURL(nodeNumber, 8001)); // PIR WS

    if (!checkClientConnection(wssFECAM) || !checkClientConnection(wssFEPIR)) {
        return res.status(400).send({ error: 'Client web sockets are closed!' });
    }

    wssFECAM.clients.forEach((client) => client.send('Hello'));

    return res.status(200).json({ message: 'Web sockets are working!' });
};

export const stopTransmissionClient = async (req, res, next) => {
    const camClient = getSocketClient(wssFECAM);
    const pirClient = getSocketClient(wssFEPIR);

    camClient.close();
    pirClient.close();

    return res.status(200).json({ message: 'Web sockets are closed!' });
};
