import config from './config/config.js';
import mongoose from 'mongoose';
import express, { urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRoutes from './api';
import passport from './api/Auth/service.js';
import WebSocket from 'ws';

const { mongo, port } = config;

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(urlencoded({ limit: '50mb', extended: true }));
app.use(passport.initialize());
app.use(morgan('dev'));

if (mongo.uri) {
    mongoose.set('debug', true);
    mongoose.connect(mongo.uri, mongo.options).catch((error) => console.log(error));
}

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api', apiRoutes);

const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});

// Used two different websockets to not overload duplex communication and keep
// PIR/ESP Client differentiated
export const wssFECAM = new WebSocket.Server({ noServer: true }); // ESP-CAM FE Clients
export const wssFEPIR = new WebSocket.Server({ noServer: true }); // PIR FE Cleints

server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = request.url;

    if (pathname === '/stream_cam') {
        wssFECAM.handleUpgrade(request, socket, head, function done(ws) {
            wssFECAM.emit('connection', ws, request);
        });
    } else if (pathname === '/pir_sensor') {
        wssFEPIR.handleUpgrade(request, socket, head, function done(ws) {
            wssFEPIR.emit('connection', ws, request);
        });
    } else {
        console.log('Socket destroyed! ' + pathname);
        socket && socket.destroy();
    }
});

export default {
    wssFECAM,
    wssFEPIR
};
