import { Deck } from './Deck.js';

export class Player {
	constructor(name, colorPair) {
		this.name = name;
		this.score = 0;
		this.colorPair = colorPair;
		this.deck = new Deck(this.colorPair);
	}
}
