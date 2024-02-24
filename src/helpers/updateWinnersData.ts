import { updateWinners } from "../controllers/index.js";
import { TConnections } from "../models/connections.js";
import { IWinnerData } from "../models/winnerModels.js";

export const updateWinnersData = (winnerId: string, connections: TConnections) => {
    connections[winnerId].wins = connections[winnerId].wins + 1;
    const winnersData: IWinnerData[] = Object.values(connections).map(connection => { 
        return {
            name: connection.name,
            wins: connection.wins
        }
    })          
    updateWinners(winnersData);
    for (const key in connections) {
        connections[key].ships = []
    }       
}