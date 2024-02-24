import { WebSocket } from "ws";
import { IStartGame, IStartGameData } from "../../models/shipsModels.js";
import { TConnections } from "../../models/connections.js";
import { EResType } from "../../models/reqAndResModels.js";
import { sendToClient } from "../../helpers/index.js";

export const startGame = (connections: TConnections) => {
    for (const index in connections) {
        const socket: WebSocket = connections[index].socket;
        const startGameData: IStartGameData = {
            ships: [...connections[index].ships],
            currentPlayerIndex: index, 
        }
        const res: IStartGame = {
            type: EResType.START_GAME,
            data: JSON.stringify(startGameData),
            id: 0,
        };
        sendToClient(socket, res);
    }       
}