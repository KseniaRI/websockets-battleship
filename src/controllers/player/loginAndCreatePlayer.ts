import { EResType, ILoginReq, ILoginReqData, ILoginResData } from "../../models/gameModels.js";

export const loginAndCreatePlayer = (req: ILoginReq) => {
    const { data, id } = req;
    const parsedData: ILoginReqData = JSON.parse(data);
    const name = parsedData.name;

    const resData: ILoginResData = {
        name,
        index: 0,
        error: false,
        errorText: ''
    };
            
    return  {
        type: EResType.REG,
        data: JSON.stringify(resData),
        id
    }
}