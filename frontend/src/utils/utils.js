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
