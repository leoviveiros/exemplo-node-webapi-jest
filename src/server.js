import { createServer } from 'http';
import { once } from 'events';

const Database = new Map();

function jsonResponse(data, response) {
    return response.end(JSON.stringify(data));
}

async function handler(request, response) {
    const { method } = request;

    if (method === 'GET') {
        return jsonResponse([...Database.values()], response);
    }

    if (method === 'POST') {
        const body = JSON.parse(await once(request, 'data'));

        console.log(body);

        return jsonResponse({ ok: true }, response);
    }

    if (method === 'DELETE') {
        return jsonResponse({ ok: true }, response);
    }
}

export default createServer(handler);