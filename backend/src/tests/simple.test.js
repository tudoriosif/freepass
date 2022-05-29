import request from 'supertest';
import { app } from '../app';

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
