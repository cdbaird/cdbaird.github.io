window.onload=function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");
	document.addEventListener("keydown", keyPush);
	setInterval(game, 1000/15);
}
px=py=10;
xv=yv=0;
gs=tc=20;
ax=ay=15;
function game() {
	px+=xv;
	py+=yv;
	if(px<0){
		px = tc-1;
	}
	if(px>tc-1){
		px=0;
	}
	if(py<0){
		py = tc-1;
	}
	if(py>tc-1){
		py=0;
	}
	ctx.fillstyle="black";
	ctx.fillRect(0,0,canv.width, canv.height);

	ctx.fillstyle="red";
	ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2)
}
function keyPush(evt) {
	switch(evt.keyCode) {
		case 37:
			xv=-1;yv=0;
			break;
		case 38:
			xv=;yv=-1;
			break;
		case 39:
			xv=1;yv=0;
			break;
		case 40:
			xv=0;yv=1;
			break;
	}
}