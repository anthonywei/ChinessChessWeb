import {BoardGUI} from "./class_Board.mjs"

// setup environment 
var com = com || {};

com.init = function (stype) {
	com.nowStype = stype || com.getCookie("stype") || "stype1";
	var stype = com.stype[com.nowStype];
	com.width = stype.width;
	com.height = stype.height;
	com.spaceX = stype.spaceX;
	com.spaceY = stype.spaceY;
	com.pointStartX = stype.pointStartX;
	com.pointStartY = stype.pointStartY;
	com.page = stype.page;
	
	com.get("box").style.width = com.width + 1 + "px";

	com.canvas = document.getElementById("chess");

	com.board = new BoardGUI(null, com.canvas, null);
	com.loadWoodenBg(com.page);

	com.bg = com.board.bg;
	com.dot = com.board.dot;
	com.pane = com.board.pane;
	com.pane.isShow = false;

}


com.stype = {
	stype1: {
		width: 325,
		height: 402,
		spaceX: 35,
		spaceY: 36,
		pointStartX: 5,
		pointStartY: 19,
		page: "stype_1"
	},
	stype2: {
		width: 530,
		height: 567,
		spaceX: 57,
		spaceY: 57,
		pointStartX: -2,
		pointStartY: 0,
		page: "stype_2"
	}
}

com.get = function (id) {
	return document.getElementById(id)
}

window.onload = function () {
	com.bg.show();
	com.get("bnBox").style.display = "block";

	// history
	com.get("billBn").addEventListener("click", function (e) {
		if (confirm("Do you want to end this play?")) {
			com.init();
			com.get("chessRight").style.display = "block";
			com.get("moveInfo").style.display = "none";
			bill.init();
		}
	})
	com.get("superPlay").addEventListener("click", function (e) {
		if (confirm("Start Normal mode? Your current play will be ended as loss.")) {
			play.isPlay = true;
			com.get("chessRight").style.display = "none";
			com.get("moveInfo").style.display = "block";
			com.get("moveInfo").innerHTML = "";
			play.depth = 4;
			play.init();
		}
	})
	com.get("tyroPlay").addEventListener("click", function (e) {
		if (confirm("Start Easy mode? Your current play will be ended as loss.")) {
			play.isPlay = true;
			com.get("chessRight").style.display = "none";
			com.get("moveInfo").style.display = "block";
			com.get("moveInfo").innerHTML = "";
			play.depth = 3;
			play.init();
		}
	})

	// no button 
	com.get("stypeBn").addEventListener("click", function (e) {
		var stype = com.nowStype;
		if (stype == "stype1") stype = "stype2";
		else if (stype == "stype2") stype = "stype1";
		com.init(stype);
		com.show();
		play.depth = 4;
		play.init();
		document.cookie = "stype=" + stype;
		clearInterval(timer);
		var i = 0;
		var timer = setInterval(function () {
			com.show();
			if (i++ >= 5) clearInterval(timer);
		}, 2000);
	})

}


com.loadWoodenBg = function (stype) {
	// put wood background for body
	document.getElementsByTagName("body")[0].style.background = "url(img/" + stype + "/bg.jpg)";
}


com.showPane = function (x, y, newX, newY) {
	com.pane.isShow = true;
	com.pane.x = x;
	com.pane.y = y;
	com.pane.newX = newX;
	com.pane.newY = newY;
}



// to get stype 
com.getCookie = function (name) {
	if (document.cookie.length > 0) {
		start = document.cookie.indexOf(name + "=")
		if (start != -1) {
			start = start + name.length + 1
			end = document.cookie.indexOf(";", start)
			if (end == -1) end = document.cookie.length
			return unescape(document.cookie.substring(start, end)) // TODO: use decodeURIComponent()
		}
	}
	return false;
}

// clone and reverse piece value for opponent
com.arr2Clone = function (arr) {
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
		newArr[i] = arr[i].slice();
	}
	return newArr;
}



