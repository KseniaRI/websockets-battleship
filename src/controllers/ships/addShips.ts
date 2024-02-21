import { WebSocket } from "ws";
import { IAddShipsData, IAddShipsReq } from "../../models/shipsModels.js"
import { startGame } from "./startGame.js";

const connections: { [key: string]:  WebSocket } = {};
const clientsShipsData: IAddShipsData[] = [];

export const addShips = (socket: WebSocket, req: IAddShipsReq) => {
    const { indexPlayer } = JSON.parse(req.data);
    connections[indexPlayer] = socket;
    const shipsData: IAddShipsData = JSON.parse(req.data);
    clientsShipsData.push(shipsData);

    if (clientsShipsData.length === 2) {
        startGame(connections, clientsShipsData); 
    }
}