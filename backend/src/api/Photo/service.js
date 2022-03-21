import { spawn } from 'child_process';

export const pyFace = (pathImage) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('hERE2');
            const runScript = spawn('python', ['./src/scripts/face.py', pathImage]);

            runScript.stdout.on('data', (data) => resolve(data.toString()));
            runScript.on('error', (error) => {
                throw new Error(error);
            });
        } catch (error) {
            reject(error);
        }
    });
};
