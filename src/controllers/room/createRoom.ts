import { generateIdx } from "../../helpers/index.js";
import { IRoomData } from "../../models/roomModels.js";
import { updateRoom } from "./updateRoom.js";

export const createRoom = (rooms: IRoomData[]) => {
    const roomId = generateIdx();
    const newRoomData: IRoomData = {
        roomId,
        roomUsers: [],
    };
    updateRoom([...rooms, newRoomData]);
    return newRoomData;//?
}