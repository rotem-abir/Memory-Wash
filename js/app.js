'use strict';
var o = { p: 1, p: 2 };

let speedBegin = performance.now();
let speedEnd;

/*
*   SHUFFLE deck
*/

// const cards = document.getElementsByClassName("card");
// const deck = [...cards];
// const stock = deck.map(function(card) {
//     return card.innerHTML;
// });

// function shuffle(array) {
//     let m = array.length, t, i;
//     // While there remain elements to shuffle…
//     while (m) {
//       // Pick a remaining element…
//       i = Math.floor(Math.random() * m--);
//       // And swap it with the current element.
//       t = array[m];
//       array[m] = array[i];
//       array[i] = t;
//     }
// }

// function buildDeck(stock) {
//     let i, m = 8, pairsDeck = [];
//     shuffle(stock);     // shuffle stock and build a new deck with pairs
//     pairsDeck.length = 16;     
//     for (i = 0; i < 8; i++) {
//         pairsDeck[i] = stock[i];
//         pairsDeck[m] = stock[i];
//         m++;
//     }
//     shuffle(pairsDeck);     // shuffle new deck and update the DOM
//     for (i = 0; i < 16; i++) {
//         deck[i].innerHTML = pairsDeck[i];
//     }
// }

/*
*   SCORE panel
*/

// const score = Array.from(document.getElementsByClassName("count"));
// const stars = document.querySelectorAll(".star");
// const timeRecord = score[0];
// const time = score[1];
// const movesRecord = score[2];
// const moves = score[3];

// let gameTime = "01:23";
// let gameMoves = "45";

// function scoreUpdate(){
//     time.innerHTML = gameTime;
//     moves.innerHTML = gameMoves;
// }

// function scoreReset() {
//     gameTime = "00:00";
//     gameMoves = "00";
//     scoreUpdate();
// }

/*
*   RATING system ("STARS")
*/

// let gameRate = 5;
// const tempSign = stars[0].parentElement.parentElement.lastElementChild.lastElementChild; // temprature sign
// const tempStock = ["money", "child_care", "sync_disabled","sync_problem", "sync", "whatshot"]; // temprature signs options

// function checkRating(rating) {
//     if ((gameMoves === 11) || (gameMoves === 13) || (gameMoves === 16) || (gameMoves === 19)) {
//         rating--;
//         stars[rating].classList.toggle("starOn");
//         rating--;
//         stars[rating].classList.toggle("starOn");
//         gameRate--;
//         tempSign.textContent = `${tempStock[(gameRate)]}`;    
//     }
// }

// function starsReset() {
//     gameRate = 5;
//     for (const star of stars) {
//         star.classList.remove("starOn");
//     }
// }

/*
*  TIME display
*/

// function timeFormat(seconds) {
//     if (seconds < 60 ) {             // Time is 00:00 to 00:59
//         if (seconds < 10) {          // Time is between 0-9 (00:0X)
//             return `00:0${seconds.toString()}`;
//         }
//         else {                      // Time is between 10-59 (00:XX)
//             return `00:${seconds.toString()}`;
//         }
//     }
//     else if (seconds < 600) {       // Time is 01:00 to 09:99    
//         if (seconds%60 < 10) {      // Time is (0X:0X)
//             return `0${((seconds-seconds%60)/60).toFixed(0)}:0${(seconds%60).toFixed(0)}`;   
//         }
//         else {                      // Time is (0X:XX)
//             return `0${((seconds-seconds%60)/60).toFixed(0)}:${(seconds%60).toFixed(0)}`;
//         }
//     }
//     else {                          // Time is 10:00 - 99:99
//         if (seconds%60 < 10) {      // Time is (XX:0X)
//             return `${((seconds-seconds%60)/60).toFixed(0)}:0${(seconds%60).toFixed(0)}`;
//         }
//         else {                      // Time is (XX:XX)
//             return `${((seconds-seconds%60)/60).toFixed(0)}:${(seconds%60).toFixed(0)}`;
//         }
//     }
// }

/*
*   TIMER object
*/

// let seconds = 0;    // originally planned to be seconds, in fact 1=17 milliseconds

// const timer = {
//     running: false,
//     counter: "",
//     interval: 17, // seconds based on 1000/60, to imitate time foramt of launry machine. For "minutes:seocnds" display, use 1000
//     timeOn: function() {
//         this.seconds++;
//         vm.gameTime = vm.timer.timeFormat(this.seconds);
//         view.updatePanel();
//     },
//     start: function() {
//         if (!this.running) {                    // run game timer (if not running already)
//             this.counter = setInterval(this.timeOn, this.interval);
//             this.running = true;
//         }
//     },
//     pause: function() {
//         if (this.running) {                     // if the game is running, pause it
//             clearInterval(this.counter);
//             this.running = false;
//         }
//         else if (this.seconds) {                     // if the game is paused, resume it
//             this.start();
//         }
//     },
//     reset: function() {
//         clearInterval(this.counter);
//         this.running = false;
//         this.seconds = 0;
//     }
// };

