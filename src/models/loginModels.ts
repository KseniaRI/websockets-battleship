import { EReqType, EResType } from "./reqAndResModels.js";

export interface ILoginReqData {
    name: string,
    password: string,
}

export interface ILoginReq {
    type: EReqType.REG,
    data: string,
    id: 0,
}

export interface ILoginResData {
    name: string,
    index: string,
    error: boolean,
    errorText: string,
}
export interface ILoginRes {
    type: EResType.REG,
    data: string,
    id: 0,
}