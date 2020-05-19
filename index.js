let Reset=document.querySelector('#reset');
let ChangeRole=document.querySelector('#changeRole');
let ChessA=document.querySelector('#chess');
let Chess=document.querySelector('#chessA');
let canvasA=ChessA.getContext('2d');
let canvas=Chess.getContext('2d');

let gameOver=false;
/*/ Om gameOver /*/

let isp2p=false;
/*/ Om p2p eller p2c /*/
let pOne=[];
let pTwo=[];
/*/Plats som för man och pc att gå till/*/

let isMan=true;
/*/ Om man spel /*/

let chessArr=[];
/*/ Arr som med chess till/*/

let peopleWin=[],
    computerWin=[];
    /* How many chesses for man or pc wins */
let canWin =[];
/*/How many methods for win/*/
let winCount=0;
for (let i = 0; i < 15; i++) {
  canWin[i]=[];
    for (let j = 0; j < 15; j++) {
    canWin[i][j]=[];
    }
}
/*/Hur många man eller pc kan vin/*/

for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 11; j++) {
        /*/ 5st tillsammans/*/
           for(let k= 0;k<5;k++){
                   canWin[i][j+k][winCount] = true;
        }
        winCount++;  
    }
}
       /*/ har man/pc win på horisont
            loop sluta här
           wins[0][0][0] = true;
           wins[0][1][0] = true;
           wins[0][2][0] = true;
           wins[0][3][0] = true;
           wins[0][4][0] = true;/*/

           /*/
           wins[0][1][1] = true;
           wins[0][2][1] = true;
           wins[0][3][1] = true;
           wins[0][4][1] = true;
           wins[0][5][1] = true;/*/
        //  den var första wins på horisont}
        // count++;


for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 15; j++) {
        for (let k = 0; k < 5; k++){
            canWin[i+k][j][winCount]=true;
        }
        winCount++;
    }
}
// har man win på column

for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
             canWin[i+k][j+k][winCount]=true;
        }
        winCount++;
    }
}
// på positv sned

for (let i = 0; i < 11; i++) {
    for (let j = 14; j>3; j--) {
        for (let k = 0; k < 5; k++){ 
            canWin[i+k][j-k][winCount]=true;
        }
        winCount++;
    }
}
//på omvänt skev

console.log(winCount);
//Hur många wins tillsamans//

const drawChessboard=()=>{
    canvas.strokeStyle = "#ccc";//color pen
    for (let i = 0; i < 15; i++) {
        canvasA.moveTo(15 + 30 * i, 15);          //draw vertical line start
        canvasA.lineTo(15 + 30 * i, 435);           //draw vertical line finish
        canvasA.stroke();                              //
        canvasA.moveTo(15,15+30*i);           //draw horizon line start
        canvasA.lineTo(435,15+30*i);          //draw horizon line finish
        canvasA.stroke();
    }
}
//draw chessBoard//
Chess.addEventListener('click',(event)=>{
    let x=Math.floor(event.offsetX/30);
        y=Math.floor(event.offsetY/30);
},false)

const drawChessman=(x,y,temp)=>{
    canvas.beginPath();
    canvas.arc(15+x*30,15+y*30,13,0,300);
    canvas.closePath();
    var gradient = canvas.createRadialGradient(15 + x*30 + 2, 15 + y*30 - 2, 13, 15 + x*30 + 2, 15 + y*30 - 2, 0);
	if(temp){
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	}
	else{
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}	
	canvas.fillStyle = gradient;
	canvas.fill();

}
    /*canvas.fillStyle=temp ? "#fff" : "#000";
    canvas.fill();
    }
//draw chess*/
    
const clearChessman=(x,y)=>{
    canvas.clearRect(x*30,y*30,30,30);
}
//clean the chessMan//