/*
*   RECRODS holder
*/

// const best = {
//     time: 5940,
//     moves: 999,
//     rate: 0
// };

// function saveLocalRecord(time, moves) {
//     time.toString();
//     moves.toString();
//     localStorage.setItem('time', time);
//     localStorage.setItem('moves', moves);
// }

// function readLoacalRecord() {
//     let timeRead, moveRead
//     timeRead = localStorage.getItem('time');
//     moveRead = localStorage.getItem('moves');
//     if (timeRead !== null) { // checks if its not the first game ever{
//         timeRead = parseInt(timeRead);
//         moveRead = parseInt(moveRead);
//         view.timeRecord.innerHTML = vm.timer.timeFormat(timeRead);
//         view.movesRecord.innerHTML = moveRead;
//         vm.scoreReset();
//     }
//     else {
//         timeRead = 5940;
//         moveRead = 999; 
//     }
//     return [timeRead, moveRead];
// }

// function cleanLocalRecord() {
//     localStorage.clear();
//     view.timeRecord.innerHTML = "00:00";
//     view.movesRecord.innerHTML = "00";
//     model.record.moves = 999;
//     model.record.time = 5940;
// }


/*
*   RECORDS updater
*/

// const endScreen = document.querySelector(".endScreen"); // the game-over popup screen
// const newBest = endScreen.querySelectorAll(".newBest"); // "new best" elemnts on the popup screen
// const endMsg = endScreen.firstElementChild.lastElementChild.firstElementChild; // the last message on the popup screen

// function recordUpdate() {
//     if (view.gameRate > model.record.rate) {
//         endMsg.innerText = `Fairly Clean! You're getting warmer.`
//         if ((model.record.rate === 0 )&&(model.record.moves !== 999)) {                  // if it's a returning player
//             endMsg.innerHTML = `Good to see you again! Remeber, for best results always combine your wash with a good laundry detergent.`;
//         }
//     }
//     if (vm.timer.seconds < model.record.time) {
//         newBest[0].classList.remove("hideEl"); // show new record
//         newBest[0].lastElementChild.innerHTML = `(Record broke: ${vm.timer.timeFormat(model.record.time)})` // old time record
//         model.record.time = vm.timer.seconds;
//         view.timeRecord.innerHTML = vm.timer.timeFormat(model.record.time);
//         model.localRecord.saveRecord(model.record.time, model.record.moves);
//     }
//     else {
//         newBest[0].classList.add("hideEl"); // no time record broke
//     }
//     if (vm.gameMoves < model.record.moves) {
//         newBest[1].classList.remove("hideEl"); // show new record
//         newBest[1].lastElementChild.innerHTML = `(Record broke: ${model.record.moves})`; // old move record
//         if (model.record.moves === 999) { // if its the first time ever played the game
//             endMsg.innerText = `Less mistakes will grant you higher wash temprature = more stars. To clean your records press C on the keyboard. Otherwise:`;
//             newBest[0].lastElementChild.innerHTML = "Your record will be saved!";
//             newBest[1].lastElementChild.innerHTML = "Less moves = you get clenaer!";
//         }
//         model.record.moves = vm.gameMoves;
//         view.movesRecord.innerHTML = model.record.moves;
//         model.localRecord.saveRecord(model.record.time, model.record.moves);
//     } 
//     else {
//         newBest[1].classList.add("hideEl"); // no moves record broke
//     }
//     model.record.rate = view.gameRate;
// }

/*
*   MATCHING mechanism
*/


// let picked = 0; // open cards
// let remaining = 8; // pairs left

// function matchCards(a, b) {
//     if (a.innerHTML === b.innerHTML ) {
//         a.classList.add("solved");
//         b.classList.add("solved");
//         remaining--;
//         picked = 0; // happens directly, as no time delay is needed for correct guess
//     }
//     else {
//         setTimeout(function () {
//             a.classList.remove("pick");
//             b.classList.remove("pick");
//             a.firstElementChild.classList.add("hide"); 
//             b.firstElementChild.classList.add("hide");
//             picked = 0;   // must be after the delay, to prevet card picking during this time
//         }, 650)
//     }
// }

/*
*   EXPLAINATION exposer
*/


// const board = document.querySelector(".board");

// function explainListen (evt) {
//     let isImg = evt.target;
//     if ((isImg.nodeName === "IMG") && (!(vm.timer.running))){
//         isImg.classList.toggle("explain");
//         isImg.nextSibling.classList.toggle("hide");
//     }
// }