// not used here 
// return a log move of (xy to newXY)
com.createMove = function (map, x, y, newX, newY) {
	var h = "";
	// choose piece from x,y on map 
	var man = com.mans[map[y][x]];
	h += man.text;
	// move piece and delete old piece 
	map[newY][newX] = map[y][x];
	delete map[y][x]; // ~ set to null
	// is myPiece
	if (man.my === 1) {
		// 1 -> 10  
		var mumTo = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
		// refine x to look like this side
		newX = 8 - newX;
		h += mumTo[8 - x];
		if (newY > y) {
			h += "退"; // retreat 
			if (man.pater == "m" || man.pater == "s" || man.pater == "x") {
				h += mumTo[newX];
			} else {
				h += mumTo[newY - y - 1];
			}
		} else if (newY < y) {
			h += "进"; // move
			if (man.pater == "m" || man.pater == "s" || man.pater == "x") {
				h += mumTo[newX];
			} else {
				h += mumTo[y - newY - 1];
			}
		} else {
			h += "平"; // draw
			h += mumTo[newX];
		}
	} else {
		var mumTo = ["1","2","3","4","5","6","7","8","9","10"];
		h += mumTo[x];
		if (newY > y) {
			h += "进"; // move
			if (man.pater == "M" || man.pater == "S" || man.pater == "X") {
				h += mumTo[newX];
			} else {
				h += mumTo[newY - y - 1];
			}
		} else if (newY < y) {
			h += "退"; // retreat 
			if (man.pater == "M" || man.pater == "S" || man.pater == "X") {
				h += mumTo[newX];
			} else {
				h += mumTo[y - newY - 1];
			}
		} else {
			h += "平"; // draw
			h += mumTo[newX];
		}
	}
	return h;
}





//#region how piece move and value  
com.bylaw = {}

com.bylaw.c = function (x, y, map, my) {
	var posibleMove = [];

	// xe đi xuống 
	for (var i = x - 1; i >= 0; i--) {
		if (map[y][i]) {
			if (com.mans[map[y][i]].my != my) posibleMove.push([i, y]);
			break
		} else {
			posibleMove.push([i, y])
		}
	}
	// + đi lên = hàng dọc 
	for (var i = x + 1; i <= 8; i++) {
		if (map[y][i]) {
			if (com.mans[map[y][i]].my != my) posibleMove.push([i, y]);
			break
		} else {
			posibleMove.push([i, y])
		}
	}

	for (var i = y - 1; i >= 0; i--) {
		if (map[i][x]) {
			if (com.mans[map[i][x]].my != my) posibleMove.push([x, i]);
			break
		} else {
			posibleMove.push([x, i])
		}
	}

	for (var i = y + 1; i <= 9; i++) {
		if (map[i][x]) {
			if (com.mans[map[i][x]].my != my) posibleMove.push([x, i]);
			break
		} else {
			posibleMove.push([x, i])
		}
	}
	return posibleMove;
}


