let speedBegin = performance.now();
let speedEnd;

/*
*   SHUFFLE deck
*/

const cards = document.getElementsByClassName("card");
const deck = [...cards];
const stock = deck.map(function(card) {
    return card.innerHTML;
});

function shuffle(array) {
    let m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
}

function buildDeck(stock) {
    let i, m = 8, pairsDeck = [];
    shuffle(stock);     // shuffle stock and build a new deck with pairs
    pairsDeck.length = 16;     
    for (i = 0; i < 8; i++) {
        pairsDeck[i] = stock[i];
        pairsDeck[m] = stock[i];
        m++;
    }
    shuffle(pairsDeck);     // shuffle new deck and update the DOM
    for (i = 0; i < 16; i++) {
        deck[i].innerHTML = pairsDeck[i];
    }
}

/*
*   SCORE panel
*/

const score = Array.from(document.getElementsByClassName("count"));
const stars = document.querySelectorAll(".star");
const timeRecord = score[0];
const time = score[1];
const movesRecord = score[2];
const moves = score[3];

let gameTime = "01:23";
let gameMoves = "45";

function scoreUpdate(){
    time.innerHTML = gameTime;
    moves.innerHTML = gameMoves;
}

function scoreReset() {
    gameTime = "00:00";
    gameMoves = "00";
    scoreUpdate();
}

/*
*   RATING system ("STARS")
*/

let gameRate = 5;
const tempSign = stars[0].parentElement.parentElement.lastElementChild.lastElementChild; // temprature sign
const tempStock = ["money", "child_care", "sync_disabled","sync_problem", "sync", "whatshot"]; // temprature signs options

function checkRating(rating) {
    if ((gameMoves === 11) || (gameMoves === 13) || (gameMoves === 16) || (gameMoves === 19)) {
        rating--;
        stars[rating].classList.toggle("starOn");
        rating--;
        stars[rating].classList.toggle("starOn");
        gameRate--;
        tempSign.textContent = `${tempStock[(gameRate)]}`;    
    }
}

function starsReset() {
    gameRate = 5;
    for (const star of stars) {
        star.classList.remove("starOn");
    }
}

/*
*  TIME display
*/

function timeFormat(seconds) {
    if (seconds < 60 ) {             // Time is 00:00 to 00:59
        if (seconds < 10) {          // Time is between 0-9 (00:0X)
            return `00:0${seconds.toString()}`;
        }
        else {                      // Time is between 10-59 (00:XX)
            return `00:${seconds.toString()}`;
        }
    }
    else if (seconds < 600) {       // Time is 01:00 to 09:99    
        if (seconds%60 < 10) {      // Time is (0X:0X)
            return `0${((seconds-seconds%60)/60).toFixed(0)}:0${(seconds%60).toFixed(0)}`;   
        }
        else {                      // Time is (0X:XX)
            return `0${((seconds-seconds%60)/60).toFixed(0)}:${(seconds%60).toFixed(0)}`;
        }
    }
    else {                          // Time is 10:00 - 99:99
        if (seconds%60 < 10) {      // Time is (XX:0X)
            return `${((seconds-seconds%60)/60).toFixed(0)}:0${(seconds%60).toFixed(0)}`;
        }
        else {                      // Time is (XX:XX)
            return `${((seconds-seconds%60)/60).toFixed(0)}:${(seconds%60).toFixed(0)}`;
        }
    }
}

/*
*   TIMER object
*/

let seconds = 0;    // originally planned to be seconds, in fact 1=17 milliseconds

const timer = {
    running: false,
    counter: "",
    interval: 17, // seconds based on 1000/60, to imitate time foramt of launry machine. For "minutes:seocnds" display, use 1000
    timeOn: function() {
        seconds++;
        gameTime = timeFormat(seconds);
        scoreUpdate();
    },
    start: function() {
        if (!this.running) {                    // run game timer (if not running already)
            this.counter = setInterval(this.timeOn, this.interval);
            this.running = true;
        }
    },
    pause: function() {
        if (this.running) {                     // if the game is running, pause it
            clearInterval(this.counter);
            this.running = false;
        }
        else if (seconds) {                     // if the game is paused, resume it
            this.start();
        }
    },
    reset: function() {
        clearInterval(this.counter);
        this.running = false;
        seconds = 0;
    }
};

