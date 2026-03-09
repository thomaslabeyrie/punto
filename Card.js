import { VALID_CARD_COLORS, VALID_CARD_VALUES } from './constants.js';

export class Card {
	constructor(color, value) {
		if (VALID_CARD_COLORS.has(color)) {
			this.color = color;
		} else {
			throw new Error(`Card color must be either blue, green, yellow and red`);
		}

		if (VALID_CARD_VALUES.has(value)) {
			this.value = value;
		} else {
			throw new Error(`Card value can't be outside of range: 1 -> 9`);
		}
	}

	// canStackOn(card) {
	// 	return this.value > card.value;
	// }

	// isSameColor(card) {
	// 	return this.color === card.color;
	// }

	// equals(card) {
	// 	return this.color === card.color && this.value === card.value;
	// }
}
