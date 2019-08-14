'use strict';
let speedBegin = performance.now();
let speedEnd;

const model = { 
  deckData: [],
  deckData2: [],
  record: {
    time: 0, // starts as  5940
    moves: 0, // starts as 999
    rate: 0,
  },
  tempStock: [ // temprature signs options
    "money",
    "child_care",
    "sync_disabled",
    "sync_problem",
    "sync",
    "whatshot"
  ],
  tempGreet: [
    ["30°C.", "This is the recommended setting for a lot of delicate clothes, such as wool and silkgood. Are you delicate?"],
    ["40°C.", "Good for most everday items. Fairly clean, the most common, quiet normal. Are you normal?"],
    ["50°C.", "This wash is suitable for polyester/cotton mixtures and viscose. Oh, and nylon."],
    ["60°C.", "Like underwear, towels and household linen. Some bacterial spores and viruses are resistant to this washing setting."],
    ["90°C. Well done!", "Most washing labels won't recommend such a high temperature. This is the hottest wash program, only suitable for some items."]
  ],
  localRecord: {
    saveRecord: function(time, moves) {
      time.toString();
      moves.toString();
      localStorage.setItem('time', time);
      localStorage.setItem('moves', moves);
    },
    readRecord: function() {
      let timeRead, moveRead
      timeRead = localStorage.getItem('time');
      moveRead = localStorage.getItem('moves');
      if (timeRead !== null) { // checks if its not the first game ever
        timeRead = parseInt(timeRead);
        moveRead = parseInt(moveRead);
        [model.record.time, model.record.moves] = [timeRead, moveRead];
        view.updatePanel(0, 0); /* need to be somewhere else */
      }
      else {
        model.record.time = 5940
        model.record.moves = 999
        timeRead = 0;
        moveRead = "00";
      }
      return [timeRead, moveRead];
    },
    cleanRecord: function() {
      localStorage.clear();
      model.record.moves = 999;
      model.record.time = 5940;
    },
  },
  getJSON: function(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/data/data.json');
    //xhr.responseType = 'json';
    xhr.onload = function() {
      if (xhr.status === 200) {
        let json = JSON.parse(xhr.responseText);
        let laundry = json.laundry;
        callback(null, laundry);
      }
      else {
        callback(`Request error ${xhr.status}`, null);
      }
    };
    xhr.send();
  },
  fetchJSON: function(json) {
    for (let i = 0; i < json.length; i++) {
      let htmlString = `<img src="${json[i].src}" width="72" alt="${json[i].alt}" title="${json[i].title}"><span class="meaning hide">${json[i].title}</span>`;
      this.deckData2[i] = htmlString;
    }
  },
  init: function() {
    /*
    this.getJSON(function(error, json) {
      model.fetchJSON(json);
    });
    */
    // temporary get data
    this.deckData = vm.deck.map(function(card) {
      return card.innerHTML;
    });
    // return '/data/data.json';
  }
};


