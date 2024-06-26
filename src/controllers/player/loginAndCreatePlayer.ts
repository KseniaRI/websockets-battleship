import { WebSocket } from "ws";
import { ILoginReq, ILoginReqData, ILoginRes, ILoginResData } from "../../models/loginModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { IRoomData, IRoomUser } from "../../models/roomModels.js";
import { sendToClient, generateIdx } from "../../helpers/index.js";
import { updateWinners } from "./updateWinners.js";
import { updateRoom } from "../index.js";

export const loginAndCreatePlayer = (req: ILoginReq, socket: WebSocket, rooms: IRoomData[]) => {
    const { data } = req;
    const playerData: ILoginReqData = JSON.parse(data);
    const name = playerData.name;
    const playerIndex = generateIdx(); 
    
    // const existedUser: IRoomUser | undefined = room?.roomUsers.find(user => user.name === name);
    if (rooms.length > 0) {
        const roomWithSameUser: IRoomData | undefined = rooms.find(room => room.roomUsers.find(user => user.name === name));

    // if (existedUser) {
    //     console.log("User with the same name already exists");
    //     return;
        // }
        
        if (roomWithSameUser) {
            console.log("User with the same name already in the room");
            return;
        }
    }
    

    const resData: ILoginResData = {
        name,
        index: playerIndex,
        error: false,
        errorText: ''
    };
      
    const res: ILoginRes = {
        type: EResType.REG,
        data: JSON.stringify(resData),
        id: 0
    };

    sendToClient(socket, res);

    // !room ? updateRoom([]) : updateRoom([room]);

    // rooms.length === 0 ? updateRoom([]) : updateRoom([...rooms]);
    updateRoom([...rooms]);
    updateWinners([]);
   
    return JSON.parse(res.data);
}