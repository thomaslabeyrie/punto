# punto50

## Description

Punto50 is the CLI version of a game my girlfriend and I play.

### Game Rules

The goal of the game is to align 5 cards with the same colour on a vertical, horizontal or diagonal line. There are four colors and card values range from 1 to 9. Each player gets a two color deck, containing 36 cards. Each turn, the current player draw a card from his deck and then places it on a 6x6 grid. A card can be placed on top of another only if its value is superior than the one it is overriding. The first player to align 5 cards of the same color wins the round. The game is over when a player wins 2 rounds out of 3.

### The Project

The idea of this project was to have fun creating a game engine in JavaScript while practicing Object Oriented Programming. I also went for a Model Controller View architecture. I modeled all the entities for the game as classes, then used a controller to orchestrate them together. Finally I added the `Display` class that takes care of visually displaying the game state in the terminal.

This taught me separation of concerns: I tried to keep each file as simple as possible and focused on a single responsibility. It was sometimes challenging to decide which class should be responsible for certain methods. For example, in the `Board` class there is the `checkValidPosition()` method. This method felt like it could belong to the `Controller` because it involves complex evaluation and calculation. Even though the role of my `Board` class is to get and set simple board data, I chose to keep the method there because at the end of the day the data it computes and returns is so closely tied to the game board.

I'll now get into each file and their respective responsibilities.

### `Card.js`

I'll start with my `Card` as it is a small entity that makes the rest of the classes easier to understand. Each card instance is a simple object with a `color` and a `value`. I used a `constants.js` file to store the immuable game data like card colors and values, this let me check that the arguments passed to the `Card` constructor were valid. I also defined a few methods to get simple information about the card interaction but I ended up not using them, the `Card` class is only there to instanciate simple `Card` objects.

### `Deck.js`

The `Deck` class takes in a `colorPair` as a parameter so that it contains only cards of the corresponding colors. A deck is composed of two cards for each value and each color. Methods are defined to shuffle and draw from the deck, as well as checking if it is empty of getting its size. I had to do a bit of research about shuffling algorithms and I stumbled upon the Fisher-Yates one. Basically, we look at each card and swap it with a random one in the deck.

### `Square.js`

`Square` is a simple class that models a square from the grid on which cards are placed. It stores the square coordinates and the cards placed on that square.

### `Board.js`

The `Board` is the more feature rich model I've defined. It creates a matrix of `Squares`. For example: `board.grid[2][3]` is the square located at the second row and the third column. The most challenging methods to write were `hasAdjacentCard()`, `checkValidPosition()` and `checkAlignment()` as they are the ones that need to return data based on the current state of the board. `hasAdjacentCard()` and `checkAlignment()` use the `DIRECTIONS` object from `constant.js`to check in either direction starting from the current card. `checkValidPosition()` was interesting to define because it taught me about proper error handling. I had to think of all the cases for a move to be invalid and then write a proper error message for each one.

### `Player.js`

The `Player` stores essential informations about each player: its name, its assigned color pair, its current score and its deck.

### `State.js`

Its only purpose is to keep track of essential informations concerning the current state of the game. Who is playing which card in what context ? How many rounds have the players went through ? Is the current round over ? Is the game over ? It is the source of truth for all these questions.

### `Display.js`

The role of the `Display` class is to elegantly display the game state in the terminal. I used the `chalk` 3rd party library as it made proper text coloring and highlighting way easier.

### `Controller.js`

The `Controller` class was the most challenging to make as it is the one that makes all the other elements work together. It first creates instances create new instances for the players, state and board and then handles all the logic for a turn, a round and the overrall game. Each turn, it displays the current card to the player and then prompts them for the position they want to place the card to. It then checks if the position is valid: if not, it informs the player about what is wrong and prompts them again, if it is valid, it updates the game state, checks if a win condition is met and then displays the board. The `prompts` 3rd party library made getting user input much easier.

### `main.js`

Finally, `main.js` handles the game creation and loops to play turns as long as the game is not over. If the game is over, it stops the loop and displays a message.

## Final Thoughts

Overrall, I would say this project taught me a lot about how to design an app architecture and how to make the different components work together towards an end goal. It was just challenging enough to get me out of my comfort zone but not impossible to tackle. At first, I wanted to finish the project with a proper UI made with Svelte but this ended up too challenging for me so I settled for a game engine that runs in the command line. I'm glad to have done this project and certainly had fun testing it with my girlfriend!
