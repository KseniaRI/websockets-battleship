import { WebSocket } from "ws";
import { generateIdx } from "../../helpers/generateIdx.js";
import { ILoginReq, ILoginReqData, ILoginRes, ILoginResData } from "../../models/loginModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { updateRoom } from "../room/updateRoom.js";
import { updateWinners } from "./updateWinners.js";
import { IRoomData, IRoomUser } from "../../models/roomModels.js";
import { sendToClient } from "../../helpers/sendData.js";

export const loginAndCreatePlayer = (req: ILoginReq, socket: WebSocket, room?: IRoomData) => {
    const { data } = req;
    const playerData: ILoginReqData = JSON.parse(data);
    const name = playerData.name;
    const playerIndex = generateIdx(); 
    
    const existedUser: IRoomUser | undefined = room?.roomUsers.find(user => user.name === name);
    
    if (existedUser) {
        console.log("User with the same name already exists");
        return;
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

    !room ? updateRoom([]) : updateRoom([room]);

    updateWinners([]);
   
    return JSON.parse(res.data);
}