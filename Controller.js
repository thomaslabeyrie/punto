import prompts from 'prompts';

import { Player } from './Player.js';
import { Board } from './Board.js';
import { State } from './State.js';
import { Display } from './Display.js';

export class Controller {
	initGame(player1Name, player2Name) {
		this.player1 = new Player(player1Name, ['blue', 'green']);
		this.player2 = new Player(player2Name, ['yellow', 'red']);

		this.state = new State(this.player1.name, this.player2.name);
		this.board = new Board();

		this.initRound();
	}

	initRound() {
		if (this.state.roundCount !== 0) {
			this.board.reset();
		}

		this.state.roundOver = false;

		this.player1.deck.shuffle();
		this.player2.deck.shuffle();

		this.setStartingPlayer();
	}

	setStartingPlayer() {
		this.state.currentPlayer =
			Math.random() >= 0.5 ? this.player1 : this.player2;
	}

	async playTurn() {
		Display.board(this.board);

		Display.currentPlayer(this.state.currentPlayer);
		this.getCurrentCard();
		Display.currentCard(this.state.currentCard);

		const move = await this.promptUserForPosition(this.state.currentCard);
		this.board.placeCard(move);
		this.state.turnCount++;

		// Check for win condition
		if (this.isWinningPosition(move.row, move.col)) {
			Display.board(this.board);
			this.endRound();
			if (this.state.roundCount >= 3) {
				// Handle game end
			}
			return;
		}
		this.switchCurrentPlayer();
	}

	getCurrentCard() {
		if (this.state.currentPlayer.deck.isEmpty()) {
			throw new Error(`${this.state.currentPlayer.name} is out of cards!`);
		}

		const currentCard = this.state.currentPlayer.deck.draw();
		this.state.currentCard = currentCard;

		return currentCard;
	}

	async promptUserForPosition(card) {
		const question = {
			type: 'text',
			name: 'position',
			message: 'Enter position (row col) e.g., "2 3":',
			validate: value => {
				const coords = value.split(/\s+/).map(n => parseInt(n));

				if (coords.length !== 2) {
					return 'Please enter position as "row col" (e.g., "2 3")';
				}

				const [row, col] = coords;

				if (isNaN(row) || isNaN(col)) {
					return 'Please enter valid numbers';
				}

				const result = this.board.checkValidPosition({
					row,
					col,
					card,
					turnCount: this.state.turnCount,
				});

				if (!result.valid) {
					return result.message;
				}

				return true;
			},
		};

		const response = await prompts(question);

		// Parse the coordinates
		const [row, col] = response.position.split(/\s+/).map(n => parseInt(n));

		return {
			row,
			col,
			card,
			turnCount: this.state.turnCount,
		};
	}

	playCard(moveInfo) {
		const { row, col, card } = moveInfo;

		this.board.placeCard(row, col, card);
		this.state.turnCount++;

		// Check for win condition
		if (this.isWinningPosition(row, col)) {
			this.endRound();
			if (this.state.roundCount >= 3) {
				// Handle game end
			}
			return;
		}
		this.switchCurrentPlayer();
	}

	isWinningPosition(row, col) {
		return this.board.checkAlignment(row, col) >= 5;
	}

	switchCurrentPlayer() {
		this.state.currentPlayer =
			this.state.currentPlayer === this.player1 ? this.player2 : this.player1;
	}

	endRound() {
		this.state.roundCount++;
		this.state.currentPlayer.score++;
		this.state.roundOver = true;

		Display.roundOver(this.state.currentPlayer);
		Display.scoreBoard(this.player1, this.player2);

		this.state.gameOver =
			this.state.roundCount >= 3 ||
			this.player1.score >= 2 ||
			this.player2.score >= 2;
	}
}
