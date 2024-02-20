import { WebSocket } from "ws";
import { loginAndCreatePlayer } from "../controllers/player/loginAndCreatePlayer.js";
import { createRoom } from "../controllers/room/createRoom.js";
import { ILoginReq, ILoginResData } from "../models/loginModels.js";
import { EReqType } from "../models/reqAndResModels.js";
import { IAddUserToRoomReq, ICreateRoomReq } from "../models/roomModels.js";
import { addUserToRoom } from "../controllers/room/addUserToRoom.js";

type ReqTypes = ILoginReq | ICreateRoomReq | IAddUserToRoomReq;
let loginRes: ILoginResData;

export const handleRequest = (req: ReqTypes, socket: WebSocket) => {

    switch (req.type) {
        case EReqType.REG: {
            loginRes = loginAndCreatePlayer(req, socket);
            return loginRes;
        }
           
        case EReqType.CREATE_ROOM:
            return createRoom(socket);
        case EReqType.ADD_USER_TO_ROOM: 
            return addUserToRoom(req, socket, loginRes);    
    }     
}