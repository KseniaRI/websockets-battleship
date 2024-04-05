# Battleship with websockets

> By default WebSocket client tries to connect to the 3000 port.

## Installation
1. Clone/download repo
2. `npm install`

`npm run start:dev` | App served @ `http://localhost:8181`

------

## The rules of the game

1. Player can create game room or connect to the game room after login
2. Player room data (players, game board, ships positions) storages in the server
3. Game starts after 2 players are connected to the room and sent ships positions to the server
4. Server sends move order
5. Players should shoot in their's turn
6. Server send back shot result
7. If player hits or kills the ship, player should make one more shoot
8. Player wins if he have killed all enemies ships

