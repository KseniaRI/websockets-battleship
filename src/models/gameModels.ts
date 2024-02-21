import { EResType } from "./reqAndResModels.js";

export interface ITurnData {
    currentPlayer: string
}

export interface ITurn {
    type: EResType.TURN,
    data: string,
    id: 0
}