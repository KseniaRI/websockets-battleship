import { EResType } from "./reqAndResModels.js";

export interface IWinnerData {
    name: string,
    wins: number
}

export interface IUpdateWinners {
    type: EResType.UPDATE_WINNERS,
    data: string,
    id: 0
}

export interface IPlayerDashboardData {
    name: string,
    id: string,
    wins: number
}