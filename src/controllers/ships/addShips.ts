import { IShipsData } from "../../models/shipsModels.js"
import { TConnections } from "../../models/connections.js";
import { setTurn } from "../index.js";
import { startGame } from "./startGame.js";
import { createSchemaOfEnemyShips } from "../../helpers/createScemaOfEnemyShips.js";

export const addShips = (connections: TConnections) => {
    const shipsOfAllPlayersAdded = Object.values(connections)
        .map(connection => connection.ships)
        .every((ships: IShipsData[]) => ships.length > 0);

    Object.keys(connections).forEach(playerId => {
        const enemyData = Object.values(connections).find(connection => connection.id !== playerId);
        if (enemyData) {
            connections[playerId].schemaOfEnemyShips = createSchemaOfEnemyShips(enemyData.ships);
        }
    })
    
    if (shipsOfAllPlayersAdded) {
        startGame(connections); 
        setTurn(connections, Object.keys(connections)[0]);
    }
}