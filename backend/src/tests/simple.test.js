import request from 'supertest';
import { app } from '../app';

const userToken = '';
const faceToken = '';

const fingerToken = '';

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
