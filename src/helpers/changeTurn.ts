import { setTurn } from "../controllers/index.js";
import { TConnections } from "../models/connections.js";
import { IAttackStatus } from "../models/gameModels.js";

export const changeTurn = (
    connections: TConnections,
    resStatus: IAttackStatus,
    attackingPlayerId: string,
    enemyPlayerId: string,
) => {
    if (resStatus === "killed" || resStatus === "shot") {
        setTurn(connections, attackingPlayerId);
    } else if (resStatus === "miss") {
        connections[attackingPlayerId].turn = false;
        setTurn(connections, enemyPlayerId);    
    }
}