import { WebSocket } from "ws";
import { loginAndCreatePlayer } from "../controllers/player/loginAndCreatePlayer.js";
import { createRoom } from "../controllers/room/createRoom.js";
import { ILoginResData } from "../models/loginModels.js";
import { EReqType, ReqType } from "../models/reqAndResModels.js";
import { IRoomData } from "../models/roomModels.js";
import { addUserToRoom } from "../controllers/room/addUserToRoom.js";
import { addShips } from "../controllers/ships/addShips.js";
import { IAddShipsData } from "../models/shipsModels.js";
import { attack } from "../controllers/game/attack.js";

let loginRes: ILoginResData;
let room: IRoomData;
const clientsShipsData: IAddShipsData[] = [];
const connections: { [key: string]: WebSocket } = {};

export const handleRequest = (req: ReqType, socket: WebSocket) => {
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
            connections[loginRes.index] = socket;
            const roomData = addUserToRoom(req, room, loginRes, connections);
            if (roomData) {
                room = { ...roomData };
            } 
            break;
        }      
        case EReqType.ADD_SHIPS: {
            const shipsData: IAddShipsData = JSON.parse(req.data);
            clientsShipsData.push(shipsData);
            addShips(clientsShipsData, connections);
            break;
        }
        case EReqType.ATTACK:
            attack(req, clientsShipsData, connections);
            break;
        case EReqType.RANDOM_ATTACK:
            attack(req, clientsShipsData, connections);
            break;
    }     
}