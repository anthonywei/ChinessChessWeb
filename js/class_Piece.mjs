// ------------------ Piece ----------------------------
const PROPERTIES = {
    red: {
        Xe: { text: "俥", imgStr: 'r_c' },
        Ma: { text: "傌", imgStr: 'r_m' },
        Vua: { text: "帥", imgStr: 'r_x' },
        Si: { text: "仕", imgStr: 'r_s' },
        Tuong: { text: "相", imgStr: 'r_j' },
        Phao: { text: "炮", imgStr: 'r_p' },
        Tot: { text: "兵", imgStr: 'r_z' }
    },
    black: {
        Xe: { text: "車", imgStr: 'r_c' },
        Ma: { text: "馬", imgStr: 'r_m' },
        Vua: { text: "將", imgStr: 'r_x' },
        Si: { text: "士", imgStr: 'r_s' },
        Tuong: { text: "象", imgStr: 'r_j' },
        Phao: { text: "砲", imgStr: 'r_p' },
        Tot: { text: "卒", imgStr: 'r_z' }
    }
}
const VALUE = {
    Xe: 100,
    Ma: 45,
    Vua: 9999,
    Si: 20,
    Tuong: 25,
    Phao: 50,
    Tot: 10
}
let POSITION_VALUES = {}

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

export class Piece {
    constructor(scale, position, baseValue) {
        this.scale = scale;
        this.position = position;
        this.baseValue = baseValue;
    }

    getCurrentValue() {
        return this.scale * (this.baseValue + this.getPositionValue());
    }

    show(canvas2dcontext) {
        canvas2dcontext.save();
        canvas2dcontext.globalAlpha = 1;
        canvas2dcontext.drawImage(this.getImg(), 35 * this.position[0] + 5, 36 * this.position[1] + 19);
        canvas2dcontext.restore();
    }

    getImg() {
        let out = new Image();
        out.src = "/img/stype_1/" + this.imgStr + ".png";
        return out;
    }
    
    getPosibleMoves(_board) {
        return [];
    }
    
    getPositionValue() {
        return 0;
    }
}

POSITION_VALUES.Xe = [
    [3, 3, 3, 3, 4, 4, 2, -1, 0, -3],
    [4, 6, 4, 6, 5, 6, 4, 4, 4, 3],
    [3, 4, 3, 6, 5, 6, 2, 2, 3, 2],
    [6, 8, 7, 8, 7, 7, 6, 6, 6, 6],
    [7, 16, 8, 8, 7, 7, 7, 6, 0, 0],
    [6, 8, 7, 8, 7, 7, 6, 6, 6, 6],
    [3, 4, 3, 6, 5, 6, 2, 2, 3, 2],
    [4, 6, 4, 6, 5, 6, 4, 4, 4, 3],
    [3, 3, 3, 3, 4, 4, 2, -1, 0, -3]
];
export class Xe extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, VALUE.Xe);

        if (scale == 1) {
            var properties = PROPERTIES.red.Xe;
        } else {
            var properties = PROPERTIES.black.Xe;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }

    getPositionValue() {
        let {x, y} = this.position;
        return POSITION_VALUES.Xe[x][y];
    }
}

export class Ma extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, VALUE.Ma);

        if (scale == 1) {
            var properties = PROPERTIES.red.Ma;
        } else {
            var properties = PROPERTIES.black.Ma;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }

    getPositionValue() {
        let [x, y] = this.position;
        return Ma.positionValue[x][y];
    }
}

export class Vua extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, VALUE.Vua);

        if (scale == 1) {
            var properties = PROPERTIES.red.Vua;
        } else {
            var properties = PROPERTIES.black.Vua;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }
}

export class Si extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, VALUE.Si);

        if (scale == 1) {
            var properties = PROPERTIES.red.Si;
        } else {
            var properties = PROPERTIES.black.Si;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }

    getPositionValue() {
        let [x, y] = this.position;
        return Si.positionValue[x][y];
    }
}

export class Tuong extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, VALUE.Tuong);

        if (scale == 1) {
            var properties = PROPERTIES.red.Tuong;
        } else {
            var properties = PROPERTIES.black.Tuong;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }

    getPositionValue() {
        let [x, y] = this.position;
        return Tuong.positionValue[x][y];
    }
}

export class Phao extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, VALUE.Phao);

        if (scale == 1) {
            var properties = PROPERTIES.red.Phao;
        } else {
            var properties = PROPERTIES.black.Phao;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }

    getPositionValue() {
        let [x, y] = this.position;
        return Phao.positionValue[x][y];
    }
}

export class Tot extends Piece {
    constructor(side, position) {
        let scale = parseSide(side);
        super(scale, position, VALUE.Tot);

        if (scale == 1) {
            var properties = PROPERTIES.red.Tot;
        } else {
            var properties = PROPERTIES.black.Tot;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }

    getPositionValue() {
        let [x, y] = this.position;
        return Tot.positionValue[x][y];
    }
}