import { IRandomAttackData, IReqAttackData } from "../models/gameModels.js";

export const generateRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateRandomCoordinates = () =>  {
  var x = generateRandomInt(0, 9); 
  var y = generateRandomInt(0, 9); 
  return { x, y };
}

export const getAttachedCoordinates = (attackData: IReqAttackData | IRandomAttackData) => {
    let x: number;
    let y: number;
    
    if ('x' in attackData && 'y' in attackData) { 
        x = attackData.x;
        y = attackData.y
    } else {
        const randomCoords = generateRandomCoordinates();
        x = randomCoords.x;
        y = randomCoords.y
    }
    return { x, y };
}