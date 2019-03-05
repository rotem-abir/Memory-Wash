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
| JavaScript | \js    | app.js         |
| Pictures   | \img   | SymbolName.jpg |
| Markdown   | root   | ReadMe..md    |

## Gameplay:

- Hover the symbols to learn their meaining
- Click 'Spin'
- Try to memorize the board
- Within first card click, the game starts
- Try to match cards against the clock
- Get info regarding your match

## Functions Table of Content:

```
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
    saveLocalRecord(time, moves);
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
```


**Save the deck, create a stock.**

`shuffle(array);`

- Takes an array and mixes it's elements.

`buildDeck(deck)`

- Shuffle the stock
- Create a new deck from it
- Shuffle the new deck
- Update in the game

**Save the score/high-score elements.**

`scoreUpdate();`

- Update the game score panel.

`scoreReset();`

- Reset the game score panel.

`checkRating(gameRate);`

| Temprature | Stars | Moves   | Mistakes |
| :--------: | :---: | :------ | :------- |
|     90     |   5   | 8 - 10  | max. 2   |
|     60     |   4   | 11 - 12 | max. 4   |
|     50     |   3   | 13 - 15 | max. 7   |
|     40     |   2   | 16 - 18 | max. 10  |
|     30     |   1   | 19+     | min. 11  |

`starsReset();`

- Reset game rating/stars

`timeFormat(number)`

- Turn numbers to *XX:XX* time format.
- Built as a clock of "*minutes:seconds*", to imitate real laundry machine clock.
- In the game, will display "*seconds:seconds/60"*
- In the game time display, each "centisecond" is actually ~17 centiseconds.

`timer {}`

- `timer.timeOn();`
Counts the time, updating the display.
- `timer.start();`
Ignites the game time mechanism.
- `timer.pause();`
Pause the game timer or resumes it.
- `timer.reset();`
Stops and restarts the game timer.

`best {}`
- Holds the time record
- Holds the move count record
- Holds the last match rating

`saveLocalRecord(time, moves);`

- Save the time and moves counters into the local memory

`readLoacalRecord();`

- Read the records from local memory
- If not null: update and change high-score panel
- If null, means it's the first game. Keep default values

`cleanLocalRecord();`

- Good guess. Cleaning local records
- Bring game to initial state

`recordUpdate();`

- Updates records in the high-score panel
- Saves records on local memory
- Upadtes the "star" number in the tempratue panel
- Sends a "record broke" message to the congratulations popup
- Sends a special greeting if the game was never played

`matchCards(a, b);`

- compare two HTML elements
- In charge of the delay after unsuccessful guess (default: 650)

`explainListen(evt);`

- Checks if an image was hovered and show the symbol explaination

`explainCards{}`
- `explainCards.show();`
Toggle the explanation on (pre-game, paused-game, end-game)
- `explainCards.hide();`
Remove explanation (in-game)

`cardsReset(delay);`

- Removes all needed CSS classes from the deck
- Opens the cards pre game for memorizing
- Closes the cards
  
`resetGame();`
- Build a new deck
- Reset score & display
- Reset stars rating
- Reset timer
- Remove explanations
- Reset deck

`playAgain();`

- Congratulations Popup
- "OK" to play again
  
`gameOver();`
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

`"control panel"` 

- check for Pause or Reset buttons clicks
- Reset the high-score if the game was never played
- `anonymous function` checks for key strokes
  
  | Key | Action |
  |:---|:---|
  | C | Clean the records from game and memory |
  | G | Toggle "Bonus Level" / Cheat view |

`gouranga();`

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