import { useEffect, useState } from "react";
import { checkNeighbours, randomizeGrid } from "../../utils/checkNeighbours";
import { applyPattern } from "../../utils/patterns";
import Cell, { CellState } from "../Cell/Cell";
import Nav from "../Nav/Nav";
import "./grid.css";

export type GridState = CellState[][];

const initialSpeed = 100;

interface GridProps {
	numRows: number;
	numCols: number;
}

function Grid({ numRows, numCols }: GridProps) {
	const [generations, setGenerations] = useState(0);
	const [grid, setGrid] = useState<GridState>([]);
	const [startGame, setStartGame] = useState(false);
	const [speed, setSpeed] = useState(initialSpeed);

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
					return { ...cell, isAlive: false };
				} else if (!cell.isAlive && aliveNeighbors === 3) {
					return { ...cell, isAlive: true };
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
	}, [startGame, grid, speed]);

	function clearCells(): void {
		setGrid(initializeGrid());
		setGenerations(0);
		setStartGame(false);
	}

	function handleCellClick(row: number, col: number): void {
		// create a copy of the grid and toggle the current cell status
		const newGrid = grid.map((gridRow, r) =>
			gridRow.map((cell, c) => {
				if (r === row && c === col) {
					cell.isAlive = !cell.isAlive;
				}
				return cell;
			})
		);
		setGrid(newGrid);
	}

	function handleRandomizeGrid() {
		setGrid(randomizeGrid(grid));
	}

	function handlePattern(patternName: string) {
		setGrid(applyPattern(grid, patternName));
	}

	return (
		<>
			<Nav
				startGame={startGame}
				setStartGame={setStartGame}
				clearCells={clearCells}
				randomizeGrid={handleRandomizeGrid}
				nextGeneration={nextGeneration}
				setSpeed={setSpeed}
				generations={generations}
				handlePattern={handlePattern}
			/>

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
