import { loginAndCreatePlayer } from "../controllers/player/loginAndCreatePlayer.js";
import { createRoom } from "../controllers/room/createRoom.js";
import { ILoginReq } from "../models/loginModels.js";
import { EReqType } from "../models/reqAndResModels.js";
import { ICreateRoomReq } from "../models/roomModels.js";

type ReqTypes = ILoginReq | ICreateRoomReq;

export const handleRequest = (req: ReqTypes) => {
    switch (req.type) {
        case EReqType.REG:
            return loginAndCreatePlayer(req);
        case EReqType.CREATE_ROOM:
            return createRoom();
    }     
}