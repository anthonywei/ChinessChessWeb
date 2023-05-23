import {Xe, Ma, Vua, Si, Tuong, Phao, Tot} from "./class_Piece.js"


Board.defaultPosition = [
    ["C1", null, null, "Z4", null, null, "z4", null, null, "c1",],
    ["M1", null, "P1", null, null, null, null, "p1", null, "m1",],
    ["X1", null, null, "Z3", null, null, "z3", null, null, "x1",],
    ["S1", null, null, null, null, null, null, null, null, "s1",],
    ["J0", null, null, "Z2", null, null, "z2", null, null, "j0",],
    ["S0", null, null, null, null, null, null, null, null, "s0",],
    ["X0", null, null, "Z1", null, null, "z1", null, null, "x0",],
    ["M0", null, "P0", null, null, null, null, "p0", null, "m0",],
    ["C0", null, null, "Z0", null, null, "z0", null, null, "c0",]
];
class Board {
    constructor(startPositions) {
        this.redToPlay = true;
        this.onBoardPieces = [];

        startPositions = startPositions || Board.defaultPosition;
        // 2D of pieces
        this.piecesPositionOnBoard = [];
        for (var i = 0; i < startPositions.length; i++) {
            // create current column and put to 2D array
            let colPieces = [];
            this.piecesPositionOnBoard.push(colPieces);
            for (var j = 0; j < startPositions[i].length; j++) {
                // check if null
                if (! startPositions[i][j]) {
                    colPieces.push(null)
                    continue;
                };
                // get identifier
                const pieceChar = startPositions[i][j].toString().charAt(0);
                switch (pieceChar) {
                    case "C":
                        thisPiece = new Xe(true, [i, j]);
                        break;
                    case "M":
                        thisPiece = new Ma(true, [i, j]);
                        break;
                    case "X":
                        thisPiece = new Vua(true, [i, j]);
                        break;
                    case "S":
                        thisPiece = new Si(true, [i, j]);
                        break;
                    case "J":
                        thisPiece = new Tuong(true, [i, j]);
                        break;
                    case "P":
                        thisPiece = new Phao(true, [i, j]);
                        break;
                    case "Z":
                        thisPiece = new Tot(true, [i, j]);
                        break;
                    case "c":
                        thisPiece = new Xe(false, [i, j]);
                        break;
                    case "m":
                        thisPiece = new Ma(false, [i, j]);
                        break;
                    case "x":
                        thisPiece = new Vua(false, [i, j]);
                        break;
                    case "s":
                        thisPiece = new Si(false, [i, j]);
                        break;
                    case "j":
                        thisPiece = new Tuong(false, [i, j]);
                        break;
                    case "p":
                        thisPiece = new Phao(false, [i, j]);
                        break;
                    case "z":
                        thisPiece = new Tot(false, [i, j]);
                        break;
                    default:
                        throw new Error("This piece is not available");
                }
                colPieces.push(thisPiece);
                this.onBoardPieces.push(thisPiece);
            }
        }
    }
}