import { IAttackReq, IReqAttackData } from "../../models/gameModels.js";
import { sendAttackFeedback } from "./sendAttackFeedBack.js";
import { IAddShipsData } from "../../models/shipsModels.js";
import { TConnections } from "../../models/roomModels.js";

export const attack = (req: IAttackReq, clientsShipsData: IAddShipsData[], connections: TConnections) => {
    const { data } = req;
    const parsedAttackData: IReqAttackData = JSON.parse(data);
    sendAttackFeedback(connections, parsedAttackData, clientsShipsData);
}