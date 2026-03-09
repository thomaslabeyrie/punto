import { Controller } from './Controller.js';
import { Display } from './Display.js';

const controller = new Controller();
controller.initGame('Thomas', 'Charlotte');

while (!controller.state.gameOver) {
	controller.initRound();

	while (!controller.state.roundOver) {
		await controller.playTurn();
	}
}

Display.gameOver(controller.state.currentPlayer);
