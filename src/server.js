import { createServer } from 'http';

async function handler(req, res) {
    res.end('Hello World!');
}

export default createServer(handler);