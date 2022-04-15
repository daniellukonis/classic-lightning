console.log('connected');

const canvas = document.querySelector('#canvasArc');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;
const radius = (width < height) ? width/2:height/2; 

function randomInt(min,max){
    return Math.floor(Math.random()*max)+min;
};

function randomDirection(){
    const d = Math.random();
    (d >= 0.5) ? r = 1 : r = -1;
    return r;
};

function resizeCanvas(canvasID){
    canvasID.width = width;
    canvasID.height = height;
};

function fillCanvas(contextID){
    contextID.fillRect(0,0,window.innerWidth,innerHeight);
};

function drawRandomArc(x,y){
    context.fillStyle = '#000';
    context.globalCompositeOperation = 'destination-out';
    context.save();
    context.beginPath();
    context.arc(x,y,randomInt(1,3),0,Math.PI*2);
    context.fill()
    context.restore();
};

function drawBulb(startAngle){
    context.lineWidth = 4;
    context.beginPath();
    context.arc(0,0,radius-4,startAngle-0.15,startAngle+0.15);
    context.stroke();
};

function moveArc(v){
    context.save();
    context.translate(window.innerWidth / 2, window.innerHeight / 2);
    context.rotate(randomInt(0,7));
    let x = 0;
    let y = 0;
    for(let i=0; i<=radius-10; i++){
        let d = randomDirection();
        for(let j=0; j<v; j++){
            x += d;
            drawRandomArc(x,i);
            y = i;
        }
    }
    let angle = Math.abs(Math.atan(y/x));
    drawBulb(angle);
    context.restore();    
};

function animate(){
        fillCanvas(context)
    for(let i=0; i<2; i++){
        moveArc(2);
    }
    window.requestAnimationFrame(animate);
};

window.addEventListener('resize', ()=>{
    location.reload()
})

resizeCanvas(canvas);
fillCanvas(context);
animate();

