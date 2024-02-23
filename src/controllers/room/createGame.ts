import { ICreateGame, ICreatedGameData, TConnections } from "../../models/roomModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { WebSocket } from "ws";
import { generateIdx } from "../../helpers/generateIdx.js";
import { sendToClient } from "../../helpers/sendData.js";

export const createGame = (connections: TConnections) => {
    const idGame = generateIdx();
    for (const index in connections) {
        const socket: WebSocket = connections[index];
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