const computerStep=()=>{
       let manScore=[];
       let computerScore=[];
       let maxScore=0;
       let currentX=0;
       let currentY=0;
//start from beginning where score=0, position X/Y =0 //

for(let i=0;i<15;i++){
      manScore[i]=[];
      computerScore[i]=[];
      for(let j=0;j<15;j++){
          manScore[i][j]=0;
          computerScore[i][j]=0;
      }
}
/* Two arr of man/pc win,
anticipation score of the position which man or pc go */
for(let i=0;i<15;i++){
    for(let j=0;j<15;j++){
        //do not put the chess now//
        if(chessArr[i][j]==0){//if this point is available//
            for(let k=0;k<winCount;k++){//All possibilities that can win//
                if(canWin[i][j][k]){//In this situation the player has chess on board
                switch(peopleWin[k]){//Change the different code slot to run
                    case 1:manScore[i][j]+=100;
                    break;
                    case 2:manScore[i][j]+=400;
                    break; 
                    case 3:manScore[i][j]+=800;
                    break;
                    case 4:manScore[i][j]+=1600;
                    break;
                }
                switch(computerWin[k]){
                    case 1:computerScore[i][j]+=200;
                    break;
                    case 2:computerScore[i][j]+=800;
                    break; 
                    case 3:computerScore[i][j]+=1600;
                    break;
                    case 4:computerScore[i][j]+=3200;
                    break;

                }
            }
        }
 /* Here when people plays with computer, and when computer go, it will calculate the points against man, the double
 points of computer means that computer needs to find out the much better position than man, then computer might win */

 if(manScore[i][j]>maxScore){
     maxScore=manScore[i][j];//when man go to somewhere with high points to win
     currentX = i;
     currentY = j;
 }else if(manScore[i][j]==maxScore){//if the value is max
          if(computerScore[i][j]>computerScore[currentX][currentY]){ // only if the value of i and j bigger than X,Y
              currentX=i;
              currentY=j;
          }
 }
 if(computerScore[i][j]>maxScore){//when man go to somewhere with high points to win
    maxScore=computerScore[i][j];
    currentX=i;
    currentY=j;
}else if(computerScore[i][j]==maxScore){//if the value is max
         if(manScore[i][j]>manScore[currentX][currentY]){//However the position of computer works much important than mans position
             currentX=i;
             currentY=j;/*give the best choice to computer to take the position
/* To evaluate if the position is the best position for computer;*/
    }
}
}
}
}
drawChessman(currentX,currentY,false);
//currentComputer=[currentPosition(x,y)]
if(!pTwo[0]){
       pTwo[0]=[];
}
pTwo[0].push([currentX,currentY]);
chessArr[currentX][currentY]=2;
for(let i=0;i<winCount;i++){
    if(canWin[currentX][currentY][i]){
    computerWin[i]++;
    //Man kan inte win//
    peopleWin[i]+=10;
    if(computerWin[i]==5){
        alert('Computer Win:)')
        gameOver=true;
    }
}
}
if(!gameOver){
    isMan=!isMan;
}
}

Chess.addEventListener('click',(even)=>{
    if(gameOver){
        return;
    }
    if(!isp2p){
        if(!isMan){
            return;
        }
    }
    let x = Math.floor(event.offsetX/30),
		y = Math.floor(event.offsetY/30);
    if(chessArr[x][y] == 0){
		drawChessman(x, y, isMan);
		// currentPeople = [x, y];
		//only man to man then give it a value
		if(isp2p && !isMan){
			if(!pTwo[0]){
				pTwo[0] = [];
			}
			pTwo[0].push([x,y]);
		}else{
			if(!pOne[0]){
				pOne[0] = [];
			}
			pOne[0].push([x, y]);
		}
		chessArr[x][y] =  1;
		for(let i = 0; i<winCount; i++){
			if(canWin[x][y][i]){

				if(isp2p && !isMan){
					computerWin[i]++;
					//HOU
					peopleWin[i] += 10;
					if(computerWin[i]==5){
						alert('Opponent win:(')
						gameOver = true;
					}
				}else{
					peopleWin[i]++;
					//computer can not win!
					computerWin[i] += 10;
					if(peopleWin[i]==5){
						alert('You win:)')
						gameOver = true;
					}
				}
			}

		}
		if(!gameOver){
			if(!isp2p){
				computerStep();
			}
			isMan = !isMan;
		}
	}

})
    Reset.addEventListener('click', (event) => {
        canvas.clearRect(0,0,450,450);
        gameOver = false;
        isMan = true;
        for(let i = 0;i<winCount;i++){
            peopleWin[i] = 0;
            computerWin[i] = 0;
        }
        for(let i = 0;i<15;i++){
            chessArr[i] = [];
            for(let j = 0;j<15;j++){
                chessArr[i][j] = 0;
            }
        }
        for(let i = 0; i<2; i++){
            pOne[i] = [];
            pTwo[i] = [];
        }
    })
    //initial the chessboard
    
    ChangeRole.addEventListener('click', (event) => {
        isp2p = !isp2p;
        ChangeRole.innerHTML = isp2p ? "Play to man" : "Play to computer";
        Reset.click();
    });
    /* change roles from p2p to p2c */
    
    (()=>{
        drawChessboard();
        Reset.click();
    })()
    //initialization from a new game//