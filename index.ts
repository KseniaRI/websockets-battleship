import WebSocket, { WebSocketServer } from 'ws';
import { httpServer } from "./src/http_server/index.ts";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);

const wsServer = new WebSocketServer({ port: 3000 });

wsServer.on('connection', function (socket) {
    console.log(`New WebSocket connection established`);
    
    socket.on('message', function (message) {
        console.log('Received message:', message.toString());
    });

    socket.on('close', function () {
        console.log('WebSocket connection closed');
    });
});

const host = `ws://localhost:3000`;
const socket = new WebSocket(host);

socket.onopen = function () {
    console.log(`New WebSocket connection on ${host} established`);
    socket.send('Hello server!');
};