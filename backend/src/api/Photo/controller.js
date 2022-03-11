import ImageDataURI from 'image-data-uri';

export const storePhoto = async (req, res, next) => {
    try {
        const { photoBase64 } = req.body;

        ImageDataURI.outputFile(photoBase64, 'received-photo.jpeg');

        return res.status(200).json({ message: 'Everything went ok!' });
    } catch (error) {
        return res.status(401).send({ error: 'This is my custom message' });
    }
};
