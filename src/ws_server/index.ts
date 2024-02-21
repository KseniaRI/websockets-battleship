import { WebSocket, WebSocketServer } from "ws";

const WS_PORT = 3000;

export const wsServer = new WebSocketServer({ port: WS_PORT }, () => {
    console.log(`Start new WebSocket on ws://localhost:${WS_PORT}!`);
});

export const sendToClient = (client: WebSocket, message: any) => {
    client.send(JSON.stringify(message));
};

export const sendToAllClients = (message: any) => {
    wsServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            sendToClient(client, message);
        }
    });
};

export const handleTerminationSignals = () => {
    console.log("Terminating program...");
    wsServer.close(() => {
        process.exit(0);
    });
};