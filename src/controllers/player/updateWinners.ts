import { IUpdateWinners, IWinnerData } from "../../models/winnerModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { sendToAllClients } from "../../ws_server/index.js";

export const updateWinners = (winnersData: IWinnerData[]) => {
    const res: IUpdateWinners = {
        type: EResType.UPDATE_WINNERS,
        data: JSON.stringify(winnersData),
        id: 0
    }
    sendToAllClients(res);
}