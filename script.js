var canvasWidth = 700;
var canvasHeight = 400;


var canvas = document.getElementById("canvasForAnimation");
var c = canvas.getContext('2d'); 
canvas.width = canvasWidth;      // x
canvas.height = canvasHeight;    // y

var animationStart = 0;
var showVector = 1;

var r = 10;

var gap = 30;
var axisX = gap;
var axisY = canvasHeight - gap;

// parametry poczatkowe
var t0 = 0;
var x0 = 50;
var y0 = 100;
var v0 = 40;
var alfa = 45 * (Math.PI/180.0);
var dx0 = v0 * Math.cos(alfa);
var dy0 = v0 * Math.sin(alfa);

// parametry zalezne od czasu
var x;
var y;
var dx;
var dy;
var ddx = 0;
var ddy = -10 ; // standard gravity

// motion path
var arrX = [];
var arrY = [];

document.getElementById("x0").value = x0;
document.getElementById("y0").value = y0;
document.getElementById("v0").value = v0;
document.getElementById("alfa").value = 45;

// obliczenia wysokości maksymalnej, zasięgu i czasu spadku + wypisanie ich
function hmax_xk_tk(){
    hmax_text = document.getElementById("hmax");
    xk_text = document.getElementById("xk");
    tk_text = document.getElementById("tk");

    hmax = y0 + ((dy0 * dy0) / (2.0 * -ddy));
    tk = (dy0 + Math.sqrt((dy0 * dy0) + (2.0 * -ddy * y0))) / -ddy;
    xk = x0 + dx0 * tk;
   

    hmax = Math.round(100 * hmax) / 100.0;
    xk = Math.round(100 * xk) / 100.0;
    tk = Math.round(100 * tk) / 100.0;

    hmax_text.innerHTML = "Wysokość maksymalna = "+hmax+"m";
    xk_text.innerHTML = "Zasięg = "+xk+"m";
    tk_text.innerHTML = "Czas spadku = "+tk+"s";

    return tk;
}

var tk = hmax_xk_tk();

// x, y - względem osi
// funkcje do zamiany x, y na względem canvas
function xToCanvas(x){
    return (x + gap);
}
function yToCanvas(y){
    return (canvasHeight - (y + gap));
}

function drawCircle(){
    c.beginPath();
    c.strokeStyle = "#000";
    c.fillStyle = "#000";
    c.arc(xToCanvas(x),yToCanvas(y), r, 0, 2*Math.PI);
    c.fill();
    c.stroke();
}

function drawVector(){
    
    var l = 60; // length of arrow
    var headlen = 10; // length of head
    var lx = l * Math.cos(alfa);
    var ly = l * Math.sin(alfa);
    var fromx = xToCanvas(x0);
    var fromy = yToCanvas(y0);
    var tox = fromx + lx;
    var toy = fromy - ly;
    var angle = Math.atan2(toy - fromy, tox - fromx);

    // vector
    c.beginPath();
    c.strokeStyle = "#00F";

    c.moveTo(fromx, fromy);
    c.lineTo(tox, toy);
    c.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    c.moveTo(tox, toy);
    c.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    c.stroke();

    // angle
    c.beginPath();
    c.arc(xToCanvas(x0),yToCanvas(y0), l/2, 2*Math.PI - alfa, 0);
    c.strokeStyle = "#0F0";
    c.stroke();
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

    // X
    c.moveTo(axisX - 5,axisY);
    c.lineTo(canvasWidth - 50,axisY);
        // arrow
    c.lineTo(canvasWidth - 60,axisY - 10);
    c.moveTo(canvasWidth - 50,axisY);
    c.lineTo(canvasWidth - 60, axisY + 10);

    c.fillText("x[m]", canvasWidth - 45, axisY + 5);

    // Y
    c.moveTo(axisX, canvasHeight - 25);
    c.lineTo(axisX, 50);
        // arrow
    c.lineTo(axisX - 10, 60);
    c.moveTo(axisX, 50);
    c.lineTo(axisX + 10, 60);

    c.fillText("y[m]", axisX - 15, 35);

    c.stroke();

    // labels
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

    // motion path
    if(arrX.length > 1){
        c.beginPath();
        c.strokeStyle = "#284B63";
        c.moveTo(xToCanvas(arrX[0]),yToCanvas(arrY[0]));
        for(var i=1; i<arrX.length; i++){
            c.lineTo(xToCanvas(arrX[i]),yToCanvas(arrY[i]));
        }
        c.stroke();
    }

    drawCircle();

    if(showVector == 1)
        drawVector();

}

function setData(){
    x = x0;
    y = y0;
    dx = dx0;
    dy = dy0;
    
    arrX = [];
    arrY = [];
}


