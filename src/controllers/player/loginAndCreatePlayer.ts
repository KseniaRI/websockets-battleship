import { WebSocket } from "ws";
import { generateIdx } from "../../helpers/generateIdx.js";
import { ILoginReq, ILoginReqData, ILoginRes, ILoginResData } from "../../models/loginModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { updateRoom } from "../room/updateRoom.js";
import { updateWinners } from "./updateWinners.js";
import { IRoomData } from "../../models/roomModels.js";

export const loginAndCreatePlayer = (req: ILoginReq, socket: WebSocket, room?: IRoomData) => {
    const { data } = req;
    const parsedData: ILoginReqData = JSON.parse(data);
    const name = parsedData.name;

    const existedUser = room?.roomUsers.find(user => user.name === name);
    if (existedUser) {
        console.log("User with the same name already exists");
        return;
    }
    const playerIndex = generateIdx(); 

    const resData: ILoginResData = {
        name,
        index: playerIndex,
        error: false,
        errorText: ''
    };
      
    const res: ILoginRes =  {
        type: EResType.REG,
        data: JSON.stringify(resData),
        id: 0
    }

    socket.send(JSON.stringify(res));

    (!room) ? updateRoom(socket, []) : updateRoom(socket, [room]);

    updateWinners(socket, []);

    return JSON.parse(res.data);
}