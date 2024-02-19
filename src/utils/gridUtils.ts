import { GridState } from "../components/Grid/Grid";

export function randomizeGrid(grid: GridState) {
	return grid.map((gridRow) =>
		gridRow.map((cell) => {
			if (Math.random() > 0.5) {
				return { ...cell, isAlive: true };
			}
			return cell;
		})
	);
}

export function clearGrid(grid: GridState) {
	return grid.map((gridRow) =>
		gridRow.map((cell) => {
			return { ...cell, isAlive: false };
		})
	);
}
