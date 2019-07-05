const model = { 
  deckData: [],
  record: {
    time: '',
    stars: 0,
    moves: 0,
  },

  localStorage: {
    save: function() {

    },
    read: function() {

    },
    clean: function() {

    },
  },

  cleanRecord: function() {
    this.time = 0;
    this.stars = 0;
    this.moves = 0;
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
    this.deck = [...this.cards];
    model.init();
    //this.buildDeck(model.deckData);
    //this.gameTime = "01:23";
    //this.gameMoves = "45";
    view.init();
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
    this.gameTime = "00:00";
    this.gameMoves = "00";
    view.updatePanel();
  },

  timer: {

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
  },

  updateDeck: function(pairsDeck) {
    for (let i = 0; i < 16; i++) {
      vm.deck[i].innerHTML = pairsDeck[i];
    }
  },

  updatePanel: function() {
    this.time.innerHTML = vm.gameTime;
    this.moves.innerHTML = vm.gameMoves;
  }

};

vm.init();
