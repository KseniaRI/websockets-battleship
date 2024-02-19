import { WebSocket } from "ws";
import { IUpdateWinners, IWinnerData } from "../../models/winnerModels.js";
import { EResType } from "../../models/reqAndResModels.js";

export const updateWinners = (socket: WebSocket, winnersData: IWinnerData[]) => {
    const res: IUpdateWinners = {
        type: EResType.UPDATE_WINNERS,
        data: JSON.stringify(winnersData),
        id: 0
    }
    socket.send(JSON.stringify(res));
}