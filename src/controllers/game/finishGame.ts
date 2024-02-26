import { sendToRoomClients, updateWinnersData } from "../../helpers/index.js";
import { TConnections } from "../../models/connections.js";
import { IFinishData } from "../../models/gameModels.js";
import { EResType } from "../../models/reqAndResModels.js";

export const finishGame = (
    connections: TConnections,
    attackingPlayerId: string,
    enemyPlayerId: string,
) => {
    const finishData: IFinishData = {
        winPlayer: attackingPlayerId
    }; 
    connections[attackingPlayerId].schemaOfEnemyShips = [];
    connections[enemyPlayerId].schemaOfEnemyShips = []
    const res = {
        type: EResType.FINISH,
        data: JSON.stringify(finishData),
        id: 0,
    }
    sendToRoomClients(connections, res);
    updateWinnersData(attackingPlayerId, connections);
    connections[attackingPlayerId].turn = false;
}