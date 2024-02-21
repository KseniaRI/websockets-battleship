import { ICreateGame, ICreatedGameData } from "../../models/roomModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { sendToAllClients } from "../../ws_server/index.js";

export const createGame = (index: string) => {
    const createdGameData: ICreatedGameData = {
        idGame: index,
        idPlayer: index
    };
    const res: ICreateGame = {
        type: EResType.CREATE_GAME,
        data: JSON.stringify(createdGameData),
        id: 0
    };
    sendToAllClients(res);
}