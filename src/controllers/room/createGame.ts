import { WebSocket } from "ws";
import { ICreateGame, ICreatedGameData } from "../../models/roomModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { TConnections } from "../../models/connections.js";
import { generateIdx, sendToClient } from "../../helpers/index.js";

export const createGame = (roomConnections: TConnections) => {
    const idGame = generateIdx();
    for (const index in roomConnections) {
        const socket: WebSocket = roomConnections[index].socket;
        const createdGameData: ICreatedGameData = {
            idGame,
            idPlayer: index
        };
        const res: ICreateGame = {
            type: EResType.CREATE_GAME,
            data: JSON.stringify(createdGameData),
            id: 0
        };
        sendToClient(socket, res);
    }    
}