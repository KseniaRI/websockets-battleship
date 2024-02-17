import WebSocket, { WebSocketServer } from 'ws';
import { httpServer } from "./src/http_server/index.ts";
import { EReqType, ILoginReq, ILoginRes } from "./src/models/gameModels.ts";
import { loginAndCreatePlayer } from './src/controllers/player/loginAndCreatePlayer.ts';

const HTTP_PORT = 8181;
const WS_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);

const wsServer = new WebSocketServer({ port: WS_PORT }, () => {
    console.log(`Start new WebSocket on ws://localhost:${WS_PORT}!`);
});

wsServer.on('connection', (socket: WebSocket) => {
    socket.on('message', async (message) => {
        const req: ILoginReq = JSON.parse(message.toString());
        let res: ILoginRes | undefined;
        
        if (req.type === EReqType.REG) {
            res = loginAndCreatePlayer(req);
        }
        socket.send(JSON.stringify(res));
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