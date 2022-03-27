import { spawnSync } from 'child_process';

export const pyFace = (pathImage) => {
    return new Promise((resolve, reject) => {
        const runScript = spawnSync('python', ['./src/scripts/test_image.py', pathImage]);
        const { stdout: data, stderr: error } = runScript;
        if (error.toString().length > 0) {
            reject(error.toString());
        }

        resolve(JSON.parse(data.toString()));
    });
};

export const pyTrain = (pathImage) => {
    return new Promise((resolve, reject) => {
        const runScript = spawnSync('python', ['./src/scripts/train_model.py', pathImage]);
        const { stdout: data, stderr: error } = runScript;
        if (error.toString().length > 0) {
            reject(error.toString());
        }

        resolve(data.toString());
    });
};
