# Memory Wash

The player has to match pairs of laundry symbols, playing against the clock. \
The goal is to finish clean, with the highest washing temprature.


## Game Features:

* Random symbols collection deck each game (8 out of 16)
* Score panel (Timer/Move counter)
* High-Score (with loacal memory)
* Rating system per game of 1 to 5 ('TEMP')
* Restart game ('SPIN')
* Pause game ('PAUSE')
* Congratulations Popup (game is over / new high-score)

## File System:

| Type       | Folder | Format         |
| :--------- | :----- | :------------- |
| HTML       | root   | index.html     |
| CSS        | \css   | style.css      |
| JavaScript | \js    | mvvm.js         |
| Pictures   | \img   | SymbolName.jpg |
| Markdown   | root   | ReadMe..md    |

## Gameplay:

- Hover the symbols to learn their meaining
- Click 'Spin'
- Try to memorize the board
- Within first card click, the game starts
- Try to match cards against the clock
- Get info regarding your match

## Table of Content - main objects and functions:

```
1. model{}
2. vm{}
3. view{}
4. viewPopUp{}
# iddqd{}
```

### 1. model{}

Holds all the data for the game, as the model in the MVVM.

`record{}`
- Holds the time record
- Holds the move count record
- Holds the last match rating

`localRecord{}`

- `saveRecord()`
  - Saves the time and moves counters into the local memory
- `readRecord()`
  - Read the records from local memory
  - If not null: Reset the high-score as the game was never played
  - If null, means it's the first game. Keep default values
- `cleanRecord()`
  - deleting all data in the local memory (cache)

`init()`

- getting the cards data (currently from the HTML, in the future via JSON)


### 2. vm{}

`init()`

- Getting the cards, building a deck, reseting all current game data
- Initiating the model, the view (the pop-up view)
- Reading local records from cache

`getRecords()`

- Serving the local records from the model

`saveRecords(time, moves)`

- Updating the time and moves from the game to the model

`shuffleDeck(array)`

- Takes an array and mixes its elements.

`buildDeck(deck)`

- Create a new deck from the stock of pairs (as 1234567812345678)
- Shuffle the new deck
- Update in the game's UI

`scoreReset()`

- Resets the game's move counter
- Resets the UI score panel

`checkRating(gameRate)`

- Takes the current game rating (1 to 5) and updates by this chart:

| Temprature | Stars | Moves   | Mistakes |
| :--------: | :---: | :------ | :------- |
|     90     |   5   | 8 - 10  | max. 2   |
|     60     |   4   | 11 - 12 | max. 4   |
|     50     |   3   | 13 - 15 | max. 7   |
|     40     |   2   | 16 - 18 | max. 10  |
|     30     |   1   | 19+     | min. 11  |

`readRecords()`

- Update and change high-score panel by the local record

`deleteRecords()`

- Good guess. Cleaning local records
- Bring game to initial state

`timer {}`

This object is in charge of all the time management of the game.

- `timer.timeOn()`
Counts the time, updating the display.
- `timer.start();`
Ignites the game time mechanism.
- `timer.pause()`
Pause the game timer or resumes it.
- `timer.reset()`
Stops and restarts the game timer.
- `timer.timeFormat(number)`
  - Turn numbers to *XX:XX* time format.
  - Built as a clock of "*minutes:seconds*", to imitate real laundry machine clock.
  - In the game, will display "*seconds:seconds/60"*
  - In the game time display, each "centisecond" is actually ~17 centiseconds.

`gameOver()`
- Updates score and record
- Stops and reset the time
- Show explanations
- Opens the congratulations popup

`cardChecker(evt);`

- Checking if a card was clicked
  - If it's the begining of the game, ignites the time
  - Marking and saving the first card
  - Marking if it's the second card
    - Comparing
    - Checking if game is finished


### 3. view{}

`init()`

- Store all needed elements from the HTML
- Add event listeners for mouse clicks
- Enables symbols explanations for the cards
- Add the keyboard shortcuts control

`updateDeck(pairsDeck)`

- Updates the deck that was built by the vm

`updatePanel(time, moves)`

- Update the game score panel.

`updateRecord(time, moves)`

- Formating the game time and update the records 

`starsReset();`

- Reset game rating/stars

`cardsReset(delay);`

- Removes all needed CSS classes from the deck
- Opens the cards pre game for memorizing
- Closes the cards

`matchCards(a, b);`

- The core mechanism that check for successful card matching
- Compare two HTML elements
- In charge of the delay after unsuccessful guess (default: 650)

`explainListen(evt);`

- Checks if an image was hovered and show the symbol explaination

`explainCards{}`
- `explainCards.show();`
Toggle the explanation on (pre-game, paused-game, end-game)
- `explainCards.hide();`
Remove explanation (in-game)
  
`resetGame();`
- Build a new deck
- Reset score & display
- Reset stars rating
- Reset timer
- Remove explanations
- Reset deck

`controlPanel(evt)`

- Check for Pause or Reset buttons clicks
- Check for reseting the local storage

`keyboardControl()`

- Checks for key strokes
  
  | Key | Action |
  |:---|:---|
  | C | Clean the records from game and memory |
  | G | Toggle "Bonus Level" / Cheat view |
  | K | Toggle "Popup screen" / Credits view |

### 4. viewPopUp{}

Another view in the MVVM, for the pop up modal at the end of each game

`init()`

- Getting all needed elements from the HTML
  
`updateRecords()`

- Updates records in the high-score panel
- Saves records on local memory
- Greet the player if he preformed better than his last round
- Sends a "record broke" message to the congratulations popup
- Sends a special greeting if the game was never played
- Sends a special greeting for returning players

`popWin()`

- Show or hided the modal
  
`playAgain()`

- Showing congratulations Popup
- Upadtes the "stars" in the popup according the performances
- Enables to click the buttons - another round or learning the laundry symbols

### #. iddqd{}

`gouranga()`

- God mode
  - Exposes the deck
  - Works for one round
  - Disappers if game restarts
- Doubles the pre game delay
- Changes timer from seconds to minutes
- Changes the high-score display
- Changes the rating view
- Can be achieved as a bonus level 
  - If breaking or comparing the game's world record
    - Move count 9 and below
      - Good luck and have a nice wash!
