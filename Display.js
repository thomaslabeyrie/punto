import { CHALK_COLOR_MAP } from './constants.js';

export class Display {
	static currentPlayer(player) {
		console.log(`${player.name}'s turn`);
	}

	static currentCard(card) {
		console.log(`Current card: ${CHALK_COLOR_MAP[card.color](card.value)}`);
	}

	static gameOver(gameWinner) {
		console.log(`Game over! Winner: ${gameWinner?.name || 'No winner'}`);
	}

	static board(board) {
		board.display();
	}

	static roundOver(winner) {
		console.log(`${winner.name} wins the round!`);
	}

	static scoreBoard(player1, player2) {
		console.log('Scoreboard:');
		console.log(`  ${player1.name}: ${player1.score}`);
		console.log(`  ${player2.name}: ${player2.score}`);
	}

	static invalidMove() {
		console.log('Invalid move! Try again.');
	}
}
