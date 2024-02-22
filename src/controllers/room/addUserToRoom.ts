import { IAddUserToRoomReq, IDataToAddUser, IRoomData, TConnections } from "../../models/roomModels.js";
import { updateRoom } from "./updateRoom.js";
import { createGame } from "./createGame.js";
import { ILoginResData } from "../../models/loginModels.js";

export const addUserToRoom = (req: IAddUserToRoomReq, room: IRoomData, loginRes: ILoginResData, connections: TConnections) => {
    const { data } = req;
    const parsedData: IDataToAddUser = JSON.parse(data);
    const indexRoom = parsedData.indexRoom;

    const existedUser = room.roomUsers.find(user => user.name === loginRes.name);
    if (existedUser) {
        console.log("User with this name already in the room");
        return;
    } 
    const roomData: IRoomData = 
        {
            roomId: indexRoom,
            roomUsers: [
                ...room.roomUsers,
                {
                    name: loginRes.name,
                    index: loginRes.index
                }
            ]
        }
    
    if (roomData.roomUsers.length < 2) {
        updateRoom([roomData]);   
    } else if (roomData.roomUsers.length === 2) {
        createGame(connections, roomData.roomUsers);
        updateRoom([]);
    }
    return roomData;
}