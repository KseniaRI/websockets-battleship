import { IAddShipsData } from "../../models/shipsModels.js"
import { startGame } from "./startGame.js";
import { setTurn } from "../game/setTurn.js";
import { TConnections } from "../../models/roomModels.js";

export const addShips = (clientsShipsData: IAddShipsData[], connections: TConnections) => {
    if (clientsShipsData.length === 2) {
        startGame(connections, clientsShipsData); 
        const clientsIndexes = clientsShipsData.map(data => data.indexPlayer);
        setTurn(connections, clientsIndexes);
    }
}