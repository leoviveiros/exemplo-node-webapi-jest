import { createServer } from 'http';
import { once } from 'events';
import { randomUUID } from 'crypto';

const Database = new Map();

function jsonResponse(data, response) {
    return response.end(JSON.stringify(data));
}

async function postHandler(request, response) {
    const body = JSON.parse(await once(request, 'data'));

    const id = randomUUID();
    const data = { id, ...body };

    Database.set(id, data);

    console.log(data);

    return jsonResponse({ ok: true }, response);
}

async function handler(request, response) {
    const { method } = request;

    if (method === 'GET') {
        return jsonResponse([...Database.values()], response);
    }

    if (method === 'POST') {
        return postHandler(request, response);
    }

    if (method === 'DELETE') {
        return jsonResponse({ ok: true }, response);
    }
}

export default createServer(handler);