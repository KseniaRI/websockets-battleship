import { WebSocket } from "ws";
import { generateIdx } from "../../helpers/generateIdx.js";
import { EResType } from "../../models/reqAndResModels.js";
import { IRoomData, IUpdateRoom } from "../../models/roomModels.js";

export const createRoom = (socket: WebSocket) => {
    const roomId = generateIdx();

    const newRoomData: IRoomData = {
        roomId,
        roomUsers: [],
    };

    const res: IUpdateRoom = {
        type: EResType.UPDATE_ROOM,
        data: JSON.stringify([ newRoomData ]),
        id: 0,
    }
    socket.send(JSON.stringify(res));
    return newRoomData;
}