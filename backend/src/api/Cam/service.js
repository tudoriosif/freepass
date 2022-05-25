import { WebSocket } from 'ws';
import config from '../../config/config';

export const buildWSURL = (nodeNumber, port) => {
    return `ws://${config.wsBaseURL}.${nodeNumber}:${port}`;
};

export const checkClientConnection = (wss) => {
    const clientState = wss.clients?.values().next().value?._readyState; // 1 - OPEN Duplex
    console.log(clientState);
    return clientState === WebSocket.OPEN;
};

export const getSocketClient = (wss) => {
    return wss.clients?.values().next().value;
};
