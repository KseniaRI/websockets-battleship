import { WebSocketServer } from "ws";

const WS_PORT = 3000;

export const wsServer = new WebSocketServer({ port: WS_PORT }, () => {
    console.log(`Start new WebSocket on ws://localhost:${WS_PORT}!`);
});
