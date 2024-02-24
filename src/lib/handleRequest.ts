import { WebSocket } from "ws";
import { ILoginResData } from "../models/loginModels.js";
import { EReqType, ReqType } from "../models/reqAndResModels.js";
import { IRoomData } from "../models/roomModels.js";
import { IAddShipsData } from "../models/shipsModels.js";
import { TConnections } from "../models/connections.js";
import {
    addShips,
    attack,
    addUserToRoom,
    createRoom,
    loginAndCreatePlayer
} from "../controllers/index.js";

let loginRes: ILoginResData;
let room: IRoomData;
const connections: TConnections = {};

export const handleRequest = (req: ReqType, socket: WebSocket) => {
    switch (req.type) {
        case EReqType.REG: {
            room
                ? loginRes = loginAndCreatePlayer(req, socket, room)
                : loginRes = loginAndCreatePlayer(req, socket);
            connections[loginRes.index] = {
                socket,
                name: loginRes.name,
                id: loginRes.index,
                ships: [],
                wins: 0,
                schemaOfEnemyShips: []
            };
            break;
        }
        case EReqType.CREATE_ROOM: {
            const roomData = createRoom();
            room = { ...roomData };
            break;
        }
        case EReqType.ADD_USER_TO_ROOM: {
            const plaerToAddId = Object.keys(connections).find(key => connections[key].socket === socket);
            if (plaerToAddId) {
                const roomData = addUserToRoom(req, room, connections, plaerToAddId);
                if (roomData) {
                    room = { ...roomData };
                }
            }
            break;
        }      
        case EReqType.ADD_SHIPS: {
            const shipsData: IAddShipsData = JSON.parse(req.data);
            connections[shipsData.indexPlayer].ships = shipsData.ships;
            addShips(connections);
            break;
        }
        case EReqType.ATTACK:
            attack(req, connections);
            break;
        case EReqType.RANDOM_ATTACK:
            attack(req, connections);
        break;
    }     
}