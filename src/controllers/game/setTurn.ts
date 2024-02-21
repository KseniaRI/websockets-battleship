import { EResType } from "../../models/reqAndResModels.js"
import { ITurn, ITurnData } from "../../models/gameModels.js";
import { TConnections } from "../../models/roomModels.js";
import WebSocket from "ws";
import { sendToClient } from "../../ws_server/index.js";

let currentPlayerIndex: string | undefined;

export const setTurn = (connections: TConnections, clientsIndexes: string[]) => {
    currentPlayerIndex = (!currentPlayerIndex)
        ? clientsIndexes[0]
        : clientsIndexes.find(playerIndex => currentPlayerIndex !== playerIndex);
    
    if (currentPlayerIndex) {
        const turnData: ITurnData = {
            currentPlayer: currentPlayerIndex,
        }

        const res: ITurn = {
            type: EResType.TURN,
            data: JSON.stringify(turnData),
            id: 0
        }
        clientsIndexes.forEach(clientIndex => {
            const socket: WebSocket = connections[clientIndex];
            sendToClient(socket, res);
        })
    } 
}