function changeData(){
    form_x0 = document.getElementById("x0");
    form_y0 = document.getElementById("y0");
    form_v0 = document.getElementById("v0");
    form_alfa = document.getElementById("alfa");

    x0_form = parseFloat(form_x0.value);
    h = parseFloat(form_y0.value);
    v = parseFloat(form_v0.value);
    a = parseFloat(form_alfa.value);

    // data validation
    if(x0_form < 0)     form_x0.value = 0;
    else if(x0_form > 600)   form_x0.value = 600;
    
    if(h < 0)   form_y0.value = 0;
    else if(h > 400) form_y0.value = 400;
    
    if(v < 0)   form_v0.value = 0;
    else if(v > 70)  form_v0.value = 70;
    
    if(a < 0 && a > -360)   form_alfa.value = 360 + a;
    else if(a < 0)   form_alfa.value = 0;
    else if(a > 360) form_alfa.value = 360;

    x0_form = parseFloat(form_x0.value);
    h = parseFloat(form_y0.value);
    v = parseFloat(form_v0.value);
    a = parseFloat(form_alfa.value);

    x0 = x0_form;
    y0 = h;
    alfa = a * (Math.PI/180.0);  // to radian
    dx0 = v * Math.cos(alfa);
    dy0 = v * Math.sin(alfa);

    setData();
    tk = hmax_xk_tk();
}

// zmiana danych po wpisaniu w arkusz
var animationData = document.getElementsByClassName("animationData");
for(var i=0; i<animationData.length; i++){
    animationData[i].addEventListener("change",
    function() {
        changeData();
        clearCanvas();
    });
}

// funkcja animująca rzut
function animate(){
    if(animationStart == 1)
        requestAnimationFrame(animate);

    var time = new Date();
    var t = (time.getTime() - t0) / 1000.0;

    clearCanvas();

    arrX.push(x);
    arrY.push(y);

    x = x0 + (dx * t) + ((ddx * t * t) / 2.0);
    y = y0 + (dy * t) + ((ddy * t * t) / 2.0);

    console.log("t = "+t+" x = "+x+" y = "+y);

    if(y <= 0 && Math.round(t) == Math.round(tk) )    // lepszy warunek t == tk;
        animationStart = 0;

}

// obsługa przycisków
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
    clearCanvas();
}

function showVectorFun(){
    button = document.getElementById("showVectorButton");
    if(showVector == 0){
        showVector = 1;
        button.textContent = 'Ukryj wektor';
    }   
    else{
        showVector = 0;
        button.textContent = 'Pokaż wektor';
    }
    clearCanvas();
}


// wywolania
setData();
clearCanvas();

// sticky nav
var nav = document.getElementsByTagName("nav");
var sticky = nav[0].offsetTop;

window.onscroll = function(){
    if(window.pageYOffset >= sticky)
        nav[0].classList.add("sticky");
    else
        nav[0].classList.remove("sticky");
};

function goTo(id){
    // window.location.href="#"+id;
    document.getElementById(id).scrollTop = -300;
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// allThrows display none, block;
function selectThrow(n){
    t1 = document.getElementById("rzutPionowySpadekSwobodnyInfo");
    t2 = document.getElementById("rzutPionowyGoraInfo");
    t3 = document.getElementById("rzutPionowyDolInfo");
    t4 = document.getElementById("rzutPoziomyInfo");
    t5 = document.getElementById("rzutUkosnyInfo");

    t1_choose = document.getElementsByClassName("rzutPionowySpadekSwobodny");
    t2_choose = document.getElementsByClassName("rzutPionowyGora");
    t3_choose = document.getElementsByClassName("rzutPionowyDol");
    t4_choose = document.getElementsByClassName("rzutPoziomy");
    t5_choose = document.getElementsByClassName("rzutUkosny");

    t1.style.display = "none";
    t2.style.display = "none";
    t3.style.display = "none";
    t4.style.display = "none";
    t5.style.display = "none";

    for(var i=0; i<t1_choose.length; i++){
        t1_choose[i].style.color = "#fff";
        t2_choose[i].style.color = "#fff";
        t3_choose[i].style.color = "#fff";
        t4_choose[i].style.color = "#fff";
        t5_choose[i].style.color = "#fff";
    }

    switch(n){
        case 1:
            t1.style.display = "block";
            for(var i=0; i<t1_choose.length; i++)
                t1_choose[i].style.color = "#000";
            break;
        case 2:
            t2.style.display = "block";
            for(var i=0; i<t1_choose.length; i++)
                t2_choose[i].style.color = "#000";
            break;
        case 3:
            t3.style.display = "block";
            for(var i=0; i<t1_choose.length; i++)
                t3_choose[i].style.color = "#000";
            break;
        case 4:
            t4.style.display = "block";
            for(var i=0; i<t1_choose.length; i++)
                t4_choose[i].style.color = "#000";
            break;
        case 5:
            t5.style.display = "block";
            for(var i=0; i<t1_choose.length; i++)
                t5_choose[i].style.color = "#000";
            break;
    }
}