/*
*   RECRODS holder
*/

const best = {
    time: 5940,
    moves: 999,
    rate: 0
};

function saveLocalRecord(time, moves) {
    time.toString();
    moves.toString();
    localStorage.setItem('time', time);
    localStorage.setItem('moves', moves);
}

function readLoacalRecord() {
    let timeRead, moveRead
    timeRead = localStorage.getItem('time');
    moveRead = localStorage.getItem('moves');
    if (timeRead !== null) { // checks if its not the first game ever{
        timeRead = parseInt(timeRead);
        moveRead = parseInt(moveRead);
        timeRecord.innerHTML = timeFormat(timeRead);
        movesRecord.innerHTML = moveRead;
    }
    else {
        timeRead = 5940;
        moveRead = 999; 
    }
    return [timeRead, moveRead];
}

function cleanLocalRecord() {
    localStorage.clear();
    timeRecord.innerHTML = "00:00";
    movesRecord.innerHTML = "00";
    best.moves = 999;
    best.time = 5940;
}

let bestMsg = ["", "Good to have you back.", ""]; // TimeMsg, MovesMsg, RateMsg

function recordUpdate() {
    if (gameRate > best.rate) {
        bestMsg[2] = `Fairly Clean! You're getting warmer.`
        if ((best.rate === 0 )&&(best.moves !== 999)) {                  // if it's a returning player
            bestMsg = ["", "Good to have you back. Remember, for best results:", "Combine your wash with a good laundry detergent."];
        }
    }
    if (seconds < best.time) {
        bestMsg[0] = `NEW BEST TIME! | (Record broke: ${timeFormat(best.time)})`;
        best.time = seconds;
        timeRecord.innerHTML = timeFormat(best.time);
        saveLocalRecord(best.time, best.moves);
    }
    if (gameMoves < best.moves) {
        bestMsg[1] = `GREAT MOVES! | (Record broke: ${best.moves})`;
        if (best.moves === 999) { // if its the first time ever played the game
            bestMsg = ["You made new time and moves records.", "To clean these records press C.", "Otherwise, get cleaner:"];
        }
        best.moves = gameMoves;
        movesRecord.innerHTML = best.moves;
        saveLocalRecord(best.time, best.moves);
    } 
    best.rate = gameRate;
}

/*
*   MATCHING mechanism
*/

let picked = 0; // open cards
let remaining = 8; // pairs left

function matchCards(a, b) {
    
    if (a.innerHTML === b.innerHTML ) {
        a.classList.add("solved");
        b.classList.add("solved");
        remaining--;
        picked = 0; // happens directly, as no time delay is needed for correct guess
    }
    else {
        setTimeout(function () {
            a.classList.remove("pick");
            b.classList.remove("pick");
            a.firstElementChild.classList.add("hide"); 
            b.firstElementChild.classList.add("hide");
            picked = 0;   // must be after the delay, to prevet card picking during this time
        }, 650)
    }
}

/*
*   EXPLAINATION exposer
*/

const board = document.querySelector(".board");

function explainListen (evt) {
    let isImg = evt.target;
    if ((isImg.nodeName === "IMG") && (!(timer.running))){
        isImg.classList.toggle("explain");
        isImg.nextSibling.classList.toggle("hide");
    }
}

const explainCards = {
    show: function() {
        board.addEventListener('mouseover', explainListen);
        board.addEventListener('mouseout', explainListen);
    },
    hide: function() {
        board.removeEventListener('mouseover', explainListen);
        board.removeEventListener('mouseout', explainListen);
    }
};

/*
*   START game
*/

let delay = 1500;
function cardsReset(delay) {
    picked = 0;
    remaining = 8;

    for (const card of cards) {
        card.classList.remove("pick", "solved", "closed");
        card.firstElementChild.classList.remove("hide");
    }
    setTimeout(function() {
        for (const card of cards) {
            card.classList.add("closed");
            card.firstElementChild.classList.add("hide");
        }
    }, delay);
}