com.bylaw.m = function (x, y, map, my) {
	var d = [];

	if (y - 2 >= 0 && x + 1 <= 8 && !play.map[y - 1][x] && (!com.mans[map[y - 2][x + 1]] || com.mans[map[y - 2][x + 1]].my != my)) d.push([x + 1, y - 2]);

	if (y - 1 >= 0 && x + 2 <= 8 && !play.map[y][x + 1] && (!com.mans[map[y - 1][x + 2]] || com.mans[map[y - 1][x + 2]].my != my)) d.push([x + 2, y - 1]);

	if (y + 1 <= 9 && x + 2 <= 8 && !play.map[y][x + 1] && (!com.mans[map[y + 1][x + 2]] || com.mans[map[y + 1][x + 2]].my != my)) d.push([x + 2, y + 1]);

	if (y + 2 <= 9 && x + 1 <= 8 && !play.map[y + 1][x] && (!com.mans[map[y + 2][x + 1]] || com.mans[map[y + 2][x + 1]].my != my)) d.push([x + 1, y + 2]);

	if (y + 2 <= 9 && x - 1 >= 0 && !play.map[y + 1][x] && (!com.mans[map[y + 2][x - 1]] || com.mans[map[y + 2][x - 1]].my != my)) d.push([x - 1, y + 2]);

	if (y + 1 <= 9 && x - 2 >= 0 && !play.map[y][x - 1] && (!com.mans[map[y + 1][x - 2]] || com.mans[map[y + 1][x - 2]].my != my)) d.push([x - 2, y + 1]);

	if (y - 1 >= 0 && x - 2 >= 0 && !play.map[y][x - 1] && (!com.mans[map[y - 1][x - 2]] || com.mans[map[y - 1][x - 2]].my != my)) d.push([x - 2, y - 1]);

	if (y - 2 >= 0 && x - 1 >= 0 && !play.map[y - 1][x] && (!com.mans[map[y - 2][x - 1]] || com.mans[map[y - 2][x - 1]].my != my)) d.push([x - 1, y - 2]);

	return d;
}


com.bylaw.x = function (x, y, map, my) {
	var d = [];
	if (my === 1) {

		if (y + 2 <= 9 && x + 2 <= 8 && !play.map[y + 1][x + 1] && (!com.mans[map[y + 2][x + 2]] || com.mans[map[y + 2][x + 2]].my != my)) d.push([x + 2, y + 2]);

		if (y + 2 <= 9 && x - 2 >= 0 && !play.map[y + 1][x - 1] && (!com.mans[map[y + 2][x - 2]] || com.mans[map[y + 2][x - 2]].my != my)) d.push([x - 2, y + 2]);

		if (y - 2 >= 5 && x + 2 <= 8 && !play.map[y - 1][x + 1] && (!com.mans[map[y - 2][x + 2]] || com.mans[map[y - 2][x + 2]].my != my)) d.push([x + 2, y - 2]);

		if (y - 2 >= 5 && x - 2 >= 0 && !play.map[y - 1][x - 1] && (!com.mans[map[y - 2][x - 2]] || com.mans[map[y - 2][x - 2]].my != my)) d.push([x - 2, y - 2]);
	} else {

		if (y + 2 <= 4 && x + 2 <= 8 && !play.map[y + 1][x + 1] && (!com.mans[map[y + 2][x + 2]] || com.mans[map[y + 2][x + 2]].my != my)) d.push([x + 2, y + 2]);

		if (y + 2 <= 4 && x - 2 >= 0 && !play.map[y + 1][x - 1] && (!com.mans[map[y + 2][x - 2]] || com.mans[map[y + 2][x - 2]].my != my)) d.push([x - 2, y + 2]);

		if (y - 2 >= 0 && x + 2 <= 8 && !play.map[y - 1][x + 1] && (!com.mans[map[y - 2][x + 2]] || com.mans[map[y - 2][x + 2]].my != my)) d.push([x + 2, y - 2]);

		if (y - 2 >= 0 && x - 2 >= 0 && !play.map[y - 1][x - 1] && (!com.mans[map[y - 2][x - 2]] || com.mans[map[y - 2][x - 2]].my != my)) d.push([x - 2, y - 2]);
	}
	return d;
}


