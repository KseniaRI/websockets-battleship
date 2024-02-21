import { WebSocket } from "ws";
import { TConnections } from "../../models/roomModels.js";
import { IAddShipsData, IStartGame, IStartGameData } from "../../models/shipsModels.js";
import { EResType } from "../../models/reqAndResModels.js";
import { sendToClient } from "../../ws_server/index.js";

export const startGame = (connections: TConnections, clientsShipsData: IAddShipsData[]) => {
    clientsShipsData.forEach(({ships, indexPlayer}) => {
        const socket: WebSocket = connections[indexPlayer];
        const startGameData: IStartGameData = {
            ships: [...ships],
            currentPlayerIndex: indexPlayer, 
        }
        const res: IStartGame = {
            type: EResType.START_GAME,
            data: JSON.stringify(startGameData),
            id: 0,
        };
        sendToClient(socket, res);
    })       
}