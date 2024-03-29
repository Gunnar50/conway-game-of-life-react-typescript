import { useEffect, useState } from "react";
import { nextGeneration } from "../../utils/checkNeighbours";
import { clearGrid, randomizeGrid } from "../../utils/gridUtils";
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

interface Trigger {
	type: "random" | "pattern";
	patternName?: string;
}

function Grid({ numRows, numCols }: GridProps) {
	const [generations, setGenerations] = useState(0);
	const [grid, setGrid] = useState<GridState>([]);
	const [startGame, setStartGame] = useState(false);
	const [speed, setSpeed] = useState(initialSpeed);
	const [updateTrigger, setUpdateTrigger] = useState<Trigger | null>(null);

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

	function handleNextGeneration() {
		// update the state with the new grid
		setGrid(nextGeneration(grid));
		setGenerations((gen) => gen + 1);
	}

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (startGame) {
			interval = setInterval(handleNextGeneration, speed);
		}

		// Cleanup interval
		return () => clearInterval(interval);
	}, [startGame, grid, speed]);

	function clearCells(): void {
		console.log("clearCells");
		setGrid(clearGrid(grid));
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
		clearCells();
		setUpdateTrigger({ type: "random" });
	}

	function handlePatternChange(patternName: string) {
		clearCells();
		setUpdateTrigger({ type: "pattern", patternName });
	}

	useEffect(() => {
		if (updateTrigger) {
			if (updateTrigger.type === "random") {
				setGrid(randomizeGrid(grid));
			} else if (
				updateTrigger.type === "pattern" &&
				updateTrigger.patternName
			) {
				setGrid(applyPattern(grid, updateTrigger.patternName));
			}
			setUpdateTrigger(null); // Reset trigger
		}
	}, [updateTrigger, grid]);

	return (
		<>
			<Nav
				startGame={startGame}
				setStartGame={setStartGame}
				clearCells={clearCells}
				randomizeGrid={handleRandomizeGrid}
				nextGeneration={handleNextGeneration}
				setSpeed={setSpeed}
				generations={generations}
				handlePatternChange={handlePatternChange}
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
