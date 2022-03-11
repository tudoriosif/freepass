import config from './config/config.js';
import mongoose from 'mongoose';
import express, { urlencoded } from 'express';
import cors from 'cors';
import apiRoutes from './api';
import passport from './api/Auth/service.js';

const { mongo, port } = config;

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(urlencoded({ limit: '50mb', extended: true }));
app.use(passport.initialize());

if (mongo.uri) {
    mongoose.set('debug', true);
    mongoose.connect(mongo.uri, mongo.options).catch((error) => console.log(error));
}

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
