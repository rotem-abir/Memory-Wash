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

    }
  },

  reset: function() {
    this.time = 0;
    this.stars = 5;
    this.moves = 0;
  },

  init: function() {
    this.reset();
    // temporary get data
    this.deckData = vm.getDeck();
    // return '/data/data.json';
  }

};


const vm = {
  getDeck: function() {
    this.cards = document.getElementsByClassName("card");
    this.deck = [...cards];
    return deck.map(function(card) {
        return card.innerHTML;
    });
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
    pairsDeck.length = 16;  
    for (i = 0; i < m; i++) {
        pairsStock[i] = stock[i];
        pairsStock[m] = stock[i];
        m++;
    }
    pairsStock = this.shuffleDeck(pairsStock);
    view.updateDeck(pairsStock);
  },
  
  updateScore: function() {

  },
  updateTime: function() {

  },
  time: '',
  stars: 5,
  moves: 0,
  timer: {

  },

  init: function {
    this.buildDeck(model.deckData);
  },

};


const view = {
  updateDeck: function(pairsDeck) {
    for (let i = 0; i < 16; i++) {
      vm.deck[i].innerHTML = pairsDeck[i];
    }
  },
  
  init: function() {

  },
};
