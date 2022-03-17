import ImageDataURI from 'image-data-uri';
import fs from 'fs';
import { nanoid5 } from '../../config/nanoid';

export const storePhoto = async (req, res, next) => {
    try {
        const { photoBase64 } = req.body;
        const { email } = req.user;

        const path = `./src/faces/${email}/train`;

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        ImageDataURI.outputFile(photoBase64, `${path}/${nanoid5()}.jpg`);

        return res.status(200).json({ message: 'Everything went ok!' });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: error });
    }
};
