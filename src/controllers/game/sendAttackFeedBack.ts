import { WebSocket } from "ws";
import { IAttackFeedback, IAttackFeedbackData, IAttackStatus, IReqAttackData } from "../../models/gameModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { TConnections } from "../../models/roomModels.js";
import { sendToClient } from "../../ws_server/index.js";
import { IAddShipsData, IShipCell, TSchemaOfEnemyShips, TEnemyShip } from "../../models/shipsModels.js";
import { createSchemaOfShottedEnemyShips } from "./createScemaofShottedEnemyShips.js";

let schemaOfEnemyShips: TSchemaOfEnemyShips;

export const sendAttackFeedback = (connections: TConnections, attacksData: IReqAttackData[], clientsShipsData: IAddShipsData[]) => {
    attacksData.forEach(({ indexPlayer, x, y }) => {
        const socket: WebSocket = connections[indexPlayer];
        const enemyShipsData: IAddShipsData = clientsShipsData.find(shipsData => shipsData.indexPlayer !== indexPlayer)!;
        if (!schemaOfEnemyShips) {
            schemaOfEnemyShips = createSchemaOfShottedEnemyShips(enemyShipsData.ships);
        }

        let status: IAttackStatus | undefined;
        
        const shottedShip: TEnemyShip | undefined = schemaOfEnemyShips.find((ship: TEnemyShip) => ship.find((shipCell: IShipCell) =>
            shipCell.position.x === x && shipCell.position.y === y));
        
        if (!shottedShip) {
            status = "miss";
        } else {
            status = shottedShip.length === 1 ? "killed" : "shot";
            const indexOfShottedShip = schemaOfEnemyShips.indexOf(shottedShip);

            let shottedCell: IShipCell | undefined = shottedShip.find((shipCell: IShipCell) => shipCell.position.x === x && shipCell.position.y === y);

            if (shottedCell) {
                shottedCell.status = "shotted"; 
                
                const updatedShottedShip = shottedShip.map((shipCell: IShipCell) => {
                    if (shipCell.position.x === x && shipCell.position.y === y) {
                        return shottedCell as IShipCell;
                    }
                    return shipCell;
                });
                schemaOfEnemyShips[indexOfShottedShip] = updatedShottedShip;

                console.log(schemaOfEnemyShips)

                const shipIsKilled = schemaOfEnemyShips.find(ship => ship.every(shipCell => shipCell.status === "shotted"));
                if (shipIsKilled) {
                    status = "killed";
                }
            }     
        }
        console.log(status);
        if (status) {
            const attackFeedbackData: IAttackFeedbackData = {
                position: { x, y },
                currentPlayer: indexPlayer, 
                status,
            }
            const res: IAttackFeedback = {
                type: EResType.ATTACK,
                data: JSON.stringify(attackFeedbackData),
                id: 0,
            }
            sendToClient(socket, res);
        }  
    }) 
}