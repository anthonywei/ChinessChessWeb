import { Board } from "./class_Board.js"
import type { Move } from "./class_Board.js";

export class BoardBot extends Board {
    public nextBoards: BoardBot[] = [];
    public prevMove: null | Move

    /**
     *
     */
    constructor(startPositions: ((object | null)[][] | null), prevMove: null | Move) {
        super(startPositions);
        this.prevMove = prevMove;
    }

    makeTree(untilTurnX: number, possibleMoves: Move[]): void {
        // Todo: make tree 
    }

    opponentMakeMove(move: Move): Move {
        // Todo : ai things 
        return {
            oldPosition: { x: 0, y: 0 },
            newPosition: { x: 0, y: 0 }
        }
    }
}