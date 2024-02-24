import { WebSocket } from "ws";
import { IAttackFeedbackData, IAttackStatus, IRandomAttackData, IReqAttackData } from "../../models/gameModels.js";
import { IShipCell, TSchemaOfEnemyShips, TEnemyShip, IShipsData } from "../../models/shipsModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { TConnections } from "../../models/connections.js";
import { finishGame } from "./finishGame.js";
import {
    getAttackedCoordinates,
    createSchemaOfEnemyShips,
    sendToRoomClients,
    sendDataToAdjiacentCell,
    changeTurn, 
} from '../../helpers/index.js'

export const sendAttackFeedback = (connections: TConnections, attackData: IReqAttackData | IRandomAttackData) => {
    const { indexPlayer: attackingPlayerId } = attackData;
    const { x, y } = getAttackedCoordinates(attackData);
    
    const enemyPlayerId = Object.keys(connections).find(key => key !== attackingPlayerId)!;
    const enemyShips: IShipsData[] = connections[enemyPlayerId].ships;

    if (connections[attackingPlayerId].schemaOfEnemyShips.length === 0) {
        const scemaOfShips: TSchemaOfEnemyShips = createSchemaOfEnemyShips(enemyShips);
        connections[attackingPlayerId].schemaOfEnemyShips = [...scemaOfShips]; 
    } else {
        let resStatus: IAttackStatus | undefined;
        
        const shottedShip: TEnemyShip | undefined = connections[attackingPlayerId].schemaOfEnemyShips.find((ship: TEnemyShip) =>
            ship.find((shipCell: IShipCell) => shipCell.position.x === x && shipCell.position.y === y)
        )        
        
        if (!shottedShip) {
            resStatus = "miss";
        } else {
            let shottedCell: IShipCell = shottedShip.find((shipCell: IShipCell) =>
                shipCell.position.x === x && shipCell.position.y === y)!;
            const shottedShipAlreadyKilled = shottedShip.every(shipCell => shipCell.status === "isKilled");

            if (shottedCell.status === "shotted") {
                resStatus = "shot";
            } 
            else if (shottedShipAlreadyKilled) {
                resStatus = "killed";
            } else {
                resStatus = shottedShip.length === 1 ? "killed" : "shot";
                shottedCell.status = "shotted";

                const killedShip: TEnemyShip | undefined = connections[attackingPlayerId].schemaOfEnemyShips.find(ship =>
                    ship.every((shipCell: IShipCell) => shipCell.status === "shotted"));
                
                if (killedShip) {
                    resStatus = "killed";
                    killedShip.forEach(shipCell => shipCell.status = "isKilled");
                }  
            }     
        }

        if (resStatus && resStatus !== "killed") {
            const attackFeedbackData: IAttackFeedbackData = {
                position: { x, y },
                currentPlayer: attackingPlayerId,
                status: resStatus,
            }
            const res = {
                type: EResType.ATTACK,
                data: JSON.stringify(attackFeedbackData),
                id: 0,
            }
            sendToRoomClients(connections, res);
        } else if (resStatus === "killed") {
            shottedShip?.forEach((shipCell: IShipCell) => {
                const attackFeedbackData: IAttackFeedbackData = {
                    position: shipCell.position,
                    currentPlayer: attackingPlayerId,
                    status: "killed",
                }
                const res = {
                    type: EResType.ATTACK,
                    data: JSON.stringify(attackFeedbackData),
                    id: 0,
                }
                sendToRoomClients(connections, res);

                for (const index in connections) {
                    const socket: WebSocket = connections[index].socket;
                    sendDataToAdjiacentCell(socket, shipCell.position, shottedShip, attackingPlayerId);
                }
            })
        }

        changeTurn(connections, resStatus, attackingPlayerId, enemyPlayerId);
        
        const allShipsKilled = connections[attackingPlayerId].schemaOfEnemyShips.every((ship: TEnemyShip) =>
            ship.every(shipCell => shipCell.status === "isKilled"));
        if (allShipsKilled) {
            finishGame(connections, attackingPlayerId, enemyPlayerId);
        }
    }
}