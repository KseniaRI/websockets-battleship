import { generateIdx } from "../../helpers/generateIdx.js";
import { IRoomData } from "../../models/roomModels.js";
import { updateRoom } from "./updateRoom.js";

export const createRoom = () => {
    const roomId = generateIdx();
    const newRoomData: IRoomData = {
        roomId,
        roomUsers: [],
    };
    updateRoom([newRoomData])
    return newRoomData;
}