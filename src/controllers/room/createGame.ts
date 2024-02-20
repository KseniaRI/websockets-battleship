import { WebSocket } from "ws";
import { ICreateGame, ICreatedGameData } from "../../models/roomModels.js";
import { EResType } from "../../models/reqAndResModels.js";

export const createGame = (socket: WebSocket, index: string) => {
    const createdGameData: ICreatedGameData = {
        idGame: index,
        idPlayer: index
    };
    const res: ICreateGame = {
        type: EResType.CREATE_GAME,
        data: JSON.stringify(createdGameData),
        id: 0
    };
    socket.send(JSON.stringify(res)); 
}