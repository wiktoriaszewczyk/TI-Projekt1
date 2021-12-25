var canvasWidth = 700;
var canvasHeight = 400;

var canvas = document.getElementById("canvasForAnimation");
var c = canvas.getContext('2d'); 

canvas.width = canvasWidth;     // x
canvas.height = canvasHeight;    // y

var animationStart = 0;

// rectangle
// c.fillRect(0,0,60,60);

// line
// c.beginPath(); 
// c.moveTo(10,10);
// c.lineTo(10,canvasHeight - 10);
// c.lineTo(canvasWidth - 10,canvasHeight - 10);
// c.strokeStyle = "#000";
// c.stroke();



// console.log(canvas);


function Circle(x,y,r,dx,dy){

    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;

    this.draw = function(){
        if(this.x < this.r)   this.x = this.r;
        if(this.y < this.r)   this.y = this.r;
        if(this.x > canvasWidth - this.r) this.x = canvasWidth - this.r;
        if(this.y > canvasHeight - this.r) this.y = canvasHeight - this.r;

        c.beginPath();
        c.arc(this.x,this.y,this.r,0,2*Math.PI);
        c.fill();
        c.stroke();
    }

    this.update = function(){
        if(this.x == canvasWidth - this.r || this.x == this.r)
            this.dx = -this.dx;

        if(this.y == canvasHeight - this.r || this.y == this.r)
            this.dy = -this.dy;

        
        this.x += this.dx;
        this.y += this.dy;
    }
}

var x = 10;
var y = 100;
var r = 20;
var dx = 2; // velocity
var dy = 1;

var circle = new Circle(x,y,r,dx,dy);

function animate(){
    if(animationStart == 1)
        requestAnimationFrame(animate);
    c.clearRect(0,0,canvasWidth,canvasHeight);

    circle.draw();

    circle.update();

    // c.beginPath();
    // c.arc(x,y,r,0,2*Math.PI);
    // c.fill();
    // c.stroke();
    // if(x == canvasWidth - r || x == r)
    //     dx = -dx;

    // if(y == canvasHeight - r || y == r)
    //     dy = -dy;

    
    // x += dx;
    // y += dy;
    

}

function startAnimation(){
    if(animationStart == 0){
        animationStart = 1;
        animate();
    }
}

function stopAnimation(){
    animationStart = 0;
}