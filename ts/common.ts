import { BoardGUI, Style } from "./class_Board"


let stype1: Style = {
    width: 325,
    height: 402,
    spaceX: 35,
    spaceY: 36,
    pointStartX: 5,
    pointStartY: 19,
    page: "stype_1"
};


function get(id: string) {
    let elem = document.getElementById(id);
    if (!elem) throw new Error("No `" + id + "` element found");
    return elem;
}


get("box").style.width = stype1.width + 1 + "px";

let canvas = get("chess");
let board = new BoardGUI(null, canvas, stype1);

// load wood experience 
document.getElementsByTagName("body")[0].style.background = "url(img/" + stype1.page + "/bg.jpg)";


window.onload = function () {
    if (board.pane) board.pane.isShow = false;
    if (board.bg) board.bg.show();

    //#region button 
    get("bnBox").style.display = "block";

    get("billBn").addEventListener("click", function (e) {
        if (confirm("Do you want to end this play?")) {
            // init();
            get("chessRight").style.display = "block";
            get("moveInfo").style.display = "none";
        }
    })
    get("superPlay").addEventListener("click", function (e) {
        if (confirm("Start Normal mode? Your current play will be ended as loss.")) {
            // play.isPlay = true;
            get("chessRight").style.display = "none";
            get("moveInfo").style.display = "block";
            get("moveInfo").innerHTML = "";
            // play.depth = 4;
            // play.init();
        }
    })
    get("tyroPlay").addEventListener("click", function (e) {
        if (confirm("Start Easy mode? Your current play will be ended as loss.")) {
            // play.isPlay = true;
            get("chessRight").style.display = "none";
            get("moveInfo").style.display = "block";
            get("moveInfo").innerHTML = "";
            // play.depth = 3;
            // play.init();
        }
    });
    //#endregion
}

// use somewhere
function showPane(x: number, y: number, newX: number, newY: number) {
    if (board.pane) {
        board.pane.isShow = true;
        board.pane.x = x;
        board.pane.y = y;
        board.pane.newX = newX;
        board.pane.newY = newY;
    }
}