// const explainCards = {
//     show: function() {
//         view.board.addEventListener('mouseover', view.explainListen);
//         view.board.addEventListener('mouseout', view.explainListen);
//     },
//     hide: function() {
//         view.board.removeEventListener('mouseover', view.explainListen);
//         view.board.removeEventListener('mouseout', view.explainListen);
//     }
// };

/*
*
cards = vm.cards
deck = vm.deck
stock = model.deckData
shuffle() = vm.shuffleDeck()
buildDeck() = vm.buildDeck()

score = view.score
stars = view.stars
timeRecord = view.timeRecord
time = view.time
movesRecord = view.movesRecord
moves = view.moves
gameTime = *DELETED*
gameMoves = vm.gameMoves
scoreUpdate = view.updatePanel()
scoreReset = vm.scoreReset()

gameRate = view.gameRate
tempSign = view.tempSign
checkRating = vm.checkRating()
starsReset = view.starsReset()
timeFormat = vm.timer.timeFormat()
seconds = vm.timer.seconds
timer = vm.timer
best = model.record

saveLocalRecord = model.localRecord.saveRecord()
readLoacalRecord = vm.readRecords()
cleanLocalRecord = vm.deleteRecords()

*NEW* = view.updateRecord()
endScreen = viewPopUp.endScreen
newBest = viewPopUp.newBest
endMsg = viewPopUp.endMsg
recordUpdate = viewPopUp.updateRecords()

picked = vm.picked
remaining = vm.remaining
matchCards = view.matchCards()
board = view.board
explainListen = view.explainListen
explainCards = view.explainCards

*
*/

/*
*   START game
*/

let delay = 1500;
function cardsReset(delay) {
    vm.picked = 0;
    vm.remaining = 8;

    for (const card of vm.cards) {
        card.classList.remove("pick", "solved", "closed");
        card.firstElementChild.classList.remove("hide");
    }
    setTimeout(function() {
        for (const card of vm.cards) {
            card.classList.add("closed");
            card.firstElementChild.classList.add("hide");
        }
    }, delay);
}

function resetGame() {
    vm.buildDeck(model.deckData);
    vm.scoreReset();
    view.starsReset();
    view.explainCards.hide();
    cardsReset(delay);
    viewPopUp.endMsg.innerText = "";
}

/*
*   POPUP screen
*/

const endScore = viewPopUp.endScreen.querySelectorAll(".endScore");
const endTemp = viewPopUp.endScreen.querySelectorAll(".endTemp")
const buttonSpin = viewPopUp.endMsg.nextElementSibling;
const buttonLearn = buttonSpin.nextElementSibling;

const tempGreet = [
    ["30°C.", "This is the recommended setting for a lot of delicate clothes, such as wool and silkgood. Are you delicate?"],
    ["40°C.", "Good for most everday items. Fairly clean, the most common, quiet normal. Are you normal?"],
    ["50°C.", "This wash is suitable for polyester/cotton mixtures and viscose. Oh, and nylon."],
    ["60°C.", "Like underwear, towels and household linen. Some bacterial spores and viruses are resistant to this washing setting."],
    ["90°C. Well done!", "Most washing labels won't recommend such a high temperature. This is the hottest wash program, only suitable for some items."]
];

function popupWin() {
    viewPopUp.endScreen.classList.toggle("hideEl")
}

function playAgain() {
    endScore[0].innerHTML = view.time.innerText; //vm.gameTime; // Game Time
    endScore[1].innerHTML = view.moves.innerText; //vm.gameMoves; // Game Moves 
    endTemp[0].innerText = tempGreet[(view.gameRate-1)][0];
    endTemp[1].innerText = tempGreet[(view.gameRate-1)][1];

    endTemp[2].textContent = "";            // create amount of stars
    for (let i = 0; i < view.gameRate; i++){
        endTemp[2].textContent += "🌟 ";
    }
    popupWin();   // shows the pop up
    buttonSpin.onclick = function(){
        popupWin();
        resetGame();
    }
    buttonLearn.onclick = function(){
        popupWin();
        view.explainCards.show();
    }
}

/*
*   END game
*/

function gameOver() {
    view.updatePanel(vm.timer.seconds, vm.gameMoves);
    vm.timer.pause();
    viewPopUp.updateRecords();
    vm.timer.seconds = 0; // prevets the pause button to work
    view.explainCards.show();
    setTimeout(playAgain , 1000);
    if ((model.record.rate === 5)&&(model.record.moves < 10)) { // opens bonus level
        iddqd.gouranga();
    }
}

/*
*   CARD checker
*/

