import WebSocket from 'ws';
import { buildWSURL } from '../api/Cam/service';
import { wssFEPIR, wssFECAM } from '../app';

export const startWSCAM = (wss, addr, port) => {
    return new Promise((resolve, reject) => {
        wss = new WebSocket(buildWSURL(addr, port));

        wss.on('open', function open() {
            console.log('WSS PORT: ' + port + ' ' + addr + ' has opend!');
            resolve(wss);
        });

        wss.on('message', function message(data) {
            wssFECAM.clients.forEach((client) => client.send(data));
        });

        wss.onerror = (error) => {
            console.log('Error occured on WSS PORT: ' + port);
            reject(error);
        };
    });
};

export const startWSPIR = (wss, addr, port) => {
    return new Promise((resolve, reject) => {
        wss = new WebSocket(buildWSURL(addr, port));

        wss.on('open', function open() {
            console.log('WSS PORT: ' + port + ' ' + addr + ' has opend!');
            resolve(wss);
        });

        wss.on('message', function message(data) {
            wssFEPIR.clients.forEach((client) => client.send(data.toString()));
        });

        wss.onerror = (error) => {
            console.log('Error occured on WSS PORT: ' + port);
            reject(error);
        };
    });
};

export const closeWS = (wss) => {
    return new Promise((resolve, reject) => {
        wss.close();

        wss.onclose = (close) => {
            console.log('WSS closed!');
            resolve(wss);
        };

        wss.onerror = (error) => {
            console.log('Error occured on WSS');
            reject(wss);
        };
    });
};
