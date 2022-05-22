import fingerprint from '../assets/fingerprint.png';
import webcam from '../assets/webcam.png';
import platform from '../assets/node-mcu.jpg';
import cam from '../assets/esp32-cam.png';
import pir from '../assets/pir.png';
import fingerprinticon from '../assets/fingerprinticon.png';
import login from '../assets/enter.png';
import facescan from '../assets/user-images.png';
import detect from '../assets/detective.png';
import signup from '../assets/add-user.png';
import videostart from '../assets/video-camera.png';

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

export const eventTypes = {
    login: 'Login',
    new_account: 'Cont nou creat',
    face: 'Salvare/verificare model facial',
    fingerprint: 'Salvare/verificare model amprentă',
    detect: 'Mișcare detectată',
    video_start: 'Pornire transmisie video'
};

export const eventImages = {
    login: login,
    new_account: signup,
    face: facescan,
    fingerprint: fingerprinticon,
    detect: detect,
    video_start: videostart
};
