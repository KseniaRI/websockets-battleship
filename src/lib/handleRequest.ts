import { WebSocket } from "ws";
import { loginAndCreatePlayer } from "../controllers/player/loginAndCreatePlayer.js";
import { createRoom } from "../controllers/room/createRoom.js";
import { ILoginReq, ILoginResData } from "../models/loginModels.js";
import { EReqType } from "../models/reqAndResModels.js";
import { IAddUserToRoomReq, ICreateRoomReq, IRoomData } from "../models/roomModels.js";
import { addUserToRoom } from "../controllers/room/addUserToRoom.js";

type ReqTypes = ILoginReq | ICreateRoomReq | IAddUserToRoomReq;
let loginRes: ILoginResData;
let room: IRoomData;

export const handleRequest = (req: ReqTypes, socket: WebSocket) => {

    switch (req.type) {
        case EReqType.REG: {
            console.log('login: ', room);
            room
                ? loginRes = loginAndCreatePlayer(req, socket, room)
                : loginRes = loginAndCreatePlayer(req, socket);
            
            return loginRes;
        }
           
        case EReqType.CREATE_ROOM: {
            const roomData = createRoom(socket);
            room = { ...roomData };
            console.log('create room: ', room);
            return roomData;
        }
        case EReqType.ADD_USER_TO_ROOM: {
            const existedUser = room.roomUsers.find(user => user.name === loginRes.name);
            if (existedUser) {
                console.log("User with this name already in the room");
                return;
            } 
            room.roomUsers = [
                ...room.roomUsers,
                {
                    name: loginRes.name,
                    index: loginRes.index
                }
            ];
            console.log('add user: ', room);
            return addUserToRoom(req, socket, room, loginRes);    
        }           
    }     
}