com.bylaw.s = function (x, y, map, my) {
	var d = [];
	if (my === 1) {

		if (y + 1 <= 9 && x + 1 <= 5 && (!com.mans[map[y + 1][x + 1]] || com.mans[map[y + 1][x + 1]].my != my)) d.push([x + 1, y + 1]);

		if (y + 1 <= 9 && x - 1 >= 3 && (!com.mans[map[y + 1][x - 1]] || com.mans[map[y + 1][x - 1]].my != my)) d.push([x - 1, y + 1]);

		if (y - 1 >= 7 && x + 1 <= 5 && (!com.mans[map[y - 1][x + 1]] || com.mans[map[y - 1][x + 1]].my != my)) d.push([x + 1, y - 1]);

		if (y - 1 >= 7 && x - 1 >= 3 && (!com.mans[map[y - 1][x - 1]] || com.mans[map[y - 1][x - 1]].my != my)) d.push([x - 1, y - 1]);
	} else {

		if (y + 1 <= 2 && x + 1 <= 5 && (!com.mans[map[y + 1][x + 1]] || com.mans[map[y + 1][x + 1]].my != my)) d.push([x + 1, y + 1]);

		if (y + 1 <= 2 && x - 1 >= 3 && (!com.mans[map[y + 1][x - 1]] || com.mans[map[y + 1][x - 1]].my != my)) d.push([x - 1, y + 1]);

		if (y - 1 >= 0 && x + 1 <= 5 && (!com.mans[map[y - 1][x + 1]] || com.mans[map[y - 1][x + 1]].my != my)) d.push([x + 1, y - 1]);

		if (y - 1 >= 0 && x - 1 >= 3 && (!com.mans[map[y - 1][x - 1]] || com.mans[map[y - 1][x - 1]].my != my)) d.push([x - 1, y - 1]);
	}
	return d;

}


com.bylaw.j = function (x, y, map, my) {
	var d = [];
	var isNull = (function (y1, y2) {
		var y1 = com.mans["j0"].y;
		var x1 = com.mans["J0"].x;
		var y2 = com.mans["J0"].y;
		for (var i = y1 - 1; i > y2; i--) {
			if (map[i][x1]) return false;
		}
		return true;
	})();

	if (my === 1) {

		if (y + 1 <= 9 && (!com.mans[map[y + 1][x]] || com.mans[map[y + 1][x]].my != my)) d.push([x, y + 1]);

		if (y - 1 >= 7 && (!com.mans[map[y - 1][x]] || com.mans[map[y - 1][x]].my != my)) d.push([x, y - 1]);

		if (com.mans["j0"].x == com.mans["J0"].x && isNull) d.push([com.mans["J0"].x, com.mans["J0"].y]);

	} else {

		if (y + 1 <= 2 && (!com.mans[map[y + 1][x]] || com.mans[map[y + 1][x]].my != my)) d.push([x, y + 1]);

		if (y - 1 >= 0 && (!com.mans[map[y - 1][x]] || com.mans[map[y - 1][x]].my != my)) d.push([x, y - 1]);

		if (com.mans["j0"].x == com.mans["J0"].x && isNull) d.push([com.mans["j0"].x, com.mans["j0"].y]);
	}

	if (x + 1 <= 5 && (!com.mans[map[y][x + 1]] || com.mans[map[y][x + 1]].my != my)) d.push([x + 1, y]);

	if (x - 1 >= 3 && (!com.mans[map[y][x - 1]] || com.mans[map[y][x - 1]].my != my)) d.push([x - 1, y]);
	return d;
}


com.bylaw.p = function (x, y, map, my) {
	var d = [];

	var n = 0;
	for (var i = x - 1; i >= 0; i--) {
		if (map[y][i]) {
			if (n == 0) {
				n++;
				continue;
			} else {
				if (com.mans[map[y][i]].my != my) d.push([i, y]);
				break
			}
		} else {
			if (n == 0) d.push([i, y])
		}
	}

	var n = 0;
	for (var i = x + 1; i <= 8; i++) {
		if (map[y][i]) {
			if (n == 0) {
				n++;
				continue;
			} else {
				if (com.mans[map[y][i]].my != my) d.push([i, y]);
				break
			}
		} else {
			if (n == 0) d.push([i, y])
		}
	}

	var n = 0;
	for (var i = y - 1; i >= 0; i--) {
		if (map[i][x]) {
			if (n == 0) {
				n++;
				continue;
			} else {
				if (com.mans[map[i][x]].my != my) d.push([x, i]);
				break
			}
		} else {
			if (n == 0) d.push([x, i])
		}
	}

	var n = 0;
	for (var i = y + 1; i <= 9; i++) {
		if (map[i][x]) {
			if (n == 0) {
				n++;
				continue;
			} else {
				if (com.mans[map[i][x]].my != my) d.push([x, i]);
				break
			}
		} else {
			if (n == 0) d.push([x, i])
		}
	}
	return d;
}


