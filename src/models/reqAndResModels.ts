import { IAttackReq, IRandomAttackReq } from "./gameModels.js";
import { ILoginReq } from "./loginModels.js";
import { IAddUserToRoomReq, ICreateRoomReq } from "./roomModels.js";
import { IAddShipsReq } from "./shipsModels.js";

export enum EReqType {
    REG = "reg",
    CREATE_ROOM = "create_room",
    ADD_USER_TO_ROOM = "add_user_to_room",
    ADD_SHIPS = "add_ships",
    ATTACK = "attack",
    RANDOM_ATTACK = "randomAttack"
}

export enum EResType {
    REG = "reg",
    UPDATE_ROOM = "update_room",
    UPDATE_WINNERS = "update_winners",
    CREATE_GAME = "create_game",
    START_GAME = "start_game",
    TURN = "turn",
    ATTACK= "attack"
}

export type ReqType = ILoginReq | ICreateRoomReq | IAddUserToRoomReq | IAddShipsReq | IAttackReq | IRandomAttackReq;