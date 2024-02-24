import { WebSocket } from "ws";
import { IAttackFeedbackData, IAttackStatus, IFinishData, IRandomAttackData, IReqAttackData } from "../../models/gameModels.js";
import { IShipCell, TSchemaOfEnemyShips, TEnemyShip, IShipsData } from "../../models/shipsModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { TConnections } from "../../models/connections.js";
import { setTurn } from "./setTurn.js";
import {
    getAttackedCoordinates,
    createSchemaOfShottedEnemyShips,
    sendToRoomClients,
    sendDataToAdjiacentCell, 
    updateWinnersData,
} from '../../helpers/index.js'

export const sendAttackFeedback = (connections: TConnections, attackData: IReqAttackData | IRandomAttackData) => {
    const { indexPlayer: attackingPlayerId } = attackData;
    const { x, y } = getAttackedCoordinates(attackData);
    
    const enemyPlayerId = Object.keys(connections).find(key => key !== attackingPlayerId)!;
    const enemyShips: IShipsData[] = connections[enemyPlayerId].ships;

    let schemaOfEnemyShips = connections[attackingPlayerId].schemaOfEnemyShips;

    if (schemaOfEnemyShips.length === 0) {
        connections[attackingPlayerId].schemaOfEnemyShips = [...createSchemaOfShottedEnemyShips(enemyShips)]; 
        schemaOfEnemyShips = connections[attackingPlayerId].schemaOfEnemyShips;
    } else {
        
    let status: IAttackStatus | undefined;
    
    const shottedShip: TEnemyShip | undefined = schemaOfEnemyShips.find((ship: TEnemyShip) =>
        ship.find((shipCell: IShipCell) => shipCell.position.x === x && shipCell.position.y === y)
    )        
    
    if (!shottedShip) {
        status = "miss";
    } else {
        const shottedShipWithAlreadyShottedCell = shottedShip.find(shipCell => {
            const alreadyShotted = shipCell.status === "shotted";
            return shipCell.position.x === x && shipCell.position.y === y && alreadyShotted
        });
        const shottedShipAlreadyKilled = shottedShip.every(shipCell => shipCell.status === "isKilled");
        if (shottedShipWithAlreadyShottedCell) {
            status = "shot";
        } else if (shottedShipAlreadyKilled){
            status = "killed";
        } else {
            status = shottedShip.length === 1 ? "killed" : "shot";
            const indexOfShottedShip = schemaOfEnemyShips.indexOf(shottedShip);
            let shottedCell: IShipCell | undefined = shottedShip.find((shipCell: IShipCell) =>
                shipCell.position.x === x && shipCell.position.y === y);
            if (shottedCell) {
                shottedCell.status = "shotted"; 

                const updatedShottedShip = shottedShip.map((shipCell: IShipCell) => {
                    if (shipCell.position.x === x && shipCell.position.y === y) {
                        return shottedCell as IShipCell;
                    }
                    return shipCell;
                });
                schemaOfEnemyShips[indexOfShottedShip] = updatedShottedShip;
                const killedShip: TEnemyShip | undefined = schemaOfEnemyShips.find(ship => ship.every(shipCell => shipCell.status === "shotted" ));

                if (killedShip) {
                    status = "killed";
                    connections[enemyPlayerId].numberOfShips = connections[enemyPlayerId].numberOfShips - 1;
                    const indexOfKilledShip = schemaOfEnemyShips.indexOf(killedShip);
                    const updatedKilledShip: TEnemyShip = killedShip.map((shipCell: IShipCell) => {
                        return {
                            ...shipCell,
                            status: "isKilled"
                        }
                    });
                    schemaOfEnemyShips[indexOfKilledShip] = updatedKilledShip;
                    }
                }
        }     
    }
    if (status && status !== "killed") {
        const attackFeedbackData: IAttackFeedbackData = {
            position: { x, y },
            currentPlayer: attackingPlayerId,
            status,
        }
        const res = {
            type: EResType.ATTACK,
            data: JSON.stringify(attackFeedbackData),
            id: 0,
        }
        sendToRoomClients(connections, res);
    } else if (status === "killed") {
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

    if (status === "killed" || status === "shot") {
        setTurn(connections, attackingPlayerId);
    } else if (status === "miss") {
        schemaOfEnemyShips = [];
        setTurn(connections, enemyPlayerId);
    }

    if (connections[enemyPlayerId].numberOfShips === 0) {
        const finishData: IFinishData = {
            winPlayer: attackingPlayerId
        }
        schemaOfEnemyShips = [];
        connections[attackingPlayerId].schemaOfEnemyShips = [];
        connections[enemyPlayerId].schemaOfEnemyShips = [];
        
        const res = {
            type: EResType.FINISH,
            data: JSON.stringify(finishData),
            id: 0,
        }
        sendToRoomClients(connections, res);
        updateWinnersData(attackingPlayerId, connections)
        }
    }
}