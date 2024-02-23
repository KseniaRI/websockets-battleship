import { updateWinners } from "../controllers/player/updateWinners.js";
import { ILoginResData } from "../models/loginModels.js";
import { IPlayerDashboardData, IWinnerData } from "../models/winnerModels.js";

const winnersDashboard: IPlayerDashboardData[] = [];

export const updateWinnersDashboard = (winnerId: string, loginPlayersData: ILoginResData[]) => {
    const player: IPlayerDashboardData | undefined = winnersDashboard.find(pl => pl.id === winnerId);
    if (!player) {
        const winnerName = loginPlayersData.find(pl => pl.index === winnerId)?.name;
        if (winnerName) {
            winnersDashboard.push({
                name: winnerName,
                id: winnerId,
                wins: 1
            })
        }   
    } else {
        const indexOfWinner = winnersDashboard.indexOf(player);
        winnersDashboard[indexOfWinner] = {
            name: player.name,
            id: player.id,
            wins: player.wins + 1
        }    
    }
    const winnersData: IWinnerData[] = winnersDashboard.map(pl => {
        return { wins: pl.wins, name: pl.name }
    })
    updateWinners(winnersData);
}