com.bylaw.z = function (x, y, map, my) {
	var d = [];
	if (my === 1) {

		if (y - 1 >= 0 && (!com.mans[map[y - 1][x]] || com.mans[map[y - 1][x]].my != my)) d.push([x, y - 1]);

		if (x + 1 <= 8 && y <= 4 && (!com.mans[map[y][x + 1]] || com.mans[map[y][x + 1]].my != my)) d.push([x + 1, y]);

		if (x - 1 >= 0 && y <= 4 && (!com.mans[map[y][x - 1]] || com.mans[map[y][x - 1]].my != my)) d.push([x - 1, y]);
	} else {

		if (y + 1 <= 9 && (!com.mans[map[y + 1][x]] || com.mans[map[y + 1][x]].my != my)) d.push([x, y + 1]);

		if (x + 1 <= 8 && y >= 6 && (!com.mans[map[y][x + 1]] || com.mans[map[y][x + 1]].my != my)) d.push([x + 1, y]);

		if (x - 1 >= 0 && y >= 6 && (!com.mans[map[y][x - 1]] || com.mans[map[y][x - 1]].my != my)) d.push([x - 1, y]);
	}

	return d;
}

com.value = {
	c: [
		[206, 208, 207, 213, 214, 213, 207, 208, 206],
		[206, 212, 209, 216, 233, 216, 209, 212, 206],
		[206, 208, 207, 214, 216, 214, 207, 208, 206],
		[206, 213, 213, 216, 216, 216, 213, 213, 206],
		[208, 211, 211, 214, 215, 214, 211, 211, 208],

		[208, 212, 212, 214, 215, 214, 212, 212, 208],
		[204, 209, 204, 212, 214, 212, 204, 209, 204],
		[198, 208, 204, 212, 212, 212, 204, 208, 198],
		[200, 208, 206, 212, 200, 212, 206, 208, 200],
		[194, 206, 204, 212, 200, 212, 204, 206, 194]
	],


	m: [
		[90, 90, 90, 96, 90, 96, 90, 90, 90],
		[90, 96, 103, 97, 94, 97, 103, 96, 90],
		[92, 98, 99, 103, 99, 103, 99, 98, 92],
		[93, 108, 100, 107, 100, 107, 100, 108, 93],
		[90, 100, 99, 103, 104, 103, 99, 100, 90],

		[90, 98, 101, 102, 103, 102, 101, 98, 90],
		[92, 94, 98, 95, 98, 95, 98, 94, 92],
		[93, 92, 94, 95, 92, 95, 94, 92, 93],
		[85, 90, 92, 93, 78, 93, 92, 90, 85],
		[88, 85, 90, 88, 90, 88, 90, 85, 88]
	],


	x: [
		[0, 0, 20, 0, 0, 0, 20, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 23, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 20, 0, 0, 0, 20, 0, 0],

		[0, 0, 20, 0, 0, 0, 20, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[18, 0, 0, 0, 23, 0, 0, 0, 18],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 20, 0, 0, 0, 20, 0, 0]
	],


	s: [
		[0, 0, 0, 20, 0, 20, 0, 0, 0],
		[0, 0, 0, 0, 23, 0, 0, 0, 0],
		[0, 0, 0, 20, 0, 20, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],

		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 20, 0, 20, 0, 0, 0],
		[0, 0, 0, 0, 23, 0, 0, 0, 0],
		[0, 0, 0, 20, 0, 20, 0, 0, 0]
	],


	j: [
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],

		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0]
	],


	p: [

		[100, 100, 96, 91, 90, 91, 96, 100, 100],
		[98, 98, 96, 92, 89, 92, 96, 98, 98],
		[97, 97, 96, 91, 92, 91, 96, 97, 97],
		[96, 99, 99, 98, 100, 98, 99, 99, 96],
		[96, 96, 96, 96, 100, 96, 96, 96, 96],

		[95, 96, 99, 96, 100, 96, 99, 96, 95],
		[96, 96, 96, 96, 96, 96, 96, 96, 96],
		[97, 96, 100, 99, 101, 99, 100, 96, 97],
		[96, 97, 98, 98, 98, 98, 98, 97, 96],
		[96, 96, 97, 99, 99, 99, 97, 96, 96]
	],


	z: [
		[9, 9, 9, 11, 13, 11, 9, 9, 9],
		[19, 24, 34, 42, 44, 42, 34, 24, 19],
		[19, 24, 32, 37, 37, 37, 32, 24, 19],
		[19, 23, 27, 29, 30, 29, 27, 23, 19],
		[14, 18, 20, 27, 29, 27, 20, 18, 14],

		[7, 0, 13, 0, 16, 0, 13, 0, 7],
		[7, 0, 7, 0, 15, 0, 7, 0, 7],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
}


