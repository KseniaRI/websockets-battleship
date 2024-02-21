import { EResType } from "../../models/reqAndResModels.js"
import { IAddShipsReq, IStartGame, IStartGameData } from "../../models/shipsModels.js"
import { sendToAllClients } from "../../ws_server/index.js"

export const addShips = (req: IAddShipsReq) => {
    const { ships, indexPlayer } = JSON.parse(req.data);
    const startGameData: IStartGameData = {
        ships: [...ships],
        currentPlayerIndex: indexPlayer, 
    }
    const res: IStartGame = {
        type: EResType.START_GAME,
        data: JSON.stringify(startGameData),
        id: 0,
    };
    sendToAllClients(res);
}