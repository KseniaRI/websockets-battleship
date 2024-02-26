import { sendToRoomClients, updateWinnersData } from "../../helpers/index.js";
import { TConnections } from "../../models/connections.js";
import { IFinishData } from "../../models/gameModels.js";
import { EResType } from "../../models/reqAndResModels.js";

export const finishGame = (
    roomConnections: TConnections,
    connections: TConnections, 
    attackingPlayerId: string,
    enemyPlayerId: string,
) => {
    const finishData: IFinishData = {
        winPlayer: attackingPlayerId
    }; 
    roomConnections[attackingPlayerId].schemaOfEnemyShips = [];
    roomConnections[enemyPlayerId].schemaOfEnemyShips = []
    const res = {
        type: EResType.FINISH,
        data: JSON.stringify(finishData),
        id: 0,
    }
    sendToRoomClients(roomConnections, res);
    updateWinnersData(attackingPlayerId, connections);
    roomConnections[attackingPlayerId].turn = false;
}