com.value.C = com.arr2Clone(com.value.c).reverse();
com.value.M = com.arr2Clone(com.value.m).reverse();
com.value.X = com.value.x;
com.value.S = com.value.s;
com.value.J = com.value.j;
com.value.P = com.arr2Clone(com.value.p).reverse();
com.value.Z = com.arr2Clone(com.value.z).reverse();

/**
 * Properties of each piece
 */
com.args = {
	'c':{text:"车", img:'r_c', my:1 ,bl:"c", value:com.value.c},
	'm':{text:"马", img:'r_m', my:1 ,bl:"m", value:com.value.m},
	'x':{text:"相", img:'r_x', my:1 ,bl:"x", value:com.value.x},
	's':{text:"仕", img:'r_s', my:1 ,bl:"s", value:com.value.s},
	'j':{text:"将", img:'r_j', my:1 ,bl:"j", value:com.value.j},
	'p':{text:"炮", img:'r_p', my:1 ,bl:"p", value:com.value.p},
	'z':{text:"兵", img:'r_z', my:1 ,bl:"z", value:com.value.z},
	
	'C':{text:"車", img:'b_c', my:-1 ,bl:"c", value:com.value.C},
	'M':{text:"馬", img:'b_m', my:-1 ,bl:"m", value:com.value.M},
	'X':{text:"象", img:'b_x', my:-1 ,bl:"x", value:com.value.X},
	'S':{text:"士", img:'b_s', my:-1 ,bl:"s", value:com.value.S},
	'J':{text:"帅", img:'b_j', my:-1 ,bl:"j", value:com.value.J},
	'P':{text:"炮", img:'b_p', my:-1 ,bl:"p", value:com.value.P},
	'Z':{text:"卒", img:'b_z', my:-1 ,bl:"z", value:com.value.Z}
};
//#endregion

com.class = com.class || {}
com.class.Man = function (key, x, y) { // key = piece in map 
	this.pater = key.slice(0, 1); // get first char of piece - identifier
	var o = com.args[this.pater]; // properties of this type of piece
	// set properties of this piece
	this.x = x || 0;
	this.y = y || 0;
	this.key = key;
	this.my = o.my;
	this.text = o.text;
	this.value = o.value;
	this.isShow = true;
	this.alpha = 1;
	this.ps = [];

	this.show = function () {
		if (this.isShow) {
			com.ct.save();
			com.ct.globalAlpha = this.alpha;
			com.ct.drawImage(com[this.pater].img, com.spaceX * this.x + com.pointStartX, com.spaceY * this.y + com.pointStartY);
			com.ct.restore();
		}
	}

	this.bl = function (map) {
		var map = map || play.map
		return com.bylaw[o.bl](this.x, this.y, map, this.my)
	}
}



com.init();

