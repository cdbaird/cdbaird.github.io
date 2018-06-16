window.onload=function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");
	document.addEventListener("keydown", keyPush);
}

var speed = 15;

var timer = setInterval(game, 1000/speed);

px=py=10;
xv=yv=0;
gs=tc=25;
ax=ay=15;
trail = [];
tail = 5;
pause = false;

function game() {
	if(pause==false) {
		px+=xv;
		py+=yv;
	
		if(px<0){
			px = tc-1;
		}
		if(px>tc-1){
			px = 0;
		}
		if(py<0){
			py = tc-1;
		}
		if(py>tc-1){
			py = 0;
		}
		ctx.fillStyle="black";
		ctx.fillRect(0,0,canv.width, canv.height);

		ctx.fillStyle="red";
		ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2);

		ctx.fillStyle="lime";
		for(var i=0; i<trail.length; i++) {
			ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs-2, gs-2);
			if(trail[i].x == px && trail[i].y == py) {
				tail = 5;
				speed = 15;
				clearInterval(timer);
				timer = setInterval(game, 1000/speed);

			}
		}
		trail.push({x:px, y:py});
		while(trail.length > tail) {
			trail.shift();
		}
		if(px == ax && py == ay) {
			tail++;
			ax = Math.floor(Math.random()*tc);
			ay = Math.floor(Math.random()*tc);
			speed++;
			clearInterval(timer);
			timer = setInterval(game, 1000/speed);
			
		}
	}
}
function keyPush(evt) {
	k = evt.keyCode;

	if(k==37) { // Left Arrow
		if(xv != 1) {
			xv = -1;
			yv = 0;
		}
	}
	if(k==38) { // Up Arrow
		if(yv != 1) {
			xv = 0;
			yv = -1;
		}
	}
	if(k==39) { // Right Arrow
		if(xv != -1) {
			xv = 1;
			yv = 0;
		}
	}
	if(k==40) { // Down Arrow
		if(yv != -1) {
			xv = 0;
			yv = 1;
		}
	}
	if(k==32) { // Spacebar
		pause = !pause;
	}
	// switch(evt.keyCode) {
	// 	case 37:
	// 		xv=-1;yv=0;
	// 		break;
	// 	case 38:
	// 		xv=0;yv=-1;
	// 		break;
	// 	case 39:
	// 		xv=1;yv=0;
	// 		break;
	// 	case 40:
	// 		xv=0;yv=1;
	// 		break;
	// 	case 32:
	// 		pause = !pause;
	// 		break;
	// }
}