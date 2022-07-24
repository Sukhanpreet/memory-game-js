let flag=false;
let firstCard, secondCard;
let stop=false;

let moves=0;
let score=0;


// 
let arr=['happy','hungry','music','glasses','sleepy','magic'];
let cardArr=[...arr,...arr];

let gameArea=document.querySelector('#game-area');

for(let i=0;i<cardArr.length;i++){
    let addCard=`<div class="card" data-card="${cardArr[i]}">
                    <img src="img/${cardArr[i]}.jpeg" alt="front-card" class="front" />
                    <img src="img/back.jpeg" alt="back-card" class="back" />
                </div>`;
    gameArea.innerHTML +=addCard;
}


let allCards=document.querySelectorAll('.card');

for(let i=0;i<allCards.length;i++){
    allCards[i].addEventListener('click',flipOpen);
    allCards[i].style.order=Math.floor(Math.random()*12);
}

// 

let resetButton=document.getElementById('reset');
resetButton.addEventListener('click',resetGame);

function flipOpen(){
    if(!stop){
        if(this.classList.contains('flip')){
            // console.log('already fliped');
            return;
        }

        else {
            if(!flag){
                this.classList.add('flip');
                firstCard=this;
                flag=true; 
                moves+=1;
            }
            else{
                this.classList.add('flip');
                secondCard=this;
                flag=false;
                moves+=1;
                matchCards();
            }
        }
        
    }
    else{
        // console.log('third-card');
        return;
    }

   
}

function matchCards(){
    stop= true;
    if(firstCard.dataset.card===secondCard.dataset.card){
        console.log('matched');
        score+=10;
        countScore();
        stop=false;
    } else{
        console.log('not matched');
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            countScore();
            stop=false;
        }, 800);
    }
    
}

function resetGame(){
    for(let i=0;i<allCards.length;i++){
        allCards[i].classList.remove('flip');
        score=0;
        moves=0;
        countScore();
        for(let i=0;i<allCards.length;i++){
            allCards[i].style.order=Math.floor(Math.random()*12);
        }
    }
    // console.log("reset game");
}

function countScore(){
    let scoreDiv=document.querySelector('.score');
    scoreDiv.innerHTML=score;
    setTimeout(()=>{
        if(score===60){
            alert(`you win in ${moves} moves`);
            resetGame();
        }
    },500); 
}


