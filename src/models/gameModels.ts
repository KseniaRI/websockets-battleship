import { EReqType, EResType } from "./reqAndResModels.js";
import { IPosition } from "./shipsModels.js";

export interface ITurnData {
    currentPlayer: string
}

export interface ITurn {
    type: EResType.TURN,
    data: string,
    id: 0
}

export interface IReqAttackData {
    gameId: string,
    x: number,
    y: number,
    indexPlayer: string,
}

export interface IAttackReq {
    type: EReqType.ATTACK,
    data: string,
    id: 0
}

export interface IRandomAttackData {
    gameId: string,
    indexPlayer: string
}

export interface IRandomAttackReq {
    type: EReqType.RANDOM_ATTACK,
    data: string,
    id: 0
}
export type IAttackStatus = "miss" | "killed" | "shot" | "";

export interface IAttackFeedbackData {
    position: IPosition,
    currentPlayer: string,
    status: IAttackStatus,  
}

export interface IAttackFeedback {
    type: EResType.ATTACK,
    data: string,
    id: 0
}

export interface IFinishData {
    winPlayer: string
}

export interface IFinish {
    type: EResType.FINISH,
    data: string,  
    id: 0,
}