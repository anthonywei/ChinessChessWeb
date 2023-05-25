class Player {
    constructor(board, isRedPlayer) {
        this.board = board;
        this.isRedPlayer = isRedPlayer;
    }

    makeMove(position1, position2) {
        // Todo: more 
        if (this.isRedPlayer = this.board.redToPlay) {
            this.board.movePiece(position1, position2);
        }    
    }
}

import {Board} from "./class_Board.mjs"
