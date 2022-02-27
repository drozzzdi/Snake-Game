const canvas=document.querySelector('canvas');
const pointsCounter=document.getElementById('points');
const ctx=canvas.getContext('2d');

canvas.width=700;
canvas.height=500;
const cw=canvas.width;
const ch=canvas.height;

const snakeWidth=20;
let snakeX=100;
let snakeY=80;
let snakeCenterX=0;
let snakeCenterY=0;
let snakeSpeedX=1;
let snakeSpeedY=0;
let snakeBody=[];

const appleSize=20;
let apple1X=400;
let apple1Y=200;
let apple2X=600;
let apple2Y=400;
let points=60;

function gameBoard(){
    ctx.fillStyle='lightgray';
    ctx.fillRect(0,0,cw,ch);
}

function gameOver(){
    points=60;
    snakeX=100;
    snakeY=80;
    apple1X=400;
    apple1Y=200;
    apple2X=600;
    apple2Y=400;
    snakeBody=[];
}

function bodySnakeGame(){

    snakeCenterX=snakeX+snakeWidth/4;
    snakeCenterY=snakeY+snakeWidth/4;
    snakeBody.push({snakeCenterX, snakeCenterY});
    
    if(snakeBody.length>points){
        snakeBody.splice(0,1);
    }
    for(let i=10; i<points; i+=15)
    {
    ctx.fillStyle='#0066FF';
    ctx.fillRect(snakeBody[i].snakeCenterX,snakeBody[i].snakeCenterY,snakeWidth/2,snakeWidth/2);
    }

    if(snakeBody.filter(square=>square.snakeCenterX===snakeBody[snakeBody.length-1].snakeCenterX 
     && square.snakeCenterY===snakeBody[snakeBody.length-2].snakeCenterY ).length>=2){
      gameOver()
    }
}

function snake(){
    ctx.fillStyle='#0066FF';
    ctx.fillRect(snakeX,snakeY,snakeWidth,snakeWidth);
    
    snakeX+=snakeSpeedX;
    snakeY+=snakeSpeedY;
    if(snakeX>cw){
        snakeX=0;
    }
    if(snakeX+snakeWidth<0){
        snakeX=cw;
    }
    if(snakeY>ch){
        snakeY=0;
    }
    if(snakeY+snakeWidth<0){
        snakeY=ch;
    }
}

function apple(){
    ctx.fillStyle='#66CC66';
    ctx.fillRect(apple1X,apple1Y,appleSize,appleSize);
    ctx.fillRect(apple2X,apple2Y,appleSize,appleSize);

    if(snakeX-snakeWidth<=apple1X
    && snakeX+snakeWidth>=apple1X
    && snakeY+snakeWidth>=apple1Y
    && snakeY<=apple1Y+snakeWidth
     )
     {
        points+=60;
        do{
            apple1X= Math.floor((Math.random()*((cw-appleSize*2)-1))+1);
            apple1Y=Math.floor((Math.random()*((ch-appleSize*2)-1))+1);
            }while(snakeBody.filter(square=>square.snakeCenterX-appleSize<=apple1X 
                && square.snakeCenterX+appleSize>=apple1X 
                && square.snakeCenterY+appleSize>=apple1Y
                && square.snakeCenterY<=apple1Y+appleSize).length>0);
    }

    if(snakeX-snakeWidth<=apple2X
        && snakeX+snakeWidth>=apple2X
        && snakeY+snakeWidth>=apple2Y
        && snakeY<=apple2Y+snakeWidth
         )
         {
           points+=60;
           do{
           apple2X= Math.floor((Math.random()*((cw-appleSize*2)-1))+1);
           apple2Y=Math.floor((Math.random()*((ch-appleSize*2)-1))+1);
           }while(snakeBody.filter(square=>square.snakeCenterX-appleSize<=apple2X 
            && square.snakeCenterX+appleSize>=apple2X 
            && square.snakeCenterY+appleSize>=apple2Y
            && square.snakeCenterY<=apple2Y+appleSize).length>0);
       }    
       pointsCounter.textContent=`Eaten apples: ${(points/60)-1}`;
    }

function snakePosition(e){
    switch(e.key){
        case 'ArrowUp':
            if(snakeSpeedY!==1){
            snakeSpeedX=0;
            snakeSpeedY=-1;
            }
            break
        case 'ArrowDown':
            if(snakeSpeedY!==-1){
            snakeSpeedX=0;
            snakeSpeedY=1;
            }
            break
        case 'ArrowLeft':
            if(snakeSpeedX!==1){
            snakeSpeedX=-1;
            snakeSpeedY=0;
            }
            break
        case 'ArrowRight':
            if(snakeSpeedX!==-1){
            snakeSpeedX=1;
            snakeSpeedY=0;
            }
            break
    }
}

window.addEventListener('keyup',snakePosition);

function game(){
    gameBoard();
    snake();
    apple();
    bodySnakeGame();
}

setInterval(game, 1000/60);