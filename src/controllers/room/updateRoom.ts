import { IRoomData, IUpdateRoom } from "../../models/roomModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { sendToAllClients } from "../../helpers/index.js";

export const updateRoom = (roomData: IRoomData[]) => {
    const res: IUpdateRoom = {
        type: EResType.UPDATE_ROOM,
        data: JSON.stringify(roomData),
        id: 0,
    }
    sendToAllClients(res);
}