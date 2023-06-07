import { Board, Move } from "./class_Board";
import { Bot } from "./class_Bot.js"


export function allMoves(b: Board): Move[] {
    let x: Move[] = [];
    return x;
}

let b = new Bot(1, false, null);

b.opponentMakeMove({oldPosition: {x: 0, y: 0}, newPosition: {x: 0, y: 1}})

console.dir(b.board.piecesPositionOnBoard);