const vm = {
  init: function() {
    this.cards = document.getElementsByClassName("card");
    this.deck = [...this.cards]; /* needs to be in the view */
    this.gameMoves = "00";
    this.picked = 0;          // open cards
    this.remaining = 8;       // pairs left
    this.firstCard;
    model.init();
    view.init();
    viewPopUp.init();
    vm.readRecords();
  },
  getRecords: function() {
    return model.record;
  },
  saveRecords: function(time, moves) {
    model.localRecord.saveRecord(time, moves);
  },
  shuffleDeck: function(array) {
    let m = array.length, t, i;               // While there remain elements to shuffle…
    while (m) {                               // Pick a remaining element…
      i = Math.floor(Math.random() * m--);    // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  },
  buildDeck: function(stock) {
    let i,
      m = 8,
      pairsStock = [];
    pairsStock.length = 16;
    for (i = 0; i < 8; i++) {
      pairsStock[i] = stock[i];
      pairsStock[m] = stock[i];
      m++;
    }
    pairsStock = this.shuffleDeck(pairsStock);
    view.updateDeck(pairsStock);
  },
  scoreReset: function() {
    this.gameMoves = "00";
    this.timer.reset();
    view.updatePanel(0, vm.gameMoves);
  },
  checkRating: function (rating) {
    if ((vm.gameMoves === 11) || (vm.gameMoves === 13) || (vm.gameMoves === 16) || (vm.gameMoves === 19)) {
      rating--;
      view.stars[rating].classList.toggle("starOn");
      rating--;
      view.stars[rating].classList.toggle("starOn");
      view.gameRate--;
      view.tempSign.textContent = `${model.tempStock[(view.gameRate)]}`;    
    }
  },
  readRecords: function() {
    let bestTime, bestMoves;
    [bestTime, bestMoves] = model.localRecord.readRecord();
    view.updateRecord(bestTime, bestMoves);
  },
  deleteRecords: function() {
    model.localRecord.cleanRecord();
    view.updateRecord(0, "00");
  },
  timer: {
    seconds: 0,
    running: false,
    counter: "",
    interval: 17, // seconds based on 1000/60, to imitate time foramt of launry machine. For "minutes:seocnds" display, use 1000
    timeOn: function() {
      vm.timer.seconds++;
      view.updatePanel(vm.timer.seconds, vm.gameMoves);
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
      else if (vm.timer.seconds) {                     // if the game is paused, resume it
        this.start();
      }
    },
    reset: function() {
      clearInterval(this.counter);
      this.running = false;
      vm.timer.seconds = 0;
    },
    timeFormat: function(seconds) {
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
  },
  gameOver: function() {
    view.updatePanel(vm.timer.seconds, vm.gameMoves);
    this.timer.pause();
    viewPopUp.updateRecords();
    this.timer.seconds = 0; // prevets the pause button to work
    view.explainCards.show();
    setTimeout(viewPopUp.playAgain , 1000);
    if ((model.record.rate === 5)&&(model.record.moves < 10)) { // opens bonus level
        iddqd.gouranga();
    }  
  },
  cardChecker: function (evt) {
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
          vm.firstCard = checkCard;
        }
        // if it's the second card
        else if (vm.picked === 1) {
          vm.picked = 2;
          vm.gameMoves++;
          checkCard.classList.add("pick");
          checkCard.firstElementChild.classList.remove("hide");
          view.matchCards(vm.firstCard, checkCard);
          vm.checkRating(view.gameRate);
          if (vm.remaining === 0) {
            vm.gameOver();
          }
        }
      }
    }
  }
};

const view = {  
  init: function() {
    this.score = Array.from(document.getElementsByClassName("count"));
    this.stars = document.querySelectorAll(".star");
    this.timeRecord = this.score[0];
    this.time = this.score[1];
    this.movesRecord = this.score[2];
    this.moves = this.score[3];
    this.gameRate = 5;
    this.tempSign = this.stars[0].parentElement.parentElement.lastElementChild.lastElementChild; // temprature sign
    this.board = document.querySelector(".board");
    this.delay = 1500;
    this.panel = document.querySelector("div.panel");
    this.panel.addEventListener('click', view.controlPanel);
    this.board.addEventListener('click', vm.cardChecker);
    this.explainCards.show();
    this.keyboardControl();
  },
  updateDeck: function(pairsDeck) {
    for (let i = 0; i < 16; i++) {
      vm.deck[i].innerHTML = pairsDeck[i];
    }
  },
  updatePanel: function(time, moves) {
    time = vm.timer.timeFormat(time);
    this.time.innerHTML = time;
    this.moves.innerHTML = moves;
  },
  updateRecord: function(time, moves) {
    time = vm.timer.timeFormat(time);
    this.timeRecord.innerHTML = time;
    this.movesRecord.innerHTML = moves;
  },
  starsReset: function() {
    this.gameRate = 5;
    for (const star of view.stars) {
      star.classList.remove("starOn");
    }
  },
  cardsReset: function (delay) {
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
    }, view.delay);
  },
  matchCards: function(a, b) {
    if (a.innerHTML === b.innerHTML ) {
      a.classList.add("solved");
      b.classList.add("solved");
      vm.remaining--;
      vm.picked = 0; // happens directly, as no time delay is needed for correct guess
    }
    else {
      setTimeout(function () {
        a.classList.remove("pick");
        b.classList.remove("pick");
        a.firstElementChild.classList.add("hide"); 
        b.firstElementChild.classList.add("hide");
        vm.picked = 0;   // must be after the delay, to prevet card picking during this time
      }, 650)
    }
  },
  explainListen: function (evt) {
    let isImg = evt.target;
    if ((isImg.nodeName === "IMG") && (!(vm.timer.running))){
      isImg.classList.toggle("explain");
      isImg.nextSibling.classList.toggle("hide");
    }
  },
  explainCards: {
    show: function() {
      view.board.addEventListener('mouseover', view.explainListen);
      view.board.addEventListener('mouseout', view.explainListen);
    },
    hide: function() {
      view.board.removeEventListener('mouseover', view.explainListen);
      view.board.removeEventListener('mouseout', view.explainListen);
    }
  },
  resetGame: function() {
    vm.buildDeck(model.deckData);
    vm.scoreReset();
    view.starsReset();
    view.explainCards.hide();
    view.cardsReset(view.delay);
    viewPopUp.endMsg.innerText = "";
  },
  controlPanel: function(evt) {
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
        view.resetGame();
        if (model.record.moves === 999) {   // if it's the first game
          view.updateRecord(0, "00");
        }
      }
      else if (check === "stars") {   // for mobile - equal to the button "c" . to clean the local memory
        vm.deleteRecords();
      }
    }
  },
  keyboardControl: function() {
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
  }
};

