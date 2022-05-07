import supertest from 'supertest';
import Server from '../../src/server.js';

describe('API E2E Test Suite', () => {

    beforeEach(async () => {
        await supertest(Server).delete('/');
    });

    test('POST / - should save an item and return it', async () => {
        const response = await supertest(Server).post('/').send({
            name: 'Test',
            age: 10
        });

        const expectedResponse = JSON.stringify({ ok: true})

        expect(response.text).toStrictEqual(expectedResponse);
    })

    test('GET / - should return an array', async () => {
        const response = await supertest(Server).get('/');
        const data = JSON.parse(response.text);

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(0);
    })

    test('DELETE / - should save clear database and return ok', async () => {
        const response = await supertest(Server).delete('/');

        const expectedResponse = JSON.stringify({ ok: true})

        expect(response.text).toStrictEqual(expectedResponse);
    })

    test('POST + GET + DELETE / - should save an item, retrieve it then delete it', async () => {
        let response = await supertest(Server).post('/').send({
            name: 'Test',
            age: 10
        });

        const expectedResponse = JSON.stringify({ ok: true})

        expect(response.text).toStrictEqual(expectedResponse);

        response = await supertest(Server).get('/');
        let data = JSON.parse(response.text);

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(1);
        expect(data[0]).toMatchObject({
            name: 'Test',
            age: 10
        });
        expect(data[0].id).toBeDefined();

        await supertest(Server).delete('/');

        response = await supertest(Server).get('/');
        data = JSON.parse(response.text);

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(0);
    })
})