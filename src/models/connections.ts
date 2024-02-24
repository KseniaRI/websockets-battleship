import { WebSocket } from "ws"
import { IShipsData, TSchemaOfEnemyShips } from "./shipsModels.js"

export type TConnections = {
    [key: string]: {
        socket: WebSocket,
        name: string,
        id: string,
        ships: IShipsData[],
        wins: number,
        schemaOfEnemyShips: TSchemaOfEnemyShips 
    }
}

