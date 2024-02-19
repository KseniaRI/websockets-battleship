import { WebSocket } from "ws";
import { IRoomData, IUpdateRoom } from "../../models/roomModels.js";
import { EResType } from "../../models/reqAndResModels.js";

export const updateRoom = (socket: WebSocket, roomData: IRoomData[]) => {
    const res: IUpdateRoom = {
        type: EResType.UPDATE_ROOM,
        data: JSON.stringify(roomData),
        id: 0,
    }
    socket.send(JSON.stringify(res));
}