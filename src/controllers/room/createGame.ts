import { ICreateGame, ICreatedGameData, IRoomUser, TConnections } from "../../models/roomModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { sendToClient } from "../../ws_server/index.js";
import { WebSocket } from "ws";
import { generateIdx } from "../../helpers/generateIdx.js";

export const createGame = (connections: TConnections, roomUsers: IRoomUser[]) => {
    const idGame = generateIdx();
    roomUsers.forEach(({ index }) => {
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
    });  
}