import { Card } from './Card.js';
import { VALID_CARD_VALUES } from './constants.js';

export class Deck {
	constructor(colorPair) {
		this.cards = [];

		colorPair.forEach(color => {
			VALID_CARD_VALUES.forEach(value => {
				this.cards.push(new Card(color, value));
				this.cards.push(new Card(color, value));
			});
		});
	}

	shuffle() {
		// Fisher–Yates shuffle algorithm
		for (let i = this.cards.length - 1; i > 0; i--) {
			const randomIndex = Math.floor(Math.random() * (i + 1)); // Random index between 0 and i

			// Swap cards at position i and position randomIndex
			const temp = this.cards[i];
			this.cards[i] = this.cards[randomIndex];
			this.cards[randomIndex] = temp;
		}

		return this;
	}

	draw() {
		if (this.isEmpty()) throw new Error('Cannot draw from empty deck');

		return this.cards.pop();
	}

	isEmpty() {
		return this.cards.length === 0;
	}

	getSize() {
		return this.cards.length;
	}
}
