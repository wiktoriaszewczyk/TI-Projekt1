var canvasWidth = 700;
var canvasHeight = 400;


var canvas = document.getElementById("canvasForAnimation");
var c = canvas.getContext('2d'); 
canvas.width = canvasWidth;      // x
canvas.height = canvasHeight;    // y

var animationStart = 0;

var r = 10;

var gap = 30;
var axisX = gap;
var axisY = canvasHeight - gap;

// parametry poczatkowe
var t0 = 0;
var x0 = 50;
var y0 = 100;
var v0 = 40;
var alfa = 45;
var dx0 = v0 * Math.cos(alfa);
var dy0 = v0 * Math.sin(alfa);

// parametry zalezne od czasu
var x;
var y;
var dx;
var dy;
var ddx = 0;
var ddy = -10 ; // przyspieszenie ziemskie

// tor lotu
var arrX = [];
var arrY = [];

document.getElementById("x0").value = x0;
document.getElementById("y0").value = y0;
document.getElementById("v0").value = v0;
document.getElementById("alfa").value = alfa;

// x, y - względem osi
// funkcje do zamiany x, y na względem canvas
function xToCanvas(x){
    return (x + gap);
}
function yToCanvas(y){
    return (canvasHeight - (y + gap));
}

function clearCanvas(){
    c.clearRect(0,0,canvasWidth,canvasHeight);
    // rysowanie osi
    c.beginPath(); 
    c.strokeStyle = "#AAA";
    for(var i=50; i < (canvasWidth - 50); i+=50){
        c.moveTo(axisX + i, 50);
        c.lineTo(axisX + i, axisY);
    }

    for(var i=50; i < (canvasHeight - 50); i+=50){
        c.moveTo(gap, axisY - i);
        c.lineTo(canvasWidth - 50, axisY - i);
    }

    c.stroke();

    c.beginPath();
    c.strokeStyle = "#000";
    c.font = "20px Arial";

    // osX
    c.moveTo(axisX - 5,axisY);
    c.lineTo(canvasWidth - 50,axisY);
        // strzalka
    c.lineTo(canvasWidth - 60,axisY - 10);
    c.moveTo(canvasWidth - 50,axisY);
    c.lineTo(canvasWidth - 60, axisY + 10);

    c.fillText("x", canvasWidth - 35, axisY + 5);

    //osY
    c.moveTo(axisX, canvasHeight - 25);
    c.lineTo(axisX, 50);
        // strzalka
    c.lineTo(axisX - 10, 60);
    c.moveTo(axisX, 50);
    c.lineTo(axisX + 10, 60);

    c.fillText("y", axisX - 5, 35);

    c.stroke();

    // zanczniki
    c.beginPath();
    c.strokeStyle = "#000";
    c.font = "10px Arial";

    for(var i=50; i < (canvasWidth - 50); i+=50){
        c.moveTo(axisX + i, axisY - 5);
        c.lineTo(axisX + i, axisY + 5);
        c.fillText(i,axisX + i - 5, axisY + 20);
    }   c.fillText(0,axisX + 0 - 5, axisY + 20);

    for(var i=50; i < (canvasHeight - 50); i+=50){
        c.moveTo(gap - 5, axisY - i);
        c.lineTo(gap + 5, axisY - i);
        c.fillText(i,gap + 5 - 30, axisY - i + 5);
    }   c.fillText(0,gap + 5 - 30, axisY - 0 + 5);
    c.fillText

    c.stroke();

    // tor lotu
    if(arrX.length > 1){
        c.beginPath();
        c.strokeStyle = "#F0F";
        c.moveTo(xToCanvas(arrX[0]),yToCanvas(arrY[0]));
        for(var i=1; i<arrX.length; i++){
            c.lineTo(xToCanvas(arrX[i]),yToCanvas(arrY[i]));
        }
        c.stroke();
    }

}

function drawCircle(){
    clearCanvas();
    c.beginPath();
    c.strokeStyle = "#000";
    c.fillStyle = "#000";
    c.arc(xToCanvas(x),yToCanvas(y), r, 0, 2*Math.PI);
    c.fill();
    c.stroke();
    // console.log("drawCircle "+x+" "+y);
}

// function drawVectorv0()

function setData(){
    x = x0;
    y = y0;
    dx = dx0;
    dy = dy0;
    
    arrX = [];
    arrY = [];
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
        requestAnimationFrame(animate);

    var time = new Date();
    var t = (time.getTime() - t0) / 1000.0;

    clearCanvas();
    drawCircle();

    arrX.push(x);
    arrY.push(y);

    x = x0 + (dx * t) + ((ddx * t * t) / 2.0);
    y = y0 + (dy * t) + ((ddy * t * t) / 2.0);

    console.log("t = "+t+" x = "+x+" y = "+y);

    if(y-r <= 0)    // lepszy warunek t == tk;
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


// wywolania
setData();
clearCanvas();
drawCircle();
//drawVectorv0()


// rectangle
// c.fillRect(0,0,60,60);

// line
// c.beginPath(); 
// c.moveTo(10,10);
// c.lineTo(10,canvasHeight - 10);
// c.lineTo(canvasWidth - 10,canvasHeight - 10);
// c.strokeStyle = "#000";
// c.stroke();
