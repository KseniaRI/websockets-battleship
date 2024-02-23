import WebSocket from 'ws';
import { wsServer } from './src/ws_server/index.ts';
import { httpServer } from "./src/http_server/index.ts"; 
import { handleRequest } from './src/lib/handleRequest.ts';
import { handleTerminationSignals } from './src/helpers/handleTerminationSignals.ts'

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);

wsServer.on('connection', (socket: WebSocket) => {
    socket.on('message', async (message) => {
        const req = JSON.parse(message.toString());
        handleRequest(req, socket);
    });
    
    socket.on('close', function () {
        console.log('WebSocket connection closed');
    });
});

process.on('SIGINT', handleTerminationSignals);
process.on('SIGTERM', handleTerminationSignals); 