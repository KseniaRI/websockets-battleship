import { WebSocket } from "ws";
import { generateIdx } from "../../helpers/generateIdx.js";
import { ILoginReq, ILoginReqData, ILoginRes, ILoginResData } from "../../models/loginModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { updateRoom } from "../room/updateRoom.js";
import { updateWinners } from "./updateWinners.js";

export const loginAndCreatePlayer = (req: ILoginReq, socket: WebSocket) => {
    const { data } = req;
    const parsedData: ILoginReqData = JSON.parse(data);
    const name = parsedData.name;
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
    const loginRes: ILoginResData = JSON.parse(res.data);
    socket.send(JSON.stringify(res));
    updateRoom(socket, []);
    updateWinners(socket, []);
    return JSON.parse(res.data);
}