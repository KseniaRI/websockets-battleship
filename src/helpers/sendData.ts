import { WebSocket } from "ws";
import { EResType } from "../models/reqAndResModels.js";
import { IPosition, TEnemyShip } from "../models/shipsModels.js";
import { IAttackFeedbackData } from "../models/gameModels.js";
import { sendToClient } from "../ws_server/index.js";

export const sendData = (socket: WebSocket, resType: EResType, dataToSend: any, callback: any) => {
    const res = {
        type: resType,
        data: JSON.stringify(dataToSend),
        id: 0,
    }
    callback(socket, res);
}

export const sendDataToAdjiacentCell = (socket: WebSocket, shipCellPosition: IPosition, shottedShip: TEnemyShip, attackingPlayer: string ) => {
    const { x, y } = shipCellPosition;

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            const adjacentCell = { x: x + dx, y: y + dy };
            const isPositiveCoord = adjacentCell.x >= 0 && adjacentCell.y >= 0;
            const isNotCellsOfShip = !shottedShip.some(cell => cell.position.x === adjacentCell.x && cell.position.y === adjacentCell.y);
            
            if (isNotCellsOfShip && isPositiveCoord) {
                const missFeedbackData: IAttackFeedbackData = {
                    position: adjacentCell,
                    currentPlayer: attackingPlayer,
                    status: "miss",
                };
                sendData(socket, EResType.ATTACK, missFeedbackData, sendToClient);
            }
        }
    }
}