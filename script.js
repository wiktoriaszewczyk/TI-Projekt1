var canvasWidth = 700;
var canvasHeight = 400;


var canvas = document.getElementById("canvasForAnimation");
var c = canvas.getContext('2d'); 
canvas.width = canvasWidth;      // x
canvas.height = canvasHeight;    // y

var animationStart = 0;

var r = 20;

// parametry poczatkowe
var t0 = 0;
var x0 = 100;
var y0 = 100;
var v0 = 40;
var alfa = 45;
var dx0 = v0 * Math.cos(alfa);
var dy0 = v0 * Math.sin(alfa);

// parametry zalezne od czasu
var x = x0;
var y = y0;
var dx = dx0;
var dy = dy0;
var ddx = 0;
var ddy = -10 ; // przyspieszenie ziemskie

document.getElementById("y0").value = y0;
document.getElementById("v0").value = v0;
document.getElementById("alfa").value = alfa;

function clearCanvas(){
    // rysowanie osi
    c.clearRect(0,0,canvasWidth,canvasHeight);
}

function drawCircle(){
    clearCanvas();
    c.beginPath();
    c.strokeStyle = "#000";
    c.fillStyle = "#000";
    c.arc(x, canvasHeight - y, r, 0, 2*Math.PI);
    c.fill();
    c.stroke();
    // console.log("drawCircle "+x+" "+y);
}

// function drawVectorv0()

drawCircle();
//drawVectorv0()

function setData(){
    x = x0;
    y = y0;
    dx = dx0;
    dy = dy0;
}

function changeData(){
    h = parseFloat(document.getElementById("y0").value);
    v = parseFloat(document.getElementById("v0").value);
    a = parseFloat(document.getElementById("alfa").value);
    y0 = h;
    alfa = a * (Math.PI/180.0);  // zamiana na radiany
    dx0 = v * Math.cos(alfa);
    dy0 = v * Math.sin(alfa);

    setData();
}

// zmiana danych po wpisaniu w arkusz
var animationData = document.getElementsByClassName("animationData");
for(var i=0; i<animationData.length; i++){
    animationData[i].addEventListener("change",
    function() {
        changeData();
        drawCircle();
    });
}

function animate(){
    if(animationStart == 1)
        requestAnimationFrame(animate); //        // setTimeout(() => {requestAnimationFrame(animate)},1000 / fps);  // 1 frame per 0,1s
    
    var time = new Date();
    var t = (time.getTime() - t0) / 1000.0;

    clearCanvas();
    drawCircle();

    // dx = dx0 + ddx * t;
    // dy = dy0 + ddy * t;

    // x = x0 + dx * t;
    // y = y0 + dy * t;

    x = x0 + (dx * t) + ((ddx * t * t) / 2.0);
    y = y0 + (dy * t) + ((ddy * t * t) / 2.0);

    console.log("t = "+t+" x = "+x+" y = "+y+" vy = "+(ddy*t));

    if(y-r <= 0)
        animationStart = 0;

    
}

function startAnimation(){
    setData();
    var time = new Date();
    t0 = time.getTime();
    if(animationStart == 0){
        animationStart = 1;
        animate();
    }
}

function stopAnimation(){
    animationStart = 0;
}

function resetAnimation(){
    stopAnimation();
    setData();
    drawCircle();
}

// rectangle
// c.fillRect(0,0,60,60);

// line
// c.beginPath(); 
// c.moveTo(10,10);
// c.lineTo(10,canvasHeight - 10);
// c.lineTo(canvasWidth - 10,canvasHeight - 10);
// c.strokeStyle = "#000";
// c.stroke();
