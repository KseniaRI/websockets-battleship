import { IAddUserToRoomReq, IDataToAddUser, IRoomData } from "../../models/roomModels.js";
import { TConnections } from "../../models/connections.js";
import { updateRoom } from "./updateRoom.js";
import { createGame } from "./createGame.js";

export const addUserToRoom = (
    req: IAddUserToRoomReq,
    room: IRoomData,
    connections: TConnections,
    plaerToAddId: string
) => {
    const { data } = req;
    const parsedData: IDataToAddUser = JSON.parse(data);
    const indexRoom = parsedData.indexRoom;

    const existedUser = room.roomUsers.find(user => user.name === plaerToAddId);
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
                    name: connections[plaerToAddId].name,
                    index: plaerToAddId
                }
            ]
        }
    
    if (roomData.roomUsers.length < 2) {
        updateRoom([roomData]);   
    } else if (roomData.roomUsers.length === 2) {
        createGame(connections);
        updateRoom([]);
    }
    return roomData;
}