import { generateIdx } from "../../helpers/generateIdx.js";
import { EResType } from "../../models/reqAndResModels.js";
import { IRoomData, IUpdateRoom } from "../../models/roomModels.js";


export const createRoom = (): IUpdateRoom => {
    const roomId = generateIdx();

    const newRoomData: IRoomData = {
        roomId,
        roomUsers: [],
    };

    return {
        type: EResType.UPDATE_ROOM,
        data: JSON.stringify([ newRoomData ]),
        id: 0,
    }
}