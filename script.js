canvas = document.querySelector(".canvas");
ctx = canvas.getContext("2d");
let angle = Math.PI/4;
let dangle = Math.PI/180;
let signal = 1;

function vector (length, tailX, tailY) {
    return {
        length,
        tailX,
        tailY
    }
}

const bucket = {
    height: 100,
    topR: 70,
    bottomR: 40,
}

function draw(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    //string
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,350-bucket.height-bucket.topR);
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 5;
    ctx.stroke();

    //water
    ctx.beginPath();
    ctx.moveTo(bucket.bottomR, 350);
    ctx.lineTo(-bucket.bottomR, 350);
    ctx.lineTo(-bucket.topR, 350-bucket.height);
    ctx.lineTo(bucket.topR, 350-bucket.height);
    ctx.lineTo(bucket.topR, 350-bucket.height);
    ctx.fillStyle = 'aqua';
    ctx.fill();

    //bucket
    ctx.beginPath();
    ctx.moveTo(0,350);
    ctx.lineTo(-bucket.bottomR, 350);
    ctx.lineTo(-bucket.topR, 350-bucket.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,350);
    ctx.lineTo(bucket.bottomR, 350);
    ctx.lineTo(bucket.topR, 350-bucket.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();

    //rim
    ctx.beginPath();
    ctx.arc(0,350-bucket.height, bucket.topR, Math.PI, 2*Math.PI);
    ctx.strokeStyle = 'brown';
    ctx.lineWidth = 5;
    ctx.stroke();

    // bucket's top
    ctx.beginPath();
    ctx.moveTo(-bucket.topR, 350-bucket.height);
    ctx.bezierCurveTo(-bucket.topR+30, 350-bucket.height-20, bucket.topR-30, 350-bucket.height-20, bucket.topR, 350-bucket.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-bucket.topR, 350-bucket.height);
    ctx.bezierCurveTo(-bucket.topR+30, 350-bucket.height+20, bucket.topR-30, 350-bucket.height+20, bucket.topR, 350-bucket.height);
    ctx.stroke();

    //centripetal Force
    const centripetalForce = vector(110, 0, 350);
    ctx.beginPath();
    ctx.moveTo(0,350);
    ctx.lineTo(0, 350-centripetalForce.length);
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 4;
    ctx.stroke();

    //centripetal force's head
    ctx.beginPath();
    ctx.moveTo(0, 350-centripetalForce.length);
    ctx.lineTo(20*Math.cos(Math.PI/2+Math.PI/6), 350-centripetalForce.length+20*Math.sin(Math.PI/2+Math.PI/6));
    ctx.moveTo(0, 350-centripetalForce.length);
    ctx.lineTo(20*Math.cos(Math.PI/2-Math.PI/6), 350-centripetalForce.length+20*Math.sin(Math.PI/2-Math.PI/6));
    ctx.stroke();

    ctx.save();

    //weight
    const weight = vector(90, 0, 0);
    ctx.translate(0,350);
    ctx.rotate(-angle);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,weight.length);
    ctx.strokeStyle = 'blue';
    ctx.closePath();
    ctx.stroke();

    //weight's head
    ctx.beginPath();
    ctx.moveTo(0,weight.length);
    ctx.lineTo(20*Math.cos(-Math.PI/2-Math.PI/6), weight.length+20*Math.sin(-Math.PI/2-Math.PI/6));
    ctx.moveTo(0,weight.length);
    ctx.lineTo(20*Math.cos(-Math.PI/2+Math.PI/6), weight.length+20*Math.sin(-Math.PI/2+Math.PI/6));
    ctx.stroke();

    ctx.restore();

    //weight radial component
    const weightRadial = vector(weight.length*Math.cos(angle),0,0);
    ctx.beginPath();
    ctx.moveTo(0,350);
    ctx.lineTo(0,350+weightRadial.length);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 4;
    ctx.stroke();

    //weight radial component's head
    const tolerance = 1e-10; // A small value to consider as close to zero
    if (Math.abs(Math.cos(angle)) < tolerance) { signal *= -1}
    if (signal>0) {
        ctx.beginPath();
        ctx.moveTo(0,350+weightRadial.length);
        ctx.lineTo(20*Math.cos(-Math.PI/2-Math.PI/6) , 350+weightRadial.length+20*Math.sin(-Math.PI/2-Math.PI/6));
        ctx.lineTo(0,350+weightRadial.length);
        ctx.lineTo(20*Math.cos(-Math.PI/2+Math.PI/6) , 350+weightRadial.length+20*Math.sin(-Math.PI/2+Math.PI/6));
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(0,350+weightRadial.length);
        ctx.lineTo(20*Math.cos(Math.PI/2+Math.PI/6) , 350+weightRadial.length+20*Math.sin(+Math.PI/2+Math.PI/6));
        ctx.lineTo(0,350+weightRadial.length);
        ctx.lineTo(20*Math.cos(Math.PI/2-Math.PI/6) , 350+weightRadial.length+20*Math.sin(Math.PI/2-Math.PI/6));
        ctx.stroke();
    }

    //tesion
    const tesion = vector(centripetalForce.length - weightRadial.length,0,0);
    ctx.beginPath();
    ctx.moveTo(0,350);
    ctx.lineTo(0, 350-tesion.length);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    //tension's head
    ctx.beginPath();
    ctx.moveTo(0, 350-tesion.length);
    ctx.lineTo(20*Math.cos(Math.PI/2-Math.PI/6), 350-tesion.length+20*Math.sin(Math.PI/2-Math.PI/6));
    ctx.moveTo(0, 350-tesion.length);
    ctx.lineTo(20*Math.cos(Math.PI/2+Math.PI/6), 350-tesion.length+20*Math.sin(Math.PI/2+Math.PI/6));
    ctx.stroke();

    ctx.restore();

    //PARA UM FUTURO PÊNDULO OU SIMULAÇÃO SIMILAR
    // const tolerance = 1e-10; // A small value to consider as close to zero
    // const diff = Math.sqrt(2)/2 - Math.cos(angle);
    // if (Math.abs(diff) < tolerance) {
    //     dangle *= -1;
    // }

    angle -= dangle;

    requestAnimationFrame(draw);
}

draw();

