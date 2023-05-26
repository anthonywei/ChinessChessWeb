"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardGUI = exports.addGUI2Board = exports.Board = void 0;
const class_Piece_1 = require("./class_Piece");
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
class Board {
    constructor(startPositions) {
        this.redToPlay = true;
        this.onBoardPieces = [];
        this.turn = 0;
        var refinedStartPositions;
        if (startPositions)
            refinedStartPositions = startPositions;
        else
            refinedStartPositions = defaultPosition;
        this.piecesPositionOnBoard = [];
        for (var i = 0; i < refinedStartPositions.length; i++) {
            let colPieces = [];
            this.piecesPositionOnBoard.push(colPieces);
            for (var j = 0; j < refinedStartPositions[i].length; j++) {
                if (!refinedStartPositions[i][j]) {
                    colPieces.push(null);
                    continue;
                }
                ;
                const pieceChar = refinedStartPositions ? [i][j].toString().charAt(0) : null;
                var thisPiece;
                switch (pieceChar) {
                    case null:
                        thisPiece = null;
                        break;
                    case "C":
                        thisPiece = new class_Piece_1.Xe(true, { x: i, y: j });
                        break;
                    case "M":
                        thisPiece = new class_Piece_1.Ma(true, { x: i, y: j });
                        break;
                    case "X":
                        thisPiece = new class_Piece_1.Vua(true, { x: i, y: j });
                        break;
                    case "S":
                        thisPiece = new class_Piece_1.Si(true, { x: i, y: j });
                        break;
                    case "J":
                        thisPiece = new class_Piece_1.Tuong(true, { x: i, y: j });
                        break;
                    case "P":
                        thisPiece = new class_Piece_1.Phao(true, { x: i, y: j });
                        break;
                    case "Z":
                        thisPiece = new class_Piece_1.Tot(true, { x: i, y: j });
                        break;
                    case "c":
                        thisPiece = new class_Piece_1.Xe(false, { x: i, y: j });
                        break;
                    case "m":
                        thisPiece = new class_Piece_1.Ma(false, { x: i, y: j });
                        break;
                    case "x":
                        thisPiece = new class_Piece_1.Vua(false, { x: i, y: j });
                        break;
                    case "s":
                        thisPiece = new class_Piece_1.Si(false, { x: i, y: j });
                        break;
                    case "j":
                        thisPiece = new class_Piece_1.Tuong(false, { x: i, y: j });
                        break;
                    case "p":
                        thisPiece = new class_Piece_1.Phao(false, { x: i, y: j });
                        break;
                    case "z":
                        thisPiece = new class_Piece_1.Tot(false, { x: i, y: j });
                        break;
                    default:
                        throw new Error("This piece is not available");
                }
                colPieces.push(thisPiece);
                if (thisPiece)
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
    movePiece(position, newPosition) {
        let { x, y } = position;
        let thisPiece = this.piecesPositionOnBoard[x][y];
        if (!thisPiece)
            throw new Error("There is no piece on old position:" + position);
        let { x: newX, y: newY } = newPosition;
        this.piecesPositionOnBoard[x][y] = null;
        let captured = this.piecesPositionOnBoard[newX][newY];
        this.piecesPositionOnBoard[newX][newY] = thisPiece;
        thisPiece.position.x = newX;
        thisPiece.position.y = newY;
        if (this.redToPlay) {
            this.redToPlay = false;
        }
        else {
            this.redToPlay = true;
            this.turn += 1;
        }
        this.onBoardPieces.splice(this.onBoardPieces.findIndex(x => { x == captured; }), 1);
        return { captured: captured, board: this };
    }
}
exports.Board = Board;
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
    constructor(context2d, sizeSetting) {
        this.context2d = context2d;
        this.sizeSetting = sizeSetting;
        this.x = 0;
        this.y = 0;
        this.img = new Image();
        this.img.src = "/img/stype_1/bg.png";
    }
    show() {
        this.context2d.drawImage(this.img, this.sizeSetting.spaceX * this.x, this.sizeSetting.spaceY * this.y);
    }
}
class Pane {
    constructor(context2d, sizeSetting) {
        this.context2d = context2d;
        this.sizeSetting = sizeSetting;
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
            this.context2d.drawImage(this.img, this.sizeSetting.spaceX * this.x + this.sizeSetting.pointStartX, this.sizeSetting.spaceY * this.y + this.sizeSetting.pointStartY);
            this.context2d.drawImage(this.img, this.sizeSetting.spaceX * this.newX + this.sizeSetting.pointStartX, this.sizeSetting.spaceY * this.newY + this.sizeSetting.pointStartY);
        }
    }
}
class Dot {
    constructor(context2d, sizeSetting) {
        this.context2d = context2d;
        this.sizeSetting = sizeSetting;
        this.x = 0;
        this.y = 0;
        this.img = new Image();
        this.img.src = "/img/stype_1/dot.png";
        this.dots = [];
    }
    show() {
        for (let i = 0; i < this.dots.length; i++) {
            this.context2d.drawImage(this.img, this.sizeSetting.spaceX * this.x + this.sizeSetting.pointStartX, this.sizeSetting.spaceY * this.y + this.sizeSetting.pointStartY);
        }
    }
}
function addGUI2Board(board, context2dAvailabler, sizeSetting) {
    let thisContext2d = context2dAvailabler.getContext("2d");
    if (!("context2d" in board)) {
        Object.assign(board, {
            context2d: thisContext2d,
            sizeSetting: sizeSetting,
            context2dAvailabler: context2dAvailabler
        });
        context2dAvailabler.width = sizeSetting.width;
        context2dAvailabler.height = sizeSetting.height;
    }
    if (board.hasOwnProperty("bg"))
        Object.assign(board, { bg: new Background(thisContext2d, sizeSetting) });
    if (board.hasOwnProperty("pane"))
        Object.assign(board, { pane: new Pane(thisContext2d, sizeSetting) });
    if (board.hasOwnProperty("dot"))
        Object.assign(board, { dot: new Background(thisContext2d, sizeSetting) });
}
exports.addGUI2Board = addGUI2Board;
class BoardGUI extends Board {
    constructor(startPositions, context2dAvailabler, sizeSetting) {
        super(startPositions);
        addGUI2Board(this, context2dAvailabler, sizeSetting || defaultStyle);
    }
    show() {
        this.context2d.clearRect(0, 0, 325, 402);
        if (this.bg)
            this.bg.show();
        if (this.pane)
            this.pane.show();
        if (this.dot)
            this.dot.show();
        for (let i = 0; i < this.onBoardPieces.length; i++) {
            this.onBoardPieces[i].show(this.context2d);
        }
    }
    getClicked(e) {
        if (!this.sizeSetting)
            throw new Error("This object is not init properly, lack sizeSetting");
        let domXY = getDomXY(this.context2dAvailabler);
        let x = Math.round((e.pageX - domXY.x - this.sizeSetting.pointStartX - 20) / this.sizeSetting.spaceX);
        let y = Math.round((e.pageY - domXY.y - this.sizeSetting.pointStartY - 20) / this.sizeSetting.spaceY);
        return {
            piece: this.piecesPositionOnBoard[x][y],
            point: { x: x, y: y }
        };
    }
}
exports.BoardGUI = BoardGUI;
function getDomXY(dom) {
    var left = dom.offsetLeft;
    var top = dom.offsetTop;
    var current = dom.offsetParent;
    while (current !== null) {
        left += current.offsetLeft;
        top += current.offsetTop;
        current = current.offsetParent;
    }
    return { x: left, y: top };
}
