import { IPosition, IShipCell, IShipsData, TSchemaOfEnemyShips, TEnemyShip } from "../../models/shipsModels.js";

export const createSchemaOfShottedEnemyShips = (ships: IShipsData[]): TSchemaOfEnemyShips => {
    return ships.map((ship: IShipsData) => {
        if (ship.length === 1) {
            const uniqueCell: IShipCell = {
                status: "alive",
                position: ship.position
            };
            return [uniqueCell];
        } else {
            let shipCells: TEnemyShip = [];
            const firstCell = {
                status: "alive",
                position: ship.position
            }
            shipCells.push(firstCell);
    
            if (!ship.direction) {
                for (let i = 1; i < ship.length; i++) {
                    const nextX = ship.position.x + i;
                    const nextY = ship.position.y;
                    const nextPosition: IPosition = { x: nextX, y: nextY };
                    shipCells.push({
                        status: "alive",
                        position: nextPosition
                    });
                }
            } else {
                for (let i = 1; i < ship.length; i++) {
                    const nextX = ship.position.x;
                    const nextY = ship.position.y + i;
                    const nextPosition: IPosition = { x: nextX, y: nextY }
                    shipCells.push({
                        status: "alive",
                        position: nextPosition
                    });
                }
            }
            return shipCells;
        }
    });
}