import config from './config/config.js';
import mongoose from 'mongoose';
import express, { urlencoded } from 'express';
import cors from 'cors';
import apiRoutes from './api';

const { mongo, port } = config;

const app = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));

if (mongo.uri) {
    mongoose.set('debug', true);
    mongoose.connect(mongo.uri, mongo.options).catch((error) => console.log(error));
}

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
