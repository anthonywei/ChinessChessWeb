import { Board } from "./class_Board.js";
export class BoardBot extends Board {
    constructor(startPositions, prevMove) {
        super(startPositions);
        this.nextBoards = [];
        this.prevMove = prevMove;
    }
    makeTree(untilTurnX, possibleMoves) {
    }
    opponentMakeMove(move) {
        return {
            oldPosition: { x: 0, y: 0 },
            newPosition: { x: 0, y: 0 }
        };
    }
}
