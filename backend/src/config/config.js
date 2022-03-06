import path from 'path';
import 'dotenv/config';

const config = {
    mongo: {
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        uri: process.env.MONGODB_URI
    },
    port: process.env.PORT,
    secretKey: process.env.JWT_SECRET_KEY
};

export default config;
