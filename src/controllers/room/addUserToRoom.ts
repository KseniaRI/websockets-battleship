import { IAddUserToRoomReq, IRoomData } from "../../models/roomModels.js";
import { TConnections } from "../../models/connections.js";
import { updateRoom } from "./updateRoom.js";
import { createGame } from "./createGame.js";
import { getRoomConnections } from "../../helpers/index.js";

export const addUserToRoom = (
    req: IAddUserToRoomReq,
    connections: TConnections,
    plaerToAddId: string,
    rooms: IRoomData[]
) => {
    const { indexRoom } = JSON.parse(req.data);
    const room = rooms.find(room => room.roomId === indexRoom);

    if (room && room.roomUsers.length < 2) { 
        const existedUser = room.roomUsers.find(user => user.index === plaerToAddId);
        if (existedUser) {
            console.log("User with this name already in the room");
            return;
        } 
        connections[plaerToAddId].roomId = indexRoom;

        const updatedRoom: IRoomData = {
            roomId: indexRoom,
            roomUsers: [
                ...room.roomUsers,
                {
                    name: connections[plaerToAddId].name,
                    index: plaerToAddId
                }
            ]
        };

        let updatedRooms: IRoomData[] = [];

        if (updatedRoom.roomUsers.length < 2) {
            updatedRooms = rooms.map(room => {
                if (room.roomId === indexRoom) {
                    return updatedRoom;
                }
                return room;
            });    
        } else if (updatedRoom.roomUsers.length === 2) {
            
            const roomConnections: TConnections = getRoomConnections(connections, indexRoom);

            createGame(roomConnections);
            const indexOfTheRoom = rooms.indexOf(room);
            updatedRooms.splice(indexOfTheRoom, 1); 
        }
        
        updateRoom([...updatedRooms]);
        return updatedRooms;
    } else {
        console.log("already 2 users in the room");
    }
}