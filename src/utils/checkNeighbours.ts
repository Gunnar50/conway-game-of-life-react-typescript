import { GridState } from "../components/Grid/Grid";

export function nextGeneration(grid: GridState) {
	return grid.map((row, x) =>
		row.map((cell, y) => {
			const aliveNeighbors = checkNeighbours(grid, { x, y });

			// apply the Game of Life rules
			// Any live cell with fewer than two live neighbours dies (referred to as underpopulation).
			// Any live cell with more than three live neighbours dies (referred to as overpopulation).
			// Any live cell with two or three live neighbours lives, unchanged, to the next generation.
			// Any dead cell with exactly three live neighbours comes to life.
			if (cell.isAlive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
				return { ...cell, isAlive: false };
			} else if (!cell.isAlive && aliveNeighbors === 3) {
				return { ...cell, isAlive: true };
			}
			return cell;
		})
	);
}

export function checkNeighbours(
	grid: GridState,
	position: { x: number; y: number }
) {
	let aliveNeighbours = 0;
	const { x, y } = position;

	const directions = [
		[-1, 0], // up
		[1, 0], // down
		[0, -1], // left
		[0, 1], // right
		[-1, -1], // up-left
		[-1, 1], // up-right
		[1, -1], // down-left
		[1, 1], // down-right
	];

	directions.forEach(([dx, dy]) => {
		const newX = x + dx;
		const newY = y + dy;

		// check if the new position is within the bounds of the grid
		if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
			const currentNeighbour = grid[newX][newY];
			// check if the neighbor is alive
			if (currentNeighbour.isAlive) {
				aliveNeighbours += 1;
			}
		}
	});

	return aliveNeighbours;
}

export function randomizeGrid(grid: GridState) {
	const newGrid = grid.map((gridRow) =>
		gridRow.map((cell) => {
			if (Math.random() > 0.5) {
				return { ...cell, isAlive: true };
			}
			return cell;
		})
	);
	return newGrid;
}
