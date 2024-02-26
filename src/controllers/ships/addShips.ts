import { IShipsData } from "../../models/shipsModels.js"
import { TConnections } from "../../models/connections.js";
import { setTurn } from "../index.js";
import { startGame } from "./startGame.js";
import { createSchemaOfEnemyShips } from "../../helpers/createScemaOfEnemyShips.js";

export const addShips = (roomConnections: TConnections) => {

    const shipsOfAllPlayersAdded = Object.values(roomConnections)
        .map(connection => connection.ships)
        .every((ships: IShipsData[]) => ships.length > 0);

    Object.keys(roomConnections).forEach(playerId => {
        const enemyData = Object.values(roomConnections).find(connection => connection.id !== playerId);
        if (enemyData) {
            roomConnections[playerId].schemaOfEnemyShips = createSchemaOfEnemyShips(enemyData.ships);
        }
    })
    
    if (shipsOfAllPlayersAdded) {
        startGame(roomConnections); 
        setTurn(roomConnections, Object.keys(roomConnections)[0]);
    }
}