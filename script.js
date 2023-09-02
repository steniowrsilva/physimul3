canvas = document.querySelector(".canvas");
ctx = canvas.getContext("2d");
let angle = Math.PI/4;
let dangle = Math.PI/180;

function draw(){

    ctx.clearRect(0,0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,200);
    ctx.lineWidth = 3;
    ctx.closePath();
    ctx.stroke();

    ctx.translate(0, 200);
    ctx.rotate(-angle);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,50);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();

    const tolerance = 1e-10; // A small value to consider as close to zero
    const diff = Math.sqrt(2)/2 - Math.cos(angle);
    if (Math.abs(diff) < tolerance) {
        dangle *= -1;
    }
    angle += dangle;

    requestAnimationFrame(draw);
}

draw();

