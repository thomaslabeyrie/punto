export class State {
	constructor() {
		this.currentPlayer = null;
		this.currentCard = null;

		this.turnCount = 0;
		this.roundCount = 0;

		this.roundOver = false;
		this.gameOver = false;
		this.winner = null;
	}
}