const viewPopUp = {
  init: function() {
    this.endScreen = document.querySelector(".endScreen"); // the game-over popup screen
    this.newBest = this.endScreen.querySelectorAll(".newBest"); // "new best" elemnts on the popup screen
    this.endMsg = this.endScreen.firstElementChild.lastElementChild.firstElementChild; // the last message on the popup screen
    this.endScore = this.endScreen.querySelectorAll(".endScore");
    this.endTemp = this.endScreen.querySelectorAll(".endTemp")
    this.buttonSpin = this.endMsg.nextElementSibling;
    this.buttonLearn = this.buttonSpin.nextElementSibling;
  },
  updateRecords: function() {
    let records = vm.getRecords();
    if (view.gameRate > records.rate) {
      this.endMsg.innerText = `Fairly Clean! You're getting warmer.`
      if ((records.rate === 0 )&&(records.moves !== 999)) {                  // if it's a returning player
        this.endMsg.innerHTML = `Good to see you again! Remeber, for best results always combine your wash with a good laundry detergent.`;
      }
    }
    if (vm.timer.seconds < records.time) {
      this.newBest[0].classList.remove("hideEl"); // show new record
      this.newBest[0].lastElementChild.innerHTML = `(Record broke: ${vm.timer.timeFormat(records.time)})` // old time record
      records.time = vm.timer.seconds;
      view.timeRecord.innerHTML = vm.timer.timeFormat(records.time);
      vm.saveRecords(records.time, records.moves);
    }
    else {
      this.newBest[0].classList.add("hideEl"); // no time record broke
    }
    if (vm.gameMoves < records.moves) {
      this.newBest[1].classList.remove("hideEl"); // show new record
      this.newBest[1].lastElementChild.innerHTML = `(Record broke: ${records.moves})`; // old move record
      if (records.moves === 999) { // if its the first time ever played the game
        this.newBest[0].lastElementChild.innerHTML = "Your record will be saved!";
        this.newBest[1].lastElementChild.innerHTML = "Less moves = you get clenaer!";
        this.endMsg.innerText = `Less mistakes will grant you higher wash temprature = more stars. To clean your records press C on the keyboard. Otherwise:`;
      }
      records.moves = vm.gameMoves;
      view.movesRecord.innerHTML = records.moves;
      vm.saveRecords(records.time, records.moves);
    } 
    else {
      this.newBest[1].classList.add("hideEl"); // no moves record broke
    }
    model.record.rate = view.gameRate;  /* needs refreshment: maybe split with the vm */
  },
  popWin:function() {
    this.endScreen.classList.toggle("hideEl");
  },
  playAgain: function() {
    viewPopUp.endScore[0].innerHTML = view.time.innerText; //vm.gameTime; // Game Time
    viewPopUp.endScore[1].innerHTML = view.moves.innerText; //vm.gameMoves; // Game Moves 
    viewPopUp.endTemp[0].innerText = model.tempGreet[(view.gameRate-1)][0];
    viewPopUp.endTemp[1].innerText = model.tempGreet[(view.gameRate-1)][1];

    viewPopUp.endTemp[2].textContent = "";            // create amount of stars
    for (let i = 0; i < view.gameRate; i++){
      viewPopUp.endTemp[2].textContent += "🌟 ";
    }
    viewPopUp.popWin();   // shows the pop up
    viewPopUp.buttonSpin.onclick = function(){
      viewPopUp.popWin();
        view.resetGame();
    }
    viewPopUp.buttonLearn.onclick = function(){
      viewPopUp.popWin();
        view.explainCards.show();
    }  
  }
};

const iddqd = {
  godmode: false,
  moveRec: 8,
  timeRec: 6,
  starRec: 1,
  gouranga: function() {
    if (this.godmode === false) {
      this.godmode = true;
      view.delay = 3000;               // make pre-game delay longer
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
      view.delay = 1500;
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

vm.init();

speedEnd = performance.now();
console.log("CODE: Ready in " + (speedEnd - speedBegin).toFixed(2) + " seconds!");