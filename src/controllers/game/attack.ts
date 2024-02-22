import { WebSocket } from "ws";
import { IAttackReq, IReqAttackData } from "../../models/gameModels.js";
import { sendAttackFeedback } from "./sendAttackFeedBack.js";
import { IAddShipsData } from "../../models/shipsModels.js";

const connections: { [key: string]: WebSocket } = {};
const attacksData: IReqAttackData[] = [];

export const attack = (socket: WebSocket, req: IAttackReq, clientsShipsData: IAddShipsData[]) => {
    const { data } = req;
    const parsedData: IReqAttackData = JSON.parse(data);
    const indexPlayer = parsedData.indexPlayer;
    connections[indexPlayer] = socket;
    attacksData.push(parsedData);
    
    sendAttackFeedback(connections, attacksData, clientsShipsData);
}