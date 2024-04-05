import { setTurn } from "../controllers/index.js";
import { TConnections } from "../models/connections.js";
import { IAttackStatus } from "../models/gameModels.js";

export const changeTurn = (
    roomConnections: TConnections,
    resStatus: IAttackStatus,
    attackingPlayerId: string,
    enemyPlayerId: string,
) => {
    if (resStatus === "killed" || resStatus === "shot") {
        setTurn(roomConnections, attackingPlayerId);
    } else if (resStatus === "miss") {
        roomConnections[attackingPlayerId].turn = false;
        setTurn(roomConnections, enemyPlayerId);    
    }
}