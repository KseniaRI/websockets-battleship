import { WebSocket } from "ws";
import { IAddUserToRoomReq, IDataToAddUser, IRoomData } from "../../models/roomModels.js";
import { updateRoom } from "./updateRoom.js";
import { createGame } from "./createGame.js";
import { ILoginResData } from "../../models/loginModels.js";

export const addUserToRoom = (req: IAddUserToRoomReq, socket: WebSocket, room: IRoomData, loginRes: ILoginResData) => {
    const { data } = req;
    const parsedData: IDataToAddUser = JSON.parse(data);
    const indexRoom = parsedData.indexRoom;

    const roomData: IRoomData[] = [
        {
            roomId: indexRoom,
            roomUsers: [...room.roomUsers]  
        }
    ]

    if (roomData[0].roomUsers.length < 2) {
        updateRoom(socket, roomData);   
    } else if (roomData[0].roomUsers.length === 2) {
        createGame(socket, loginRes.index);
        updateRoom(socket, []);
    }
}