import { getRoomConnections } from "../../helpers/getRoomConnections.js";
import { TConnections } from "../../models/connections.js";
import { IAttackReq, IRandomAttackData, IRandomAttackReq, IReqAttackData } from "../../models/gameModels.js";
import { sendAttackFeedback } from "./sendAttackFeedBack.js";

export const attack = (
    req: IAttackReq | IRandomAttackReq,
   connections: TConnections,
) => {
    const { indexPlayer } = JSON.parse(req.data);
    const roomId = connections[indexPlayer].roomId;
    const roomConnections = getRoomConnections(connections, roomId)
    const { data } = req;
    const parsedAttackData: IReqAttackData | IRandomAttackData = JSON.parse(data);
    const isPlayerTurn = roomConnections[parsedAttackData.indexPlayer].turn; 
    
    if (isPlayerTurn) {
        sendAttackFeedback(roomConnections, parsedAttackData, connections);
    } 
}