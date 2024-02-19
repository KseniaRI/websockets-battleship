import WebSocket, { WebSocketServer } from 'ws';
import { httpServer } from "./src/http_server/index.ts";
import { ILoginReq } from './src/models/loginModels.ts';
import { ICreateRoomReq } from './src/models/roomModels.ts';
import { handleRequest } from './src/lib/handleRequest.ts';

type ReqTypes = ILoginReq | ICreateRoomReq;

const HTTP_PORT = 8181;
const WS_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);

const wsServer = new WebSocketServer({ port: WS_PORT }, () => {
    console.log(`Start new WebSocket on ws://localhost:${WS_PORT}!`);
});

wsServer.on('connection', (socket: WebSocket) => {
    socket.on('message', async (message) => {
        const req: ReqTypes = JSON.parse(message.toString());
        handleRequest(req, socket);
    });
    
    socket.on('close', function () {
        console.log('WebSocket connection closed');
    });
});

const handleTerminationSignals = () => {
    console.log("Terminating program...");
    wsServer.close(() => {
        process.exit(0);
    });
};

process.on('SIGINT', handleTerminationSignals);
process.on('SIGTERM', handleTerminationSignals); 