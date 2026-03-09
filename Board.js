import { DIRECTIONS, CHALK_COLOR_MAP } from './constants.js';

export class Board {
	constructor() {
		this.rows = 6;
		this.cols = 6;

		this.grid = [];
		for (let row = 0; row < this.rows; row++) {
			this.grid[row] = [];
			for (let col = 0; col < this.cols; col++) {
				this.grid[row][col] = [];
			}
		}
	}

	placeCard(moveData) {
		const { row, col, card } = moveData;
		this.grid[row][col].push(card);
	}

	getTopCard(row, col) {
		if (this.isSquareEmpty(row, col)) return null;

		const stack = this.grid[row][col];
		return stack[stack.length - 1];
	}

	isSquareEmpty(row, col) {
		return this.grid[row][col].length === 0;
	}

	// Cette méthode devrait retourner un objet { valid: <booelan>, message: <info> }
	checkValidPosition(moveContext) {
		const { row, col, card, turnCount } = moveContext;
		let message;

		// Out of bounds
		if (this.isOutOfBounds(row, col)) {
			message = 'Out of bounds position: coordinates must be in range 0-5';
			return { valid: false, message };
		}

		// First move must be in the 2x2 center
		if (turnCount === 0) {
			if (!this.isCenter(row, col)) {
				message = 'First move of the round must be in the 2x2 center square';
				return { valid: false, message };
			}
		}

		// Stacking on existing card
		if (!this.isSquareEmpty(row, col)) {
			if (card.value < this.getTopCard(row, col).value) {
				message = `Card must have a greater value to override another one`;
				return { valid: false, message };
			}
		}

		// Juxtaposition
		if (turnCount !== 0) {
			if (this.hasAdjacentCard(row, col)) {
				message = `Position is valid`;
				return { valid: true, message };
			}
		}

		message = `Position is valid`;
		return { valid: true, message };
	}

	isOutOfBounds(row, col) {
		return row < 0 || this.rows - 1 < row || col < 0 || this.cols - 1 < col;
	}

	isCenter(row, col) {
		return (row === 2 || row === 3) && (col === 2 || col === 3);
	}

	isSameColor(row1, col1, row2, col2) {
		if (this.isSquareEmpty(row1, col1) || this.isSquareEmpty(row2, col2)) {
			return false;
		}

		return (
			this.getTopCard(row1, col1).color === this.getTopCard(row2, col2).color
		);
	}

	hasAdjacentCard(row, col) {
		for (const direction of DIRECTIONS) {
			for (const [deltaRow, deltaCol] of direction.deltas) {
				const newRow = row + deltaRow;
				const newCol = col + deltaCol;

				if (
					!this.isOutOfBounds(newRow, newCol) &&
					!this.isSquareEmpty(newRow, newCol)
				) {
					return true;
				}
			}
		}
		return false;
	}

	reset() {
		for (let row = 0; row < this.rows; row++) {
			this.grid[row] = [];
			for (let col = 0; col < this.cols; col++) {
				this.grid[row][col] = [];
			}
		}
	}

	checkAlignment(row, col) {
		let maxAlignment = 1; // Start with 1 for the current card

		// Check each line (horizontal, vertical and both diagonals)
		for (const direction of DIRECTIONS) {
			let alignmentCount = 1; // Count the current card

			// Check both directions of the line
			for (const [deltaRow, deltaCol] of direction.deltas) {
				let currentRow = row + deltaRow;
				let currentCol = col + deltaCol;

				// Count consecutive same-colored cards in this direction
				while (
					!this.isOutOfBounds(currentRow, currentCol) &&
					!this.isSquareEmpty(currentRow, currentCol) &&
					this.isSameColor(row, col, currentRow, currentCol)
				) {
					alignmentCount++;
					currentRow += deltaRow;
					currentCol += deltaCol;
				}
			}
			// Keep track of the maximum alignment found
			maxAlignment = Math.max(maxAlignment, alignmentCount);
		}
		return maxAlignment;
	}

	display() {
		// Print column headers
		let headerLine = '  '; // 3 spaces for row number alignment
		for (let col = 0; col < this.cols; col++) {
			headerLine += ` ${col} `;
		}
		console.log(headerLine);

		// Print each row with row number
		for (let row = 0; row < this.grid.length; row++) {
			let line = `${row} `; // Row number with colon

			for (let col = 0; col < this.grid[row].length; col++) {
				if (this.isSquareEmpty(row, col)) {
					line += ' . ';
				} else {
					const topCard = this.getTopCard(row, col);
					line += CHALK_COLOR_MAP[topCard.color](topCard.value);
				}
			}
			console.log(line);
		}
		console.log();
	}
}
