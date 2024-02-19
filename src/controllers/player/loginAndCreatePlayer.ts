import { generateIdx } from "../../helpers/generateIdx.js";
import { ILoginReq, ILoginReqData, ILoginRes, ILoginResData } from "../../models/loginModels.js";
import { EResType } from "../../models/reqAndResModels.js";

export const loginAndCreatePlayer = (req: ILoginReq): ILoginRes => {
    const { data } = req;
    const parsedData: ILoginReqData = JSON.parse(data);
    const name = parsedData.name;
    const playerIndex = generateIdx(); 

    const resData: ILoginResData = {
        name,
        index: playerIndex,
        error: false,
        errorText: ''
    };
      
    return  {
        type: EResType.REG,
        data: JSON.stringify(resData),
        id: 0
    }
}