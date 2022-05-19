import fingerprint from '../assets/fingerprint.png';
import webcam from '../assets/webcam.png';
import platform from '../assets/node-mcu.jpg';
import cam from '../assets/esp32-cam.png';
import pir from '../assets/pir.png';

export const takePhotos = (webcamRef, noTimes) => {
    return new Promise((resolve, reject) => {
        const arrayPhotos = [];
        const interval = setInterval(() => {
            const photoBase64 = webcamRef.current.getScreenshot();

            arrayPhotos.push(photoBase64);

            if (--noTimes < 1) {
                clearInterval(interval);
                resolve(arrayPhotos);
            }
        }, 150);
    });
};

export const pathToImage = {
    fingerprint: fingerprint,
    platform: platform,
    cam: cam,
    webcam: webcam,
    pir: pir
};
