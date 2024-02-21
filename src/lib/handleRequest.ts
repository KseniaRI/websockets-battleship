import { WebSocket } from "ws";
import { loginAndCreatePlayer } from "../controllers/player/loginAndCreatePlayer.js";
import { createRoom } from "../controllers/room/createRoom.js";
import { ILoginReq, ILoginResData } from "../models/loginModels.js";
import { EReqType } from "../models/reqAndResModels.js";
import { IAddUserToRoomReq, ICreateRoomReq, IRoomData } from "../models/roomModels.js";
import { addUserToRoom } from "../controllers/room/addUserToRoom.js";
import { addShips } from "../controllers/ships/addShips.js";
import { IAddShipsReq } from "../models/shipsModels.js";

type ReqTypes = ILoginReq | ICreateRoomReq | IAddUserToRoomReq | IAddShipsReq;

let loginRes: ILoginResData;
let room: IRoomData;

export const handleRequest = (req: ReqTypes, socket: WebSocket) => {
    switch (req.type) {
        case EReqType.REG: 
            room
                ? loginRes = loginAndCreatePlayer(req, socket, room)
                : loginRes = loginAndCreatePlayer(req, socket);
            break;   
        case EReqType.CREATE_ROOM: {
            const roomData = createRoom();
            room = { ...roomData };
            break;
        }
        case EReqType.ADD_USER_TO_ROOM: {
            const roomData = addUserToRoom(req, room, loginRes);
            if (roomData) {
                room = { ...roomData };
            } 
            break;
        }      
        case EReqType.ADD_SHIPS:
            addShips(req);
            break;
    }     
}