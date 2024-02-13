import { GridState } from "../App";
import { translatePattern } from "./translatePatterns";

interface Patterns {
	[key: string]: boolean[][];
}

const patterns: Patterns = {
	glider: translatePattern("bob$2bo$3o"),
	"test-square": translatePattern("2o$2o"),
	"snark loop": translatePattern(
		"27b2o$27bobo$29bo4b2o$25b4ob2o2bo2bo$25bo2bo3bobob2o$28bobobobo$29b2obobo$33bo2$19b2o$20bo8bo$20bobo5b2o$21b2o$35bo$36bo$34b3o2$25bo$25b2o$24bobo4b2o22bo$31bo21b3o$32b3o17bo$34bo17b2o2$45bo$46b2o12b2o$45b2o14bo$3b2o56bob2o$4bo9b2o37bo5b3o2bo$2bo10bobo37b2o3bo3b2o$2b5o8bo5b2o35b2obo$7bo13bo22b2o15bo$4b3o12bobo21bobo12b3o$3bo15b2o22bo13bo$3bob2o35b2o5bo8b5o$b2o3bo3b2o37bobo10bo$o2b3o5bo37b2o9bo$2obo56b2o$3bo14b2o$3b2o12b2o$19bo2$11b2o17bo$12bo17b3o$9b3o21bo$9bo22b2o4bobo$38b2o$39bo2$28b3o$28bo$29bo$42b2o$35b2o5bobo$35bo8bo$44b2o2$31bo$30bobob2o$30bobobobo$27b2obobo3bo2bo$27bo2bo2b2ob4o$29b2o4bo$35bobo$36b2o"
	),
	copperhead: translatePattern(
		"5bob2o$4bo6bo$3b2o3bo2bo$2obo5b2o$2obo5b2o$3b2o3bo2bo$4bo6bo$5bob2o"
	),
	"gosper glider gun": translatePattern(
		"24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8bo3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o"
	),
	"test1-cross": translatePattern("b3ob"),
};

export function applyPattern(grid: GridState, patternName: string) {
	const pattern = patterns[patternName];
	if (!pattern) {
		console.error("Pattern not found:", patternName);
		return grid;
	}

	// make a copy of the grid
	const newGrid = JSON.parse(JSON.stringify(grid));
	// calculate the pattern size
	const patternHeight = pattern.length;
	// taking the longest array for the width
	const patternWidth = pattern.reduce(
		(max, row) => Math.max(max, row.length),
		0
	);

	const startRow = Math.floor((grid.length - patternHeight) / 2);
	const startCol = Math.floor((grid[0].length - patternWidth) / 2);

	for (let row = 0; row < patternHeight; row++) {
		for (let col = 0; col < patternWidth; col++) {
			const gridRow = startRow + row;
			const gridCol = startCol + col;
			if (grid[gridRow] && grid[gridRow][gridCol]) {
				newGrid[gridRow][gridCol].isAlive = pattern[row][col];
			}
		}
	}

	return newGrid;
}
