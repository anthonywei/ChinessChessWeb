import { Board } from "./class_Board";

// ------------------ Piece ----------------------------
// Todo: POSITION_VALUES, toString()
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
let POSITION_VALUES:{[key: string]: [number[], number[], number[], number[], number[], number[], number[], number[], number[]]} = {}

function parseSide(isRedPiece: (boolean| string| number)) {
    let scale = 0;
    if (typeof isRedPiece === "boolean") {
        if (isRedPiece) scale = 1; else scale = -1;
    }
    else if (typeof isRedPiece === "string") {
        isRedPiece = isRedPiece.toLowerCase();
        if (isRedPiece === "red" || isRedPiece === "r") scale = 1;
        if (isRedPiece === "black" || isRedPiece === "b") scale = -1;
    }
    else if (typeof isRedPiece === "number") {
        isRedPiece = Math.sign(isRedPiece);
    }
    if (scale == 0) throw new Error("Invalid isRedPiece value");

    return scale;
}

export class Piece {
	public scale: number;
	public position: {x: number, y:number};
	public baseValue: number;
	public selected: boolean;
	public imgStr?: string;
    public text?:string;

    constructor(scale: number, position: {x: number, y: number}, baseValue: number) {
        this.scale = scale;
        this.position = position;
        this.baseValue = baseValue;
        this.selected = false;
    }

    getCurrentValue() {
        return this.scale * (this.baseValue + this._getPositionValue());
    }

    show(canvas2dcontext: any) {
        canvas2dcontext.save();
        canvas2dcontext.globalAlpha = 1;
        canvas2dcontext.drawImage(this.getImg(), 35 * this.position.x + 5, 36 * this.position.y + 19);
        canvas2dcontext.restore();
    }

    getImg() {
        let out = new Image();
        out.src = "/img/stype_1/" + this.imgStr + ".png";
        return out;
    }
    
    click(board: Board) {
        this.selected = ! this.selected;
        // Todo: remove all dots 
        if (this.selected) {
            let moves = this.getPosibleMoves(board);
            // Todo: show dots
        }
    }
    
    // ---------------------------abtract methods---------------------------
    getPosibleMoves(_board: Board) {
        return [];
    }
    
    _getPositionValue() {
        return 0;
    }

    toString() {
        return "";
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

    constructor(isRedPiece: (boolean| string| number), position: {x: number, y: number}) {
        let scale = parseSide(isRedPiece);
        super(scale, position, VALUE.Xe);

        if (scale == 1) {
            var properties = PROPERTIES.red.Xe;
        } else {
            var properties = PROPERTIES.black.Xe;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }

    _getPositionValue() {
        let {x, y} = this.position;
        if (this.scale < 0) {
            y = y * this.scale - 1;
        }
        return POSITION_VALUES.Xe[x][y];
    }
}

export class Ma extends Piece {

    constructor(isRedPiece: (boolean| string| number), position: {x: number, y: number}) {
        let scale = parseSide(isRedPiece);
        super(scale, position, VALUE.Ma);

        if (scale == 1) {
            var properties = PROPERTIES.red.Ma;
        } else {
            var properties = PROPERTIES.black.Ma;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }

    _getPositionValue() {
        let {x, y} = this.position;
        if (this.scale < 0) {
            y = y * this.scale - 1;
        }
        return POSITION_VALUES.Ma[x][y];
    }
}

export class Vua extends Piece {

    constructor(isRedPiece: (boolean| string| number), position: {x: number, y: number}) {
        let scale = parseSide(isRedPiece);
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

    constructor(isRedPiece: (boolean| string| number), position: {x: number, y: number}) {
        let scale = parseSide(isRedPiece);
        super(scale, position, VALUE.Si);

        if (scale == 1) {
            var properties = PROPERTIES.red.Si;
        } else {
            var properties = PROPERTIES.black.Si;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }

    _getPositionValue() {
        let {x, y} = this.position;
        if (this.scale < 0) {
            y = y * this.scale - 1;
        }
        return POSITION_VALUES.Si[x][y];
    }
}

export class Tuong extends Piece {

    constructor(isRedPiece: (boolean| string| number), position: {x: number, y: number}) {
        let scale = parseSide(isRedPiece);
        super(scale, position, VALUE.Tuong);

        if (scale == 1) {
            var properties = PROPERTIES.red.Tuong;
        } else {
            var properties = PROPERTIES.black.Tuong;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }

    _getPositionValue() {
        let {x, y} = this.position;
        if (this.scale < 0) {
            y = y * this.scale - 1;
        }
        return POSITION_VALUES.Tuong[x][y];
    }
}

export class Phao extends Piece {

    constructor(isRedPiece: (boolean| string| number), position: {x: number, y: number}) {
        let scale = parseSide(isRedPiece);
        super(scale, position, VALUE.Phao);

        if (scale == 1) {
            var properties = PROPERTIES.red.Phao;
        } else {
            var properties = PROPERTIES.black.Phao;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }

    _getPositionValue() {
        let {x, y} = this.position;
        if (this.scale < 0) {
            y = y * this.scale - 1;
        }
        return POSITION_VALUES.Phao[x][y];
    }
}

export class Tot extends Piece {

    constructor(isRedPiece: (boolean| string| number), position: {x: number, y: number}) {
        let scale = parseSide(isRedPiece);
        super(scale, position, VALUE.Tot);

        if (scale == 1) {
            var properties = PROPERTIES.red.Tot;
        } else {
            var properties = PROPERTIES.black.Tot;
        }
        this.text = properties.text;
        this.imgStr = properties.imgStr;
    }

    _getPositionValue() {
        let {x, y} = this.position;
        if (this.scale < 0) {
            y = y * this.scale - 1;
        }
        return POSITION_VALUES.Tot[x][y];
    }
}