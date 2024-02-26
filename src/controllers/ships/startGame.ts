import { WebSocket } from "ws";
import { IStartGame, IStartGameData } from "../../models/shipsModels.js";
import { TConnections } from "../../models/connections.js";
import { EResType } from "../../models/reqAndResModels.js";
import { sendToClient } from "../../helpers/index.js";

export const startGame = (roomConnections: TConnections) => {
    for (const index in roomConnections) {
        const socket: WebSocket = roomConnections[index].socket;
        const startGameData: IStartGameData = {
            ships: [...roomConnections[index].ships],
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