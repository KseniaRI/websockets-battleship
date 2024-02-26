import { TConnections } from "../../models/connections.js";
import { IAttackReq, IRandomAttackData, IRandomAttackReq, IReqAttackData } from "../../models/gameModels.js";
import { sendAttackFeedback } from "./sendAttackFeedBack.js";

export const attack = (
    req: IAttackReq | IRandomAttackReq,
    connections: TConnections,
) => {
    const { data } = req;
    const parsedAttackData: IReqAttackData | IRandomAttackData = JSON.parse(data);
    const isPlayerTurn = connections[parsedAttackData.indexPlayer].turn; 
    isPlayerTurn && sendAttackFeedback(connections, parsedAttackData);
}