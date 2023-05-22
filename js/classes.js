// ------------------ Piece ----------------------------
function parseSide(side) {
    let scale = 0;
    if (typeof side === "boolean") {
        if (side) scale = 1; else scale = -1;
    }
    else if (typeof side === "string") {
        side = side.toLowerCase();
        if (side === "red" || side === "r") scale = 1;
        if (side === "black" || side === "b") scale = -1;
    }
    else if (typeof side === "number") {
        side = Math.sign(side);
    }
    if (scale == 0) throw new Error("Invalid side value");

    return scale;
}

class Piece {
    constructor(scale, position, baseValue) {
        this.scale = scale;
        this.position = position;
        this.baseValue = baseValue;
    }

    getCurrentValue() {
        return this.scale * (this.baseValue + this.getPositionValue());
    }

    getPositionValue() {
        return 0;
    }
}

Piece.properties = {
    red: {
        Xe: { text: "俥", img: 'r_c' },
        Ma: { text: "傌", img: 'r_m' },
        Vua: { text: "帥", img: 'r_x' },
        Si: { text: "仕", img: 'r_s' },
        Tuong: { text: "相", img: 'r_j' },
        Phao: { text: "炮", img: 'r_p' },
        Tot: { text: "兵", img: 'r_z' }
    },
    black: {
        Xe: { text: "車", img: 'r_c' },
        Ma: { text: "馬", img: 'r_m' },
        Vua: { text: "將", img: 'r_x' },
        Si: { text: "士", img: 'r_s' },
        Tuong: { text: "象", img: 'r_j' },
        Phao: { text: "砲", img: 'r_p' },
        Tot: { text: "卒", img: 'r_z' }
    }
}
Piece.value = {
    Xe: 100,
    Ma: 45,
    Vua: 9999,
    Si: 20,
    Tuong: 25,
    Phao: 50,
    Tot: 10
}

class Xe extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, Piece.value.Xe);

        if (scale == 1) {
            let properties = Piece.properties.red.Xe;
        } else {
            let properties = Piece.properties.black.Xe;
        }
        this.text = properties.text;
        this.img = properties.img;
    }

    getPositionValue() {
        let [x, y] = this.position;
        return Xe.positionValue[x][y];
    }
}
Xe.positionValue = [
    [3, 3, 3, 3, 4, 4, 2, -1, 0, -3]
    [4, 6, 4, 6, 5, 6, 4, 4, 4, 3]
    [3, 4, 3, 6, 5, 6, 2, 2, 3, 2]
    [6, 8, 7, 8, 7, 7, 6, 6, 6, 6]
    [7, 16, 8, 8, 7, 7, 7, 6, 0, 0]
    [6, 8, 7, 8, 7, 7, 6, 6, 6, 6]
    [3, 4, 3, 6, 5, 6, 2, 2, 3, 2]
    [4, 6, 4, 6, 5, 6, 4, 4, 4, 3]
    [3, 3, 3, 3, 4, 4, 2, -1, 0, -3]
]

class Ma extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, Piece.value.Ma);

        if (scale == 1) {
            let properties = Piece.properties.red.Ma;
        } else {
            let properties = Piece.properties.black.Ma;
        }
        this.text = properties.text;
        this.img = properties.img;
    }

    getPositionValue() {
        let [x, y] = this.position;
        return Ma.positionValue[x][y];
    }
}

class Vua extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, Piece.value.Vua);

        if (scale == 1) {
            let properties = Piece.properties.red.Vua;
        } else {
            let properties = Piece.properties.black.Vua;
        }
        this.text = properties.text;
        this.img = properties.img;
    }
}

class Si extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, Piece.value.Si);

        if (scale == 1) {
            let properties = Piece.properties.red.Si;
        } else {
            let properties = Piece.properties.black.Si;
        }
        this.text = properties.text;
        this.img = properties.img;
    }

    getPositionValue() {
        let [x, y] = this.position;
        return Si.positionValue[x][y];
    }
}

class Tuong extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, Piece.value.Tuong);

        if (scale == 1) {
            let properties = Piece.properties.red.Tuong;
        } else {
            let properties = Piece.properties.black.Tuong;
        }
        this.text = properties.text;
        this.img = properties.img;
    }

    getPositionValue() {
        let [x, y] = this.position;
        return Tuong.positionValue[x][y];
    }
}

class Phao extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, Piece.value.Phao);

        if (scale == 1) {
            let properties = Piece.properties.red.Phao;
        } else {
            let properties = Piece.properties.black.Phao;
        }
        this.text = properties.text;
        this.img = properties.img;
    }

    getPositionValue() {
        let [x, y] = this.position;
        return Phao.positionValue[x][y];
    }
}

class Tot extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, Piece.value.Tot);

        if (scale == 1) {
            let properties = Piece.properties.red.Tot;
        } else {
            let properties = Piece.properties.black.Tot;
        }
        this.text = properties.text;
        this.img = properties.img;
    }

    getPositionValue() {
        let [x, y] = this.position;
        return Tot.positionValue[x][y];
    }
}


// ------------------ Board ----------------------------
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
        startPositions = startPositions || Board.defaultPosition;
        // 2D of pieces
        this.piecePositions = [];
        for (var i = 0; i < startPositions.length; i++) {
            // create current column and put to 2D array
            let colPieces = [];
            this.piecePositions.push(colPieces);
            for (var j = 0; j < startPositions[i].length; j++) {
                // check if null
                if (startPositions[i][j] === null) {
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
            }
        }
    }
}