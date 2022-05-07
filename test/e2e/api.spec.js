import supertest from 'supertest';
import Server from '../../src/server.js';

describe('API E2E Test Suite', () => {
    test('GET / - should return an array', async () => {
        const response = await supertest(Server).get('/');
        const data = JSON.parse(response.text);

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(0);
    })

    test('POST / - should save an item and return it', async () => {
        const response = await supertest(Server).post('/').send({
            name: 'Test',
            age: 10
        });

        const expectedResponse = JSON.stringify({ ok: true})

        expect(response.text).toStrictEqual(expectedResponse);
    })

    test('DELETE / - should save clear database and return ok', async () => {
        const response = await supertest(Server).delete('/');

        const expectedResponse = JSON.stringify({ ok: true})

        expect(response.text).toStrictEqual(expectedResponse);
    })
})