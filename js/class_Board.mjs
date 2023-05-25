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
        this.turn = 0;

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
                        var thisPiece = new Xe(true, { x: i, y: j });
                        break;
                    case "M":
                        var thisPiece = new Ma(true, { x: i, y: j });
                        break;
                    case "X":
                        var thisPiece = new Vua(true, { x: i, y: j });
                        break;
                    case "S":
                        var thisPiece = new Si(true, { x: i, y: j });
                        break;
                    case "J":
                        var thisPiece = new Tuong(true, { x: i, y: j });
                        break;
                    case "P":
                        var thisPiece = new Phao(true, { x: i, y: j });
                        break;
                    case "Z":
                        var thisPiece = new Tot(true, { x: i, y: j });
                        break;
                    case "c":
                        var thisPiece = new Xe(false, { x: i, y: j });
                        break;
                    case "m":
                        var thisPiece = new Ma(false, { x: i, y: j });
                        break;
                    case "x":
                        var thisPiece = new Vua(false, { x: i, y: j });
                        break;
                    case "s":
                        var thisPiece = new Si(false, { x: i, y: j });
                        break;
                    case "j":
                        var thisPiece = new Tuong(false, { x: i, y: j });
                        break;
                    case "p":
                        var thisPiece = new Phao(false, { x: i, y: j });
                        break;
                    case "z":
                        var thisPiece = new Tot(false, { x: i, y: j });
                        break;
                    default:
                        throw new Error("This piece is not available");
                }
                colPieces.push(thisPiece);
                this.onBoardPieces.push(thisPiece);
            }
        }
    }

    getPoint() {
        let point = 0;
        this.onBoardPieces.forEach(piece => {
            point += piece.getCurrentValue();
        });
        return point;
    }

    /**
     * This method move piece from position to newPosition, remove and return captured piece. 
     * This method DOES NOT validate the move with any play rules.
     */
    movePiece(position, newPosition) {
        let { x, y } = position;
        let thisPiece = this.piecesPositionOnBoard[x][y];
        if (!thisPiece) throw new Error("There is no piece on old position:" + position);

        let { newX, newY } = newPosition;
        this.piecesPositionOnBoard[x][y] = null;
        let captured = this.piecesPositionOnBoard[newX][newY];
        this.piecesPositionOnBoard[newX][newY] = thisPiece;
        thisPiece.x = newX; thisPiece.y = newY;

        if (this.redToPlay) { this.redToPlay = false; } else { this.redToPlay = true; this.turn += 1; }
        this.onBoardPieces.splice(this.onBoardPieces.findIndex(captured), 1);
        return { captured: captured, board: this };

    }
}

// ---------------------------GUI---------------------------
const defaultStyle = {
    width: 325,
    height: 402,
    spaceX: 35,
    spaceY: 36,
    pointStartX: 5,
    pointStartY: 19,
    page: "stype_1"
};

class Background {
    constructor(context2d) {
        this.context2d = context2d;
        this.x = 0;
        this.y = 0;
        this.img = new Image();
        this.img.src = "/img/stype_1/bg.png";
    }

    show(sizeSetting) {
        this.context2d.drawImage(this.img, sizeSetting.spaceX * this.x, sizeSetting.spaceY * this.y);
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

    show(sizeSetting) {
        if (this.isShow) {
            this.context2d.drawImage(this.img, sizeSetting.spaceX * this.x + sizeSetting.pointStartX, sizeSetting.spaceY * this.y + sizeSetting.pointStartY)
            this.context2d.drawImage(this.img, sizeSetting.spaceX * this.newX + sizeSetting.pointStartX, sizeSetting.spaceY * this.newY + sizeSetting.pointStartY)
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

    show(sizeSetting) {
        for (let i = 0; i < this.dots.length; i++) {
            this.context2d.drawImage(this.img, sizeSetting.spaceX * this.x + sizeSetting.pointStartX, sizeSetting.spaceY * this.y + sizeSetting.pointStartY);

        }
    }
}

export function addGUI2Board(board, context2dAvailabler, sizeSetting) {
    if (!board.context2d) {
        board.context2d = context2dAvailabler.getContext("2d");
        board.sizeSetting = sizeSetting;
        context2dAvailabler.width = sizeSetting.width;
        context2dAvailabler.height = sizeSetting.height
    }
    board.bg = board.bg || new Background(context2dAvailabler);
    board.pane = board.pane || new Pane(context2dAvailabler);
    board.dot = board.dot || new Dot(context2dAvailabler);
}
export class BoardGUI extends Board {
    constructor(startPositions, context2dAvailabler, sizeSetting) {
        super(startPositions);
        addGUI(this, context2dAvailabler, sizeSetting || defaultStyle);
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

// ---------------------------Bot---------------------------
export function extendBoard(board) {
    // format: {oldposiotion, newposiotion}: new Board;
    board.nextBoards = board.nextBoards || {};


}

