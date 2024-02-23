import { WebSocket } from "ws";
import { wsServer } from "../ws_server/index.js";
import { EResType } from "../models/reqAndResModels.js";
import { IPosition, TEnemyShip } from "../models/shipsModels.js";
import { IAttackFeedbackData } from "../models/gameModels.js";
import { TConnections } from "../models/roomModels.js";

export const sendToAllClients = (message: any) => {
    wsServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            sendToClient(client, message);
        }
    });
};

export const sendToClient = (client: WebSocket, message: any) => {
    client.send(JSON.stringify(message));
};

export const sendToRoomClients = (connections: TConnections, res: any) => {
    for (const index in connections) {
        const socket: WebSocket = connections[index];
        sendToClient(socket, res);
    }
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

                const res = {
                    type: EResType.ATTACK,
                    data: JSON.stringify(missFeedbackData),
                    id: 0,
                }
                sendToClient(socket, res);   
            }
        }
    }
}