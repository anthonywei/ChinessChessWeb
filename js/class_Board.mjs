import { Xe, Ma, Vua, Si, Tuong, Phao, Tot, Piece } from "./class_Piece.mjs"


const defaultPosition = [
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
export class Board {
    constructor(startPositions) {
        this.redToPlay = true;
        this.onBoardPieces = [];

        startPositions = startPositions || defaultPosition;
        // 2D of pieces
        this.piecesPositionOnBoard = [];
        for (var i = 0; i < startPositions.length; i++) {
            // create current column and put to 2D array
            let colPieces = [];
            this.piecesPositionOnBoard.push(colPieces);
            for (var j = 0; j < startPositions[i].length; j++) {
                // check if null
                if (!startPositions[i][j]) {
                    colPieces.push(null)
                    continue;
                };
                // get identifier
                const pieceChar = startPositions[i][j].toString().charAt(0);
                var thisPiece = new Piece();
                switch (pieceChar) {
                    case "C":
                        var thisPiece = new Xe(true, [i, j]);
                        break;
                    case "M":
                        var thisPiece = new Ma(true, [i, j]);
                        break;
                    case "X":
                        var thisPiece = new Vua(true, [i, j]);
                        break;
                    case "S":
                        var thisPiece = new Si(true, [i, j]);
                        break;
                    case "J":
                        var thisPiece = new Tuong(true, [i, j]);
                        break;
                    case "P":
                        var thisPiece = new Phao(true, [i, j]);
                        break;
                    case "Z":
                        var thisPiece = new Tot(true, [i, j]);
                        break;
                    case "c":
                        var thisPiece = new Xe(false, [i, j]);
                        break;
                    case "m":
                        var thisPiece = new Ma(false, [i, j]);
                        break;
                    case "x":
                        var thisPiece = new Vua(false, [i, j]);
                        break;
                    case "s":
                        var thisPiece = new Si(false, [i, j]);
                        break;
                    case "j":
                        var thisPiece = new Tuong(false, [i, j]);
                        break;
                    case "p":
                        var thisPiece = new Phao(false, [i, j]);
                        break;
                    case "z":
                        var thisPiece = new Tot(false, [i, j]);
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

class Background {
    constructor(context2d) {
        this.context2d = context2d
        this.x = 0;
        this.y = 0;
        this.img = new Image();
        this.img.src = "/img/stype_1/bg.png";
    }

    show() {
        this.context2d.drawImage(this.img, 35 * this.x, 36 * this.y);
    }
}

class Pane {
    constructor(context2d) {
        this.context2d = context2d;
        this.x = 0;
        this.y = 0;
        this.newX = 0;
        this.newY = 0;
        this.img = new Image();
        this.img.src = "/img/stype_1/r_box.png";
        this.isShow = false;
    }

    show() {
        if (this.isShow) {
            this.context2d.drawImage(this.img, 35 * this.x + 5, 36 * this.y + 19)
            this.context2d.drawImage(this.img, 35 * this.newX + 5, 36 * this.newY + 19)
        }
    }
}

class Dot {
    constructor(context2d) {
        this.context2d = context2d;
        this.x = 0;
        this.y = 0;
        this.img = new Image();
        this.img.src = "/img/stype_1/dot.png"
        this.dots = [];
    }

    show() {
        for (let i = 0; i < this.dots.length; i++) {
            this.context2d.drawImage(this.img, 35 * this.x + 5, 36 * this.y + 19)

        }
    }
}

export class BoardGUI extends Board {
    constructor(startPositions, context2d) {
        super(startPositions);
        this.context2d = context2d;
        this.bg = this.bg || new Background(context2d);
        this.pane = this.pane || new Pane(context2d);
        this.dot = this.dot || new Dot(context2d);
    }

    show() {
        this.context2d.clearRect(0, 0, 325, 402);
        this.bg.show();
        this.pane.show();
        this.dot.show();
        for (let i = 0; i < this.onBoardPieces.length; i++) {
            this.onBoardPieces[i].show(this.context2d);
        }

    }
}