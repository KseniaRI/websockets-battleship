import { IAttackReq, IRandomAttackReq, IReqAttackData } from "../../models/gameModels.js";
import { sendAttackFeedback } from "./sendAttackFeedBack.js";
import { IAddShipsData } from "../../models/shipsModels.js";
import { TConnections } from "../../models/roomModels.js";

export const attack = (
    req: IAttackReq | IRandomAttackReq,
    clientsShipsData: IAddShipsData[],
    connections: TConnections,
) => {
    const { data } = req;
    const parsedAttackData: IReqAttackData = JSON.parse(data);
    const winnerId = sendAttackFeedback(connections, parsedAttackData, clientsShipsData);
    return winnerId;
}