import { createSchemaOfEnemyShips } from "./createScemaOfEnemyShips.js";
import { getAttackedCoordinates } from './getAttackedCoordinates.js';
import { generateIdx } from "./generateIdx.js";
import { handleTerminationSignals } from "./handleTerminationSignals.js";
import { sendToAllClients, sendToClient, sendToRoomClients, sendDataToAdjiacentCell } from "./sendData.js";
import { updateWinnersData } from "./updateWinnersData.js";
import { changeTurn } from "./changeTurn.js";

export {
    createSchemaOfEnemyShips,
    getAttackedCoordinates,
    generateIdx,
    handleTerminationSignals,
    sendDataToAdjiacentCell,
    sendToAllClients,
    sendToClient,
    sendToRoomClients,
    updateWinnersData,
    changeTurn
}