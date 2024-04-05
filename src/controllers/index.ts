import { addShips, startGame } from './ships/index.js';
import { addUserToRoom, createGame, createRoom, updateRoom } from './room/index.js';
import { attack, sendAttackFeedback, setTurn } from './game/index.js';
import { loginAndCreatePlayer, updateWinners } from './player/index.js';

export {
    addShips,
    startGame,
    addUserToRoom,
    createGame,
    createRoom,
    updateRoom,
    attack,
    sendAttackFeedback,
    setTurn,
    loginAndCreatePlayer,
    updateWinners
}