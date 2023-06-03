import { Board } from "./class_Board.js"
import { allMoves } from "./common.js"
import type { Move } from "./class_Board.js";
import { Piece } from "./class_Piece.js";

export class Bot {
    public board: BoardBot;
    public searchDepth: number;
    public botIsRed: boolean;

    /**
     *
     */
    constructor(searchDepth: number, botIsRed: boolean, startPositions: ((object | null)[][] | null)) {
        this.board = new BoardBot(startPositions, null, null);
        this.searchDepth = searchDepth;
        this.botIsRed = botIsRed;

    }

    opponentMakeMove(move: Move): Move {
        this.board = this.board.movePiece(move).board;
        this.board.makeTree(this.board.turn + this.searchDepth);

        let botMove: Move;
        if (this.botIsRed) botMove = this._maxValue(this.board).move;
        else botMove = this._minValue(this.board).move;
        
        

        return botMove
    }

    _maxValue(nextBoard: BoardBot): { point: number, move: Move } {
        if (nextBoard.turn - this.board.turn >= this.searchDepth) {
            if (nextBoard.prevMove) return { point: nextBoard.getPoint(), move: nextBoard.prevMove }
            else throw new Error("This board `" + nextBoard + "` is broken");
        } else {
            let nextnextBoards = nextBoard.nextBoards;
            let point = -100_000;
            let move: Move | undefined;
            if (nextnextBoards.length <= 0) throw new Error("Tree is not built here")
            for (let i = 0; i < nextnextBoards.length; i++) {
                let minValue = this._minValue(nextnextBoards[i]);
                if (point < minValue.point) {
                    point = minValue.point;
                    move = nextnextBoards[i].prevMove;
                }
            }
            if (move) return { point: point, move: move }
            else throw new Error("This board `" + nextBoard + "` is broken");
        }
    }

    _minValue(nextBoard: BoardBot): { point: number, move: Move } {
        if (nextBoard.turn - this.board.turn >= this.searchDepth) {
            if (nextBoard.prevMove) return { point: nextBoard.getPoint(), move: nextBoard.prevMove }
            else throw new Error("This board `" + nextBoard + "` is broken");
        } else {
            let nextnextBoards = nextBoard.nextBoards;
            let point = 100_000;
            let move: Move | undefined;
            if (nextnextBoards.length <= 0) throw new Error("Tree is not built here")
            for (let i = 0; i < nextnextBoards.length; i++) {
                let maxValue = this._maxValue(nextnextBoards[i]);
                if (point > maxValue.point) {
                    point = maxValue.point;
                    move = nextnextBoards[i].prevMove;
                }
            }
            if (move) return { point: point, move: move }
            else throw new Error("This board `" + nextBoard + "` is broken");

        }
    }
}

class BoardBot extends Board {
    public nextBoards: BoardBot[] = [];
    public prevMove?: Move
    public prevCaptured?: Piece;

    /**
     *
     */
    constructor(startPositions: ((object | null)[][] | null), prevMove: null | Move | undefined, prevCaptured: Piece | null | undefined) {
        super(startPositions);
        if (prevMove) this.prevMove = prevMove;
        if (prevCaptured) this.prevCaptured = prevCaptured
    }

    makeTree(untilTurnX: number): void {
        if (this.turn >= untilTurnX) return;
        let moves = allMoves(this);
        
        moves.forEach((move) => {
            let { captured: c, board: b } = this.movePiece(move);

            this.nextBoards.push(b);


        });

    }

    movePiece(move: Move): { captured: Piece | null | undefined, board: BoardBot } {
        for (let i = 0; i < this.nextBoards.length; i++) {
            if (this.nextBoards[i].prevMove === move) {
                return { captured: this.nextBoards[i].prevCaptured, board: this.nextBoards[i] }
            }
        }

        // if not found this moves-> 
        let b = new BoardBot(this.piecesPositionOnBoard, this.prevMove, this.prevCaptured);
        return b._movePiece(move);

    }
}