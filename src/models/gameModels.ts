export enum EReqType {
    REG = "reg",
}

export enum EResType {
    REG = "reg",
}

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
    index: number,
    error: boolean,
    errorText: string,
}
export interface ILoginRes {
    type: EResType.REG,
    data: string,
    id: 0,
}