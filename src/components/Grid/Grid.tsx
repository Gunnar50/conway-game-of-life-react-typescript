import { useEffect, useState } from "react";
import { checkNeighbours } from "../../utils/checkNeighbours";
import Cell, { CellState } from "../Cell/Cell";
import "./grid.css";

export type GridState = CellState[][];
const speed = 100;

interface GridProps {
	numRows: number;
	numCols: number;
}

function Grid({ numRows, numCols }: GridProps) {
	const [generations, setGenerations] = useState(0);
	const [grid, setGrid] = useState<GridState>([]);
	const [startGame, setStartGame] = useState(false);

	function initializeGrid(): GridState {
		// initialize the grid state with an empty array
		const initialGrid: GridState = [];

		for (let row = 0; row < numRows; row++) {
			// create the current empty row array
			const currentRow: CellState[] = [];

			for (let col = 0; col < numCols; col++) {
				// collect the position and the status
				const cellPos = { x: row, y: col };

				const newCell: CellState = {
					position: cellPos,
					isAlive: false,
					isDead: true,
				};
				// push this new cell to the current row
				currentRow.push(newCell);
			}
			// push the whole row to the grid array
			initialGrid.push(currentRow);
		}
		return initialGrid;
	}

	useEffect(() => {
		setGrid(initializeGrid());
	}, [numRows, numCols]);

	function nextGeneration() {
		const nextGrid = grid.map((row, x) =>
			row.map((cell, y) => {
				const aliveNeighbors = checkNeighbours(grid, { x, y });

				// Apply the Game of Life rules here directly
				if (cell.isAlive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
					return { ...cell, isAlive: false, isDead: true };
				} else if (!cell.isAlive && aliveNeighbors === 3) {
					return { ...cell, isAlive: true, isDead: false };
				}
				return cell;
			})
		);

		// update the state with the new grid
		setGrid(nextGrid);
		setGenerations((gen) => gen + 1);
	}

	useEffect(() => {
		let interval: number | undefined;
		if (startGame) {
			interval = setInterval(nextGeneration, speed);
		}

		// Cleanup interval
		return () => clearInterval(interval);
	}, [startGame, grid]);

	function clearCells(): void {
		setGrid(initializeGrid());
	}

	function handleCellClick(row: number, col: number): void {
		// create a copy of the grid and toggle the current cell status
		const newGrid = grid.map((gridRow, r) =>
			gridRow.map((cell, c) => {
				if (r === row && c === col) {
					cell.isAlive = !cell.isAlive;
					cell.isDead = !cell.isDead;
				}
				return cell;
			})
		);
		setGrid(newGrid);
	}

	function randomizeGrid() {
		const newGrid = grid.map((gridRow) =>
			gridRow.map((cell) => {
				if (Math.random() > 0.5) {
					return { ...cell, isAlive: true, isDead: false };
				}
				return cell;
			})
		);
		setGrid(newGrid);
	}

	return (
		<>
			<button onClick={() => setStartGame(true)}>Start</button>
			<button onClick={() => setStartGame(false)}>Stop</button>
			<button onClick={nextGeneration}>Next Generation</button>
			<button onClick={clearCells}>Clear Cells</button>
			<button onClick={randomizeGrid}>Randomize Grid</button>

			<p>{generations}</p>
			<div className="grid">
				{grid.map((row: CellState[], rowIndex: number) => (
					<div key={rowIndex} className="grid-row">
						{row.map((cell, colIndex) => (
							<Cell key={colIndex} cell={cell} onMouseDown={handleCellClick} />
						))}
					</div>
				))}
			</div>
		</>
	);
}

export default Grid;
