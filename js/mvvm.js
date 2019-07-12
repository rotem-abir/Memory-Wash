const model = { 
  deckData: [],
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
        // vm.scoreReset();
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
  init: function() {
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
    // this.gameTime = 0;
    this.gameMoves = "00";
    this.picked = 0;          // open cards
    this.remaining = 8;       // pairs left
    model.init();
    view.init();
    viewPopUp.init();
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
      // vm.gameTime = vm.timer.timeFormat(vm.timer.seconds);
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
    viewPopUp.endTemp[0].innerText = tempGreet[(view.gameRate-1)][0];
    viewPopUp.endTemp[1].innerText = tempGreet[(view.gameRate-1)][1];

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


vm.init();