function resetGame() {
    buildDeck(stock);
    scoreReset();
    starsReset();
    timer.reset();
    explainCards.hide();
    cardsReset(delay);
}

/*
*   END game
*/

const tempGreet = [
    "30°C.\nThis is the recommended setting for a lot of delicate clothes, such as wool and silkgood. Are you delicate?",
    "40°C.\nGood for most everday items. Very common, quiet normal.\nAre you normal?",
    "50°C.\nThis wash is suitable for polyester/cotton mixtures and viscose.\nOh, and nylon.",
    "60°C.\nLike underwear, towels and household linen.\nSome bacterial spores and viruses are resistant to this washing setting.",
    "90°C. Well done!\nMost washing labels won't recommend such a high temperature. This is the hottest wash program, only suitable for some items."
];

function playAgain() {
    window.alert(`- NICE WASH! -

Time : ${gameTime} | Moves : ${gameMoves} | How clean were you: ${tempGreet[(gameRate-1)]}

    ${bestMsg[0]}
    ${bestMsg[1]}
    ${bestMsg[2]} Spin again!`);

    bestMsg = ["", "", ""];
}

function gameOver() {
    scoreUpdate();
    timer.pause();
    recordUpdate();
    seconds = 0; // prevets the pause button to work
    explainCards.show();
    setTimeout(playAgain , 1000);
    if ((best.rate === 5)&&(best.moves < 10)) { // opens bonus level
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
        if (gameTime === "00:00") {
            timer.start();
            stars[4].classList.toggle("starOn");
            tempSign.textContent = `${tempStock[(gameRate)]}`;   
        }
        //if the card is not already picked or solved, and if the game is running aka not paused
        if (!(checkCard.classList.contains("pick", "solved")) && !(checkCard.classList.contains("solved")) && (timer.running)) {
            // if it's the first card
            if (picked === 0) {
                picked = 1;
                checkCard.classList.add("pick");
                checkCard.firstElementChild.classList.remove("hide");
                firstCard = checkCard;
            }
            // if it's the second card
            else if (picked === 1) {
                picked = 2;
                gameMoves++;
                checkCard.classList.add("pick");
                checkCard.firstElementChild.classList.remove("hide");
                matchCards(firstCard, checkCard);
                checkRating(gameRate);
                if (remaining === 0) {
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
            timer.pause();
            if (!timer.running) {       // toggle explanations according to game run/pause
                explainCards.show();
            }
            else {
                explainCards.hide();
            }
        }
        else if (check === "reset"){
            resetGame();
            if (best.moves === 999) {   // if it's the first game
                timeRecord.innerHTML = "00:00";
                movesRecord.innerHTML = "00";
            }
        }
        else if (check === "stars") {   // for mobile - equal to the button "c" . to clean the local memory
            cleanLocalRecord();
        }
    }
});

window.onkeyup = function(key) {
    if ((key.key == "g") || (key.key == "G")) {
        iddqd.gouranga();
    }
    if ((key.key == "c") || (key.key == "C")) {
        cleanLocalRecord();
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

board.addEventListener('click', cardChecker);
explainCards.show();
[best.time, best.moves] = readLoacalRecord();

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
            timer.interval = 1000;      // turn seconds into minutes
            this.moveRec = best.moves;  // keep records
            best.moves = 0;
            this.timeRec = best.time;
            best.time = 0;
            this.starRec = best.rate;
            best.rate = 6;
            timeRecord.innerHTML = "BONUS!";    // change score display
            movesRecord.innerHTML = "☺";
            tempSign.textContent = "verified_user";
            for (const star of stars) {        // twist rating
                star.classList.toggle("starOn");
            }
            for (const card of cards) {         // show cards
                card.firstElementChild.classList.add("cheat"); 
            }
        }
        else {                          // bring everything back
            this.godmode = false;
            delay = 1500;
            timer.interval = 16.66;
            best.moves = this.moveRec;
            best.time = this.timeRec;
            best.rate = this.starRec;
            timeRecord.innerHTML = timeFormat(best.time);
            movesRecord.innerHTML = best.moves;
            tempSign.textContent = `${tempStock[gameRate]}`; 
            for (const star of stars) {
                star.classList.toggle("starOn");
            }
            for (const card of cards) {
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