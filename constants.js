import chalk from 'chalk';

export const GAME_STATES = new Set(['']);
export const VALID_CARD_VALUES = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
export const VALID_CARD_COLORS = new Set(['blue', 'green', 'yellow', 'red']);
export const DIRECTIONS = [
	{
		name: 'horizontal',
		deltas: [
			[0, 1], // Right
			[0, -1], // Left
		],
	},
	{
		name: 'vertical',
		deltas: [
			[-1, 0], // Up
			[1, 0], // Down
		],
	},
	{
		name: 'diagonal1',
		deltas: [
			[-1, 1], // Upper right
			[1, -1], // Lower Left
		],
	},
	{
		name: 'diagonal2',
		deltas: [
			[1, 1], // Lower right
			[-1, -1], // Upper left
		],
	},
];

export const CHALK_COLOR_MAP = {
	blue: value => chalk.bgBlue.white(` ${value} `),
	green: value => chalk.bgGreen.white(` ${value} `),
	yellow: value => chalk.bgYellow.black(` ${value} `),
	red: value => chalk.bgRed.white(` ${value} `),
};
