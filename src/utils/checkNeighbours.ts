import { GridState } from "../components/Grid/Grid";

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
			if (!currentNeighbour.isDead) {
				aliveNeighbours += 1;
			}
		}
	});

	return aliveNeighbours;
}

export function randomizeGrid(grid: GridState) {
	for (const row of grid) {
		for (const cell of row) {
			cell.isAlive = Math.random() > 0.5;
		}
	}
}
