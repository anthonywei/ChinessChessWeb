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
export class Piece {
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
export class Xe extends Piece {
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

export class Ma extends Piece {
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

export class Vua extends Piece {
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

export class Si extends Piece {
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

export class Tuong extends Piece {
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

export class Phao extends Piece {
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

export class Tot extends Piece {
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