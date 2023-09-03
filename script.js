canvas = document.querySelector(".canvas");
ctx = canvas.getContext("2d");
let angle = Math.PI/4;
let dangle = (Math.PI/180);
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

    ctx.beginPath();
    ctx.moveTo(0,50);
    ctx.lineTo(canvas.width, 50);
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "30px Arial";
    ctx.fillText("Forças que atuam num balde com água preso a uma corda girando",0,30);

    ctx.font = "27px Arial";
    ctx.fillStyle = 'green';
    ctx.fillText("Pr ", 10, 80);
    ctx.fillStyle = 'red';
    ctx.fillText("P ", 10, 105);
    ctx.fillStyle = 'purple';
    ctx.fillText("Fc ", 10, 130);
    ctx.fillStyle = 'red';
    ctx.fillText("T ", 10, 155);

    ctx.fillStyle = 'black';
    ctx.fillText(": Componente radial da força peso", 45, 80);
    ctx.fillText(": Força peso", 45, 105);
    ctx.fillText(": Força centrípeta", 45, 130);
    ctx.fillText(": Tensão na corda", 45, 155);

    ctx.fillText("Fc = T + Pr", 10, 185);
    ctx.fillText("Fc = mv²/R", 10, 210);
    ctx.fillText("Pr = mgcosθ", 10, 235);

    ctx.font = "27px Arial";
    ctx.fillText("θ: menor ângulo entre P e T", 560, 80);
    ctx.fillText("R: raio da trajetória", 650, 105);
    ctx.fillText("g: acel. da gravidade", 650, 130);
    ctx.fillText("v: velocidade", 700, 155);
    ctx.fillText("m: massa ", 700, 180);

    ctx.save();

    //string
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,350-bucket.height-bucket.topR);
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 10;
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
    //centripetal force's label
    ctx.translate(-30, 350-centripetalForce.length-25)
    // ctx.rotate(-angle);
    ctx.font = "30px Arial";
    ctx.fillStyle = 'purple';
    ctx.fillText("→",-15, -5);
    ctx.fillText("Fc",-10, 15);
    ctx.restore();

//----------------------------------------------------
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

    //weight's label
    ctx.fillStyle = 'blue';
    ctx.font = "30px Arial";
    ctx.fillText("→", -5,weight.length+15);
    ctx.fillText("P", 0,weight.length+35);

    //weight radial component's head
    ctx.fillStyle = 'green';
    ctx.fillText("→", -65,weight.length+5);
    ctx.fillText("Pr", -60,weight.length+25);

    ctx.save();
    let dashedLineLength = weight.length*Math.cos(Math.PI/2-angle);
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(0,weight.length);
    ctx.lineTo(dashedLineLength*Math.cos(-Math.PI+angle), weight.length +dashedLineLength*Math.sin(-Math.PI+angle));
    ctx.stroke();
    ctx.restore();

    ctx.restore();
//-------------------------------------------------------

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

    //tension
    const tension = vector(centripetalForce.length - weightRadial.length,0,0);
    ctx.beginPath();
    ctx.moveTo(0,350);
    ctx.lineTo(0, 350-tension.length);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    //tension's head
    ctx.beginPath();
    ctx.moveTo(0, 350-tension.length);
    ctx.lineTo(20*Math.cos(Math.PI/2-Math.PI/6), 350-tension.length+20*Math.sin(Math.PI/2-Math.PI/6));
    ctx.moveTo(0, 350-tension.length);
    ctx.lineTo(20*Math.cos(Math.PI/2+Math.PI/6), 350-tension.length+20*Math.sin(Math.PI/2+Math.PI/6));
    ctx.stroke();

    //tension force's label
    ctx.fillStyle = 'red';
    ctx.font = "30px Arial";
    ctx.fillText("→", 15, 150);
    ctx.fillText("T", 20, 170);

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

