import { EResType } from "../../models/reqAndResModels.js"
import { ITurn, ITurnData } from "../../models/gameModels.js";
import { TConnections } from "../../models/connections.js";
import { sendToRoomClients } from "../../helpers/index.js";

export const setTurn = (connections: TConnections, clientIndex: string) => {
    const turnData: ITurnData = {
        currentPlayer: clientIndex,
    }
    const res: ITurn = {
        type: EResType.TURN,
        data: JSON.stringify(turnData),
        id: 0
    }
    sendToRoomClients(connections, res);
}