"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tot = exports.Phao = exports.Tuong = exports.Si = exports.Vua = exports.Ma = exports.Xe = exports.Piece = void 0;
// ------------------ Piece ----------------------------
// Todo: POSITION_VALUES, toString()
var PROPERTIES = {
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
};
var VALUE = {
    Xe: 100,
    Ma: 45,
    Vua: 9999,
    Si: 20,
    Tuong: 25,
    Phao: 50,
    Tot: 10
};
var POSITION_VALUES = {};
function parseSide(side) {
    var scale = 0;
    if (typeof side === "boolean") {
        if (side)
            scale = 1;
        else
            scale = -1;
    }
    else if (typeof side === "string") {
        side = side.toLowerCase();
        if (side === "red" || side === "r")
            scale = 1;
        if (side === "black" || side === "b")
            scale = -1;
    }
    else if (typeof side === "number") {
        side = Math.sign(side);
    }
    if (scale == 0)
        throw new Error("Invalid side value");
    return scale;
}
var Piece = /** @class */ (function () {
    function Piece(scale, position, baseValue) {
        this.scale = scale;
        this.position = position;
        this.baseValue = baseValue;
        this.selected = false;
    }
    Piece.prototype.getCurrentValue = function () {
        return this.scale * (this.baseValue + this._getPositionValue());
    };
    Piece.prototype.show = function (canvas2dcontext) {
        canvas2dcontext.save();
        canvas2dcontext.globalAlpha = 1;
        canvas2dcontext.drawImage(this.getImg(), 35 * this.position.x + 5, 36 * this.position.y + 19);
        canvas2dcontext.restore();
    };
    Piece.prototype.getImg = function () {
        var out = new Image();
        out.src = "/img/stype_1/" + this.imgStr + ".png";
        return out;
    };
    Piece.prototype.click = function (board) {
        this.selected = !this.selected;
        // Todo: remove all dots 
        if (this.selected) {
            var moves = this.getPosibleMoves(board);
            // Todo: show dots
        }
    };
    // ---------------------------abtract methods---------------------------
    Piece.prototype.getPosibleMoves = function (_board) {
        return [];
    };
    Piece.prototype._getPositionValue = function () {
        return 0;
    };
    Piece.prototype.toString = function () {
        return "";
    };
    return Piece;
}());
exports.Piece = Piece;
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
var Xe = /** @class */ (function (_super) {
    __extends(Xe, _super);
    function Xe(side, position) {
        var _this = this;
        var scale = parseSide(side);
        _this = _super.call(this, scale, position, VALUE.Xe) || this;
        if (scale == 1) {
            var properties = PROPERTIES.red.Xe;
        }
        else {
            var properties = PROPERTIES.black.Xe;
        }
        _this.text = properties.text;
        _this.imgStr = properties.imgStr;
        return _this;
    }
    Xe.prototype._getPositionValue = function () {
        var _a = this.position, x = _a.x, y = _a.y;
        if (this.scale < 0) {
            y = y * this.scale - 1;
        }
        return POSITION_VALUES.Xe[x][y];
    };
    return Xe;
}(Piece));
exports.Xe = Xe;
var Ma = /** @class */ (function (_super) {
    __extends(Ma, _super);
    function Ma(side, position) {
        var _this = this;
        var scale = parseSide(side);
        _this = _super.call(this, scale, position, VALUE.Ma) || this;
        if (scale == 1) {
            var properties = PROPERTIES.red.Ma;
        }
        else {
            var properties = PROPERTIES.black.Ma;
        }
        _this.text = properties.text;
        _this.imgStr = properties.imgStr;
        return _this;
    }
    Ma.prototype._getPositionValue = function () {
        var _a = this.position, x = _a.x, y = _a.y;
        if (this.scale < 0) {
            y = y * this.scale - 1;
        }
        return POSITION_VALUES.Ma[x][y];
    };
    return Ma;
}(Piece));
exports.Ma = Ma;
var Vua = /** @class */ (function (_super) {
    __extends(Vua, _super);
    function Vua(side, position) {
        var _this = this;
        var scale = parseSide(side);
        _this = _super.call(this, scale, position, VALUE.Vua) || this;
        if (scale == 1) {
            var properties = PROPERTIES.red.Vua;
        }
        else {
            var properties = PROPERTIES.black.Vua;
        }
        _this.text = properties.text;
        _this.imgStr = properties.imgStr;
        return _this;
    }
    return Vua;
}(Piece));
exports.Vua = Vua;
var Si = /** @class */ (function (_super) {
    __extends(Si, _super);
    function Si(side, position) {
        var _this = this;
        var scale = parseSide(side);
        _this = _super.call(this, scale, position, VALUE.Si) || this;
        if (scale == 1) {
            var properties = PROPERTIES.red.Si;
        }
        else {
            var properties = PROPERTIES.black.Si;
        }
        _this.text = properties.text;
        _this.imgStr = properties.imgStr;
        return _this;
    }
    Si.prototype._getPositionValue = function () {
        var _a = this.position, x = _a.x, y = _a.y;
        if (this.scale < 0) {
            y = y * this.scale - 1;
        }
        return POSITION_VALUES.Si[x][y];
    };
    return Si;
}(Piece));
exports.Si = Si;
var Tuong = /** @class */ (function (_super) {
    __extends(Tuong, _super);
    function Tuong(side, position) {
        var _this = this;
        var scale = parseSide(side);
        _this = _super.call(this, scale, position, VALUE.Tuong) || this;
        if (scale == 1) {
            var properties = PROPERTIES.red.Tuong;
        }
        else {
            var properties = PROPERTIES.black.Tuong;
        }
        _this.text = properties.text;
        _this.imgStr = properties.imgStr;
        return _this;
    }
    Tuong.prototype._getPositionValue = function () {
        var _a = this.position, x = _a.x, y = _a.y;
        if (this.scale < 0) {
            y = y * this.scale - 1;
        }
        return POSITION_VALUES.Tuong[x][y];
    };
    return Tuong;
}(Piece));
exports.Tuong = Tuong;
var Phao = /** @class */ (function (_super) {
    __extends(Phao, _super);
    function Phao(side, position) {
        var _this = this;
        var scale = parseSide(side);
        _this = _super.call(this, scale, position, VALUE.Phao) || this;
        if (scale == 1) {
            var properties = PROPERTIES.red.Phao;
        }
        else {
            var properties = PROPERTIES.black.Phao;
        }
        _this.text = properties.text;
        _this.imgStr = properties.imgStr;
        return _this;
    }
    Phao.prototype._getPositionValue = function () {
        var _a = this.position, x = _a.x, y = _a.y;
        if (this.scale < 0) {
            y = y * this.scale - 1;
        }
        return POSITION_VALUES.Phao[x][y];
    };
    return Phao;
}(Piece));
exports.Phao = Phao;
var Tot = /** @class */ (function (_super) {
    __extends(Tot, _super);
    function Tot(side, position) {
        var _this = this;
        var scale = parseSide(side);
        _this = _super.call(this, scale, position, VALUE.Tot) || this;
        if (scale == 1) {
            var properties = PROPERTIES.red.Tot;
        }
        else {
            var properties = PROPERTIES.black.Tot;
        }
        _this.text = properties.text;
        _this.imgStr = properties.imgStr;
        return _this;
    }
    Tot.prototype._getPositionValue = function () {
        var _a = this.position, x = _a.x, y = _a.y;
        if (this.scale < 0) {
            y = y * this.scale - 1;
        }
        return POSITION_VALUES.Tot[x][y];
    };
    return Tot;
}(Piece));
exports.Tot = Tot;