let firstCard;
function cardChecker(evt) {
    let checkCard = evt.target;
    if (checkCard.nodeName === "LI") {
        // If a card was clicked, start the Game
        if (vm.timer.seconds === 0) {
            vm.timer.start();
            view.stars[4].classList.toggle("starOn");
            view.tempSign.textContent = `${model.tempStock[(view.gameRate)]}`;   
        }
        //if the card is not already picked or solved, and if the game is running aka not paused
        if (!(checkCard.classList.contains("pick", "solved")) && !(checkCard.classList.contains("solved")) && (vm.timer.running)) {
            // if it's the first card
            if (vm.picked === 0) {
                vm.picked = 1;
                checkCard.classList.add("pick");
                checkCard.firstElementChild.classList.remove("hide");
                firstCard = checkCard;
            }
            // if it's the second card
            else if (vm.picked === 1) {
                vm.picked = 2;
                vm.gameMoves++;
                checkCard.classList.add("pick");
                checkCard.firstElementChild.classList.remove("hide");
                view.matchCards(firstCard, checkCard);
                vm.checkRating(view.gameRate);
                if (vm.remaining === 0) {
                    gameOver();
                }
            }
        }
    }
}

/*
*   CONTROL panel
*/

const panel = document.querySelector("div.panel");
panel.addEventListener('click', function(evt) {
    let checkClass = evt.target.classList;
    checkClass = [...checkClass];
    for (let check of checkClass) {     // check what was clicked on the pannel
        if (check === "pause") {
            vm.timer.pause();
            if (!vm.timer.running) {       // toggle explanations according to game run/pause
                view.explainCards.show();
            }
            else {
                view.explainCards.hide();
            }
        }
        else if (check === "reset"){
            resetGame();
            if (model.record.moves === 999) {   // if it's the first game
                view.updateRecord(0, "00");
            }
        }
        else if (check === "stars") {   // for mobile - equal to the button "c" . to clean the local memory
            vm.deleteRecords();
        }
    }
});

window.onkeyup = function(key) {
    if ((key.key == "g") || (key.key == "G")) {
        iddqd.gouranga();
    }
    if ((key.key == "c") || (key.key == "C")) {
        vm.deleteRecords();
    }
    if ((key.key == "k") || (key.key == "K")) {
        viewPopUp.endScreen.classList.toggle("hideEl")
    }
}

/*
*   PREFORMANCE test (code: 0.60~, gmae 1.35~)
*/

speedEnd = performance.now();
console.log("CODE: Ready in " + (speedEnd - speedBegin).toFixed(2) + " seconds!");

/*
*   RUN the game
*/

view.board.addEventListener('click', cardChecker);
view.explainCards.show();
vm.readRecords();
// [model.record.time, model.record.moves] = vm.checkRecords();

/*
*   Bonus level
*/

const iddqd = {
    godmode: false,
    moveRec: 8,
    timeRec: 6,
    starRec: 1,
    gouranga: function() {
        if (this.godmode === false) {
            this.godmode = true;
            delay = 3000;               // make pre-game delay longer
            vm.timer.interval = 1000;      // turn seconds into minutes
            this.moveRec = model.record.moves;  // keep records
            model.record.moves = 0;
            this.timeRec = model.record.time;
            model.record.time = 0;
            this.starRec = model.record.rate;
            model.record.rate = 6;
            view.timeRecord.innerHTML = "BONUS!";    // change score display
            view.movesRecord.innerHTML = "☺";
            view.tempSign.textContent = "verified_user";
            for (const star of view.stars) {        // twist rating
                star.classList.toggle("starOn");
            }
            for (const card of vm.cards) {         // show cards
                card.firstElementChild.classList.add("cheat"); 
            }
        }
        else {                          // bring everything back
            this.godmode = false;
            delay = 1500;
            vm.timer.interval = 16.66;
            model.record.moves = this.moveRec;
            model.record.time = this.timeRec;
            model.record.rate = this.starRec;
            view.timeRecord.innerHTML = vm.timer.timeFormat(model.record.time);
            view.movesRecord.innerHTML = model.record.moves;
            view.tempSign.textContent = `${model.tempStock[view.gameRate]}`; 
            for (const star of view.stars) {
                star.classList.toggle("starOn");
            }
            for (const card of vm.cards) {
                card.firstElementChild.classList.remove("cheat"); 
            }
        }
    }
};

/*
shuffle(stock);
    buildDeck(deck);

scoreUpdate();
    scoreReset();
        checkRating(gameRate);
            starsReset();

timeFormat(seconds);
    timeOn();
        timer.start();
            timer.pause();
            timer.reset(); 
       
best.time.moves.rate	
    saveLocalRecord(best.time, best.moves);
        readLoacalRecord();
            cleanLocalRecord();
                recordUpdate();	

matchCards(a, b);
explainListen(evt);
    explainCards.hide();
    explainCards.show();

        cardsReset(delay);    
                    resetGame();
                        playAgain();
                            gameOver();
                                cardChecker(evt);
                                    "control panel"
                                         gouranga();
*/