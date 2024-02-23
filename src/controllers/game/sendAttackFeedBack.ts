import { WebSocket } from "ws";
import { IAttackFeedbackData, IAttackStatus, IRandomAttackData, IReqAttackData } from "../../models/gameModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { TConnections } from "../../models/roomModels.js";
import { sendToClient } from "../../ws_server/index.js";
import { IAddShipsData, IShipCell, TSchemaOfEnemyShips, TEnemyShip } from "../../models/shipsModels.js";
import { createSchemaOfShottedEnemyShips } from "./createScemaofShottedEnemyShips.js";
import { sendData, sendDataToAdjiacentCell } from "../../helpers/sendData.js";
import { setTurn } from "./setTurn.js";
import { getAttachedCoordinates } from "../../helpers/generateCoord.js";

let schemaOfEnemyShips: TSchemaOfEnemyShips | undefined;

export const sendAttackFeedback = (connections: TConnections, attackData: IReqAttackData | IRandomAttackData, clientsShipsData: IAddShipsData[]) => {
    const { indexPlayer: attackingPlayer } = attackData;
    const { x, y } = getAttachedCoordinates(attackData); 

    const enemyShipsData: IAddShipsData = clientsShipsData.find(shipsData =>
        shipsData.indexPlayer !== attackingPlayer)!;
    if (!schemaOfEnemyShips) {
        schemaOfEnemyShips = createSchemaOfShottedEnemyShips(enemyShipsData.ships);
    }
    let status: IAttackStatus | undefined;
    
    const shottedShip: TEnemyShip | undefined = schemaOfEnemyShips.find((ship: TEnemyShip) =>
        ship.find((shipCell: IShipCell) =>
        shipCell.position.x === x && shipCell.position.y === y));
    
    if (!shottedShip) {
        status = "miss";
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
    if (status && status !== "killed") {
        const attackFeedbackData: IAttackFeedbackData = {
            position: { x, y },
            currentPlayer: attackingPlayer,
            status,
        }
        for (const index in connections) {
            const socket: WebSocket = connections[index];
            sendData(socket, EResType.ATTACK, attackFeedbackData, sendToClient);
        }
    } else if (status === "killed") {
        shottedShip?.forEach((shipCell: IShipCell) => {
            const attackFeedbackData: IAttackFeedbackData = {
                position: shipCell.position,
                currentPlayer: attackingPlayer,
                status: "killed",
            }
            for (const index in connections) {
                const socket: WebSocket = connections[index];
                sendData(socket, EResType.ATTACK, attackFeedbackData, sendToClient);
                sendDataToAdjiacentCell(socket, shipCell.position, shottedShip, attackingPlayer);
            }
        })
    }

    if (status === "killed" || status === "shot") {
        setTurn(connections, attackingPlayer);
    } else if (status === "miss") {
        schemaOfEnemyShips = undefined;
        setTurn(connections, enemyShipsData.indexPlayer);
    }
}