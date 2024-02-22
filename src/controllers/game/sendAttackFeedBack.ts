import { WebSocket } from "ws";
import { IAttackFeedback, IAttackFeedbackData, IAttackStatus, IReqAttackData } from "../../models/gameModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { TConnections } from "../../models/roomModels.js";
import { sendToClient } from "../../ws_server/index.js";
import { IAddShipsData, IShipCell, TSchemaOfEnemyShips, TEnemyShip } from "../../models/shipsModels.js";
import { createSchemaOfShottedEnemyShips } from "./createScemaofShottedEnemyShips.js";

let schemaOfEnemyShips: TSchemaOfEnemyShips;

export const sendAttackFeedback = (connections: TConnections, attackData: IReqAttackData, clientsShipsData: IAddShipsData[]) => {
    const { indexPlayer: attackingPlayer, x, y } = attackData;
    clientsShipsData.forEach(({ indexPlayer }) => {
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
                    console.log(schemaOfEnemyShips)
                }
            }     
        }
        
        console.log(status);

        if (status && status !== "killed") {
            const attackFeedbackData: IAttackFeedbackData = {
                position: { x, y },
                currentPlayer: attackingPlayer,
                status,
            }
            const res: IAttackFeedback = {
                type: EResType.ATTACK,
                data: JSON.stringify(attackFeedbackData),
                id: 0,
            }
            sendToClient(socket, res);
        } else if (status === "killed") {
            shottedShip?.forEach((shipCell: IShipCell) => {
                const attackFeedbackData: IAttackFeedbackData = {
                    position: shipCell.position,
                    currentPlayer: attackingPlayer,
                    status: "killed",
                }
                const res: IAttackFeedback = {
                    type: EResType.ATTACK,
                    data: JSON.stringify(attackFeedbackData),
                    id: 0,
                }
                sendToClient(socket, res);

                const { x, y } = shipCell.position;

                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        const adjacentCell = { x: x + dx, y: y + dy };
                        if (!shottedShip.some(cell => cell.position.x === adjacentCell.x && cell.position.y === adjacentCell.y)) {
                            const missFeedbackData: IAttackFeedbackData = {
                                position: adjacentCell,
                                currentPlayer: attackingPlayer,
                                status: "miss",
                            };
                            const missRes: IAttackFeedback = {
                                type: EResType.ATTACK,
                                data: JSON.stringify(missFeedbackData),
                                id: 0,
                            };
                            sendToClient(socket, missRes);
                        }
                    }
                }
            })
        }
    }) 
}