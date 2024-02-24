import { IShipsData } from "../../models/shipsModels.js"
import { TConnections } from "../../models/connections.js";
import { setTurn } from "../index.js";
import { startGame } from "./startGame.js";

export const addShips = (connections: TConnections) => {
    const shipsOfAllPlayersAdded = Object.values(connections)
        .map(connection => connection.ships)
        .every((ships: IShipsData[]) => ships.length > 0);
    if (shipsOfAllPlayersAdded) {
        startGame(connections); 
        setTurn(connections, Object.keys(connections)[0]);
    }
}