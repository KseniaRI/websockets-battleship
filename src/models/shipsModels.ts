import { EReqType, EResType } from "./reqAndResModels.js";

export type TShipType = "small" | "medium" | "large" | "huge";

export interface IPosition {
    x: number,
    y: number
}

export interface IShipsData {
    position: IPosition,
    direction: boolean,
    length: number,
    type: TShipType
}

export interface IAddShipsData {
    gameId: string,
    ships: IShipsData[],
    indexPlayer: string,
}

export interface IAddShipsReq {
    type: EReqType.ADD_SHIPS,
    data: string,
    id: 0
}

export interface IStartGameData {
    ships: IShipsData[],
    currentPlayerIndex: string
}

export interface IStartGame {
    type: EResType.START_GAME,
    data: string,
    id: 0
}

export interface IShipCell {
    status: "alive" | "isKilled" | "shotted" ,
    position: IPosition
}
export type TEnemyShip = IShipCell[];
export type TSchemaOfEnemyShips = TEnemyShip[];