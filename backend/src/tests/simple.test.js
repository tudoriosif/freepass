import request from 'supertest';
import { app } from '../app';

const userToken =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVTJGc2RHVmtYMTlHMDVxdXVaVlN3cHdlY0U4UnlBQWMzTk5NRC9QbFVxdEMxUVl2amFlTkpiMVR5N1k2eEt1T1EweC9NTlJObC9KTzZHUllvTGpLVzVYQzhidFRqMnAycndSWGFaY25rTDZtckd4NmdFcVllMDA2ZEhXWSt5RFY2QVBqdFp3TGlpQXV3OTljcFcxRFNsMVFMUjFYMHZ5QldwcXNVTTR1MzFKaWFXRHNQa0xMWVVGU2Q1R3ZCMkthNmduWjNZaGVtM1hsRmdnTXVCTEtOcGRzM1Z2dUFRSnNwVlBpU21kdnI1b0V3Sko1a3psRE5iVlBaalIyaFhNYSIsImlhdCI6MTY1Mzc2ODAwMX0.do7Jq7ukXxCsm_Cd6afMjJsyTJHeuD2prwL3DYLQT0Q';

const faceToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlIjoiVTJGc2RHVmtYMTl1Qm9CbnRjSTNIZWpBcWNzRXVRbnlTRTE3aUtKZzgzZW1jVUF2VGFReVJOUnNYSHh0b2xZUFovd0x1eVlUUjd5QWw3aThHTzd1UExFZ1g4MVNlTTRqcENxVUxpY3BNZHVuajZHNXZEbUxib09BSEYrVzBPVmtqQWl5SExWeEdZVzRUVFpUMXFISFlHWnhONndqY0trUm1Jakt6R3poemU0QUhpQS9MU2p3WEdDRHNuMUJ2dEZoIiwiaWF0IjoxNjUzNzY4MDA5fQ.zwDkn1vTSvp5CVUmipq1rnh1_olfvmr_DcdlQ0uFDq8';

const fingerToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaW5nZXIiOiJVMkZzZEdWa1gxKy9tL2VSdGZqeE5TcHFRMmJra2w2Ukk3TzVsSW05ckN2VWlYQkUxVm9ZaTBkdVhQU3FLMUVQSnZjNFJLUm5yMzU0QWZ2ZDY3TXR0TjJYMFJKcnFtWGNYdjF4bzFLYnB3T2hWZmpWaUh4STRseDZnWXg3c3h6aGRrM0pKN2l2NUxMUVFXMW9MR1RGZHc9PSIsImlhdCI6MTY1Mzc2ODAwMn0.fmYBLnCojKl4LktlTWmxv6rjtsXRk0jmPEpq6zXgr38';

describe('Rute login', () => {
    it('Acreditari corecte - returnare jeton, status 200', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'tudor_iosif@yahoo.com',
            password: '123456'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('Email sau parola incorecte - mesaj neautorizat, status 401', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'tudor_iosif@yahoo.com',
            password: '1234567'
        });
        expect(res.statusCode).toEqual(401);
    });

    it('Email si parola incorecte - mesaj neautorizat, status 401', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'tudor_iosfif@yahoo.com',
            password: '123456f7'
        });
        expect(res.statusCode).toEqual(401);
    });
});

describe('Rute sistem', () => {
    it('Preluare evenimente - returnare evenimente, raspuns 200', async () => {
        const res = await request(app)
            .get('/api/events/system')
            .set({ Authorization: userToken, AuthorizationFace: faceToken, AuthorizationFinger: fingerToken });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('events');
    });

    it('Preluare componente - returnare componente, raspuns 200', async () => {
        const res = await request(app)
            .get('/api/node/system')
            .set({ Authorization: userToken, AuthorizationFace: faceToken, AuthorizationFinger: fingerToken });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nodes');
    });

    it('Preluare utilizatori sistem - returnare utilizatori, raspuns 200', async () => {
        const res = await request(app)
            .get('/api/users/all')
            .set({ Authorization: userToken, AuthorizationFace: faceToken, AuthorizationFinger: fingerToken });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('users');
    });
});
