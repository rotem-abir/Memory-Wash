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
    // get data
    return '/data/data.json';
  }

};


const vm = {
  shuffleDeck: function() {

  },
  buildDeck: function() {

  },
  
  updateScore: function() {

  },
  updateTime: function() {

  },
  time: '',
  stars: 5,
  moves: 0,
  timer: {

  }

};


const view = {

};
