import { GridState } from "../components/Grid/Grid";
import { applyPattern } from "./patterns";

export function createMockGridEmpty(
	rows: number = 3,
	cols: number = 3
): GridState {
	const grid: GridState = [];
	for (let x = 0; x < rows; x++) {
		grid[x] = [];
		for (let y = 0; y < cols; y++) {
			grid[x][y] = {
				position: { x, y },
				isAlive: false,
			};
		}
	}
	return grid;
}

export function createMockGridWithPattern(
	patternName: string,
	rows: number = 3,
	cols: number = 3
) {
	/**
	 * creates a 3x3 grid
	 * add a pattern to the grid
	 * patterns are 2d arrays with true and false values for dead or alive cells
	 */
	const emptyGrid: GridState = createMockGridEmpty(rows, cols);
	const grid: GridState = applyPattern(emptyGrid, patternName);

	return grid;
}
