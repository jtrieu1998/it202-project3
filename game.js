let c = document.querySelector("#canvas");
let ctx = c.getContext("2d");
let gameOver = true;
let lives = 3;
let score = 0;
let height = 480;
let width = 512;
let moveSpeed = 2;
let pointThresh = 15;
let playerSize = 30;
let min = width;
let max = width + 700;

let goodBall_img = new Image();
goodBall_img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/University_of_Illinois_at_Chicago_circle_logo.svg/2000px-University_of_Illinois_at_Chicago_circle_logo.svg.png';
// let upMove = false;
// let downMove = false;

//define different objects
let player = {
    size: playerSize,
    x: 0,
    y: (height - playerSize)/2,
    color: "black"
}

let generalBall = {
    x:width,
    y:Math.random() * height, 
    radius:10
};

let goodBall = {
    x:[],
    y:[]
};
let goodCount = 8;

let badBall = {
    x:[],
    y:[]
};
let badCount = 20;

function drawPlayer() {
	ctx.beginPath();
	ctx.rect(player.x, player.y, player.size, player.size);
	ctx.fillStyle = player.color;
	ctx.fill();
	ctx.closePath();
}

function generateBalls(){
    for(let i = 0; i < goodCount; i++){
        goodBall.x.push(Math.random() * (max - min) + min);
        goodBall.y.push(Math.random() * height);
    }
    
    for(let i = 0; i < badCount; i++){
        badBall.x.push(Math.random() * (max - min) + min);
        badBall.y.push(Math.random*height);
    }
}

function drawBalls(){
    for(let i = 0; i < badCount; i++){
		ctx.beginPath();
		ctx.arc(badBall.x[i], badBall.y[i], generalBall.radius, 0, Math.PI * 2);
		ctx.fillStyle = "#D50032";
		ctx.fill();
		ctx.closePath();
	}
    
    for(let i = 0; i < goodCount; i++){
		ctx.beginPath();
		ctx.arc(goodBall.x[i], goodBall.y[i], generalBall.radius, 0, Math.PI * 2);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();
	}
}

function updateBalls(){
    
    for(let i = 0; i < badCount; i++){
        if(player.x < badBall.x[i] + generalBall.radius && player.x + playerSize + generalBall.radius > badBall.x[i] 
           && player.y < badBall.y[i] + generalBall.radius && player.y + playerSize > badBall.y[i]){
            lives--;
            console.log("Touched the bad balls :(");
            badBall.x[i] = Math.random() * (max - min) + min;
            badBall.y[i] = Math.random() * height;
        }
        
        if (badBall.x[i] < 0) {
            badBall.x[i] = Math.random() * (max - min) + min;
            badBall.y[i] = Math.random() * height;
        } else {
            badBall.x[i] -= moveSpeed;
        }
	}
    
    for(let i = 0; i < goodCount; i++){
        //player collision
        if(player.x < goodBall.x[i] + generalBall.radius && player.x + playerSize + generalBall.radius > goodBall.x[i] 
           && player.y < goodBall.y[i] + generalBall.radius && player.y + playerSize > goodBall.y[i]){
            score++;
            console.log("Touched the good balls :)");
            goodBall.x[i] = Math.random() * (max - min) + min;
            goodBall.y[i] = Math.random() * height;
        }
        
        //for when the ball touches the bottom
		if (goodBall.x[i] < 0) {
            goodBall.x[i] = Math.random() * (max - min) + min;
            goodBall.y[i] = Math.random() * height;
        } else {
            goodBall.x[i] -= moveSpeed;
        }
	}
}
//Event Listeners
document.addEventListener("keydown", keyDown);

function keyDown(event){
    switch(event.keyCode){
        case 38:
            if(player.y > 0){
                player.y -= 7;
            }
            break;
        case 40:
            if(player.y < height - playerSize){
                player.y += 7;
            }
            break;
        case 32:
            if(gameOver){
                //reset all game variables and begin again
                gameOver = !gameOver;
                score = 0;
                lives = 3;
                moveSpeed = 2;
                pointThresh = 15;
                goodBall.x = [];
                goodBall.y = [];
                badBall.x = [];
                badBall.y = [];
                generateBalls();
            }
    }
}
generateBalls();
const draw = () => {
    // clear
    ctx.clearRect (0,0, c.width, c.height);
    if(!gameOver){
        drawPlayer();
        drawBalls();
        updateBalls();
        
        if(score >= pointThresh){
            pointThresh += 15;
            moveSpeed+=2;
        }
        
        if(lives < 1){
            gameOver = !gameOver;
        }
        
        //lives
        ctx.fillStyle = "#001E62";
        ctx.font = "20px 'Roboto', sans-serif";
        ctx.fillText("Lives: " + lives, width - 75,25)

        //score
        ctx.fillStyle = "001E62";
        ctx.font = "20px 'Roboto', sans-serif";
        ctx.fillText("Score: " + score, width - 100, 470);
        
    } else {
        ctx.fillStyle = "#001E62";
		ctx.font = "Roboto 30px sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("Game Over :(", width/2, 175);
		
		ctx.font = "20px 'Roboto', sans-serif";
		ctx.fillText("Press Space to Begin", width/2, 285);
		
		ctx.fillText("FINAL SCORE: " + score, width/2, 230);
    }
    // repeat
    window.requestAnimationFrame(draw);
}





draw();
