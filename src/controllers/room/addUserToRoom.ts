import { WebSocket } from "ws";
import { IAddUserToRoomReq, IDataToAddUser, IRoomData } from "../../models/roomModels.js";
import { updateRoom } from "./updateRoom.js";
import { ILoginResData } from "../../models/loginModels.js";

export const addUserToRoom = (req: IAddUserToRoomReq, socket: WebSocket, loginRes: ILoginResData) => {
    const { data } = req;
    const parsedData: IDataToAddUser = JSON.parse(data);
    const indexRoom = parsedData.indexRoom;
    const { name, index } = loginRes;
    
    const roomData: IRoomData[] = [
        {
            roomId: indexRoom,
            roomUsers: [
                {
                    name,
                    index
                }
            ]
        }
    ]

    updateRoom(socket, roomData);
}