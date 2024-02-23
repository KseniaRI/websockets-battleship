import { EResType } from "../../models/reqAndResModels.js"
import { ITurn, ITurnData } from "../../models/gameModels.js";
import { TConnections } from "../../models/roomModels.js";
import WebSocket from "ws";
import { sendToClient } from "../../ws_server/index.js";

export const setTurn = (connections: TConnections, clientIndex: string) => {
    const turnData: ITurnData = {
        currentPlayer: clientIndex,
    }
    const res: ITurn = {
        type: EResType.TURN,
        data: JSON.stringify(turnData),
        id: 0
    }
    for (const index in connections) { 
        const socket: WebSocket = connections[index];
        sendToClient(socket, res);
    }
}