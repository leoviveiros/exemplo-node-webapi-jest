import Server from './src/server.js';

const server = Server.listen(3000)
    .on('listening', () => { console.log(`running at ${server.address().port}`) })