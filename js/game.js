window.onload=function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");
	document.addEventListener("keydown", keyPush);
}

var speed = 15; 
var timer = setInterval(game, 1000/speed);

px=py=10;		// Starting position
yv=0;			// Starting velocity Y
xv=-1;			// X
gs=25;			// Size of each grid cell in pixels
tc=25;			// Number of grid cells in canvas (canvas size 625x625 (gs*tc x gs*tc))
ax=ay=15;		// Apple starting position
trail = [];		// Array of tail element positions
tail = 5;		// length of tail
pause = false;
hiscore = 0;
topbar = 100;	// Width of topbar in pixels

function game() {
	if(pause==false) {
		px+=xv;
		py+=yv;
	
		if(px<0){ // Periodic boundaries
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

		ctx.fillStyle="white";
		ctx.font = "30px Monaco";
		ctx.fillText("Score: " + (tail-5),20,55);

		ctx.fillStyle="white";
		ctx.font = "30px Monaco";
		ctx.fillText("HiScore: " + hiscore,350,55);

		ctx.fillStyle="white";
		ctx.fillRect(0,topbar-10,canv.width, 10);

		ctx.fillStyle="red";
		ctx.fillRect(ax*gs, ay*gs+topbar, gs-2, gs-2);

		ctx.fillStyle="lime";
		for(var i=0; i<trail.length; i++) {
			ctx.fillRect(trail[i].x*gs, trail[i].y*gs+topbar, gs-2, gs-2);
			
			if(trail[i].x == px && trail[i].y == py) { // Did we crash?
				tail = 5; // Reset initial conditions
				px=py=10;
				
				speed = 15;
				clearInterval(timer);
				timer = setInterval(game, 1000/speed);

			}
		}
		trail.push({x:px, y:py});
		while(trail.length > tail) {
			trail.shift();
		}
		if(px == ax && py == ay) { // Did we get an apple?
			tail++;
			ax = Math.floor(Math.random()*tc);
			ay = Math.floor(Math.random()*tc);
			speed++;
			if((tail-5) > hiscore){
				hiscore = (tail-5);
			}
			clearInterval(timer); 
			timer = setInterval(game, 1000/speed); // Adjust speed
			
		}
	}
	else {
		ctx.fillStyle="white";
		ctx.font = "80px Monaco";
		ctx.fillText("PAUSED",canv.width/2-140,canv.height/2+40);
	}
}
function keyPush(evt) {
	k = evt.keyCode;

	if(k==37 || k==65) { // Left Arrow
		if(xv != 1) {
			xv = -1;
			yv = 0;
		}
	}
	if(k==38 || k==87) { // Up Arrow
		if(yv != 1) {
			xv = 0;
			yv = -1;
		}
	}
	if(k==39 || k==68) { // Right Arrow
		if(xv != -1) {
			xv = 1;
			yv = 0;
		}
	}
	if(k==40 || k==83) { // Down Arrow
		if(yv != -1) {
			xv = 0;
			yv = 1;
		}
	}
	if(k==32) { // Spacebar
		pause = !pause;
	}
}