let card=document.querySelectorAll(".zone");
cards=[...card];
let container=document.querySelector(".container");
let moves=document.querySelector(".moves");
let movesC=0;
// close icon in modal
let closeicon = document.querySelector(".close");
const stars = document.querySelectorAll(".fa-star");
 let starsList = document.querySelectorAll(".stars li");

// declare modal
let modal = document.getElementById("popup1")
let matchedCard=document.getElementsByClassName("match");




let openedCards=[];
//function for shuffling the cards
const shuffleCards=(array)=>{
  let currentI=array.length,tempV,randomI;
  while(currentI!=0){

    randomI=Math.floor(Math.random()*currentI);
    currentI-=1;
    tempV=array[currentI];
    array[currentI]=array[randomI];
    array[randomI]=tempV;

  }
  return array;
}


const startGame=()=>{
  cards = shuffleCards(cards);
    // remove all exisiting classes from each card
    for (let i = 0; i < cards.length; i++){
        container.innerHTML = "";
        cards.forEach((card)=>{
        container.appendChild(card);
        });
        cards[i].classList.remove("open", "match", "disabled");

    }
    //reseting moves
    movesC = 0;
    moves.innerHTML = movesC;
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }

    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);

}
//startthe game when the docyment loads
document.body.onload=startGame();

const displayCard=(e)=>{
  let card=e.toElement;
    card.classList.toggle("open");
    card.classList.toggle("disabled");

}
const matched=()=>{

  setTimeout(function(){
  openedCards[0].classList.remove("open");
  openedCards[1].classList.remove("open");

  openedCards[0].classList.add("match","disabled");
  openedCards[1].classList.add("match","disabled");


  openedCards=[];
},500);

};
const unmatched=()=>{
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");

  disable();
  setTimeout(function(){
    openedCards[0].classList.remove("open","unmatched");
    openedCards[1].classList.remove("open","unmatched");

    enable()
    openedCards=[];
  },1100);
};

const disable=()=>{
    cards.forEach((card)=>{
        card.classList.add('disabled');
    });
}

const enable=()=>{

    cards.forEach(card=>{
        card.classList.remove('disabled');
        if(matchedCard != null){
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
      }
    });
}


const openCard=(e)=>{

  openedCards.push(e.toElement);
  let opened=openedCards.length;

  if(opened==2){
    movesCount();
    if(openedCards[0].textContent===openedCards[1].textContent){
      matched();
    }else{
      unmatched();
    }
  }

};

const movesCount=()=>{
  movesC++;
  moves.innerHTML = movesC;
  //start timer on first click
  if(movesC == 1){
      second = 0;
      minute = 0;
      hour = 0;
      startTimer();
  }

  if (movesC > 10 && movesC <= 13){
      for( i= 0; i < 5; i++){
          if(i > 4){
              stars[i].style.visibility = "collapse";
          }
      }
  }
  else if (movesC > 13 && movesC < 15){
      for( i= 0; i < 5; i++){
          if(i > 3){
              stars[i].style.visibility = "collapse";
          }
      }
  }
  else if(movesC >= 15 && movesC < 18){
      for( i= 0; i < 5; i++){
          if(i > 2){
              stars[i].style.visibility = "collapse";
          }
      }
  }
  else if(movesC >= 18 && movesC < 20){
      for( i= 0; i < 5; i++){
          if(i > 1){
              stars[i].style.visibility = "collapse";
          }
      }
  }
  else if(movesC >= 20){
      for( i= 0; i < 5; i++){
          if(i > 0){
              stars[i].style.visibility = "collapse";
          }
      }
  }

}

// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
const startTimer=()=>{
    interval = setInterval(()=>{
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

const gameWon=()=>{

   if(matchedCard.length==20){
      console.log("Congratulations!!!!!!!You have won the game");
      modal.classList.add("show");
      clearInterval(interval);
      finalTime = timer.innerHTML;
      var starRating = document.querySelector(".stars").innerHTML;

      document.getElementById("finalMove").innerHTML = movesC;
      document.getElementById("starRating").innerHTML = starRating;
      document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();
    }

}

const congratulations=()=>{
  setTimeout(gameWon,2000);
}
function playAgain(){
    modal.classList.remove("show");
    startGame();
}

const closeModal=()=>{
    closeicon.addEventListener("click", ()=>{
        modal.classList.remove("show");
        startGame();
    });
}

cards.forEach((card)=>{
  card.addEventListener("click",displayCard)
  card.addEventListener("click",openCard);
  card.addEventListener("click",congratulations);
})
