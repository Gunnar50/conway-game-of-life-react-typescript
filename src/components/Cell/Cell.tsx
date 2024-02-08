import { useRef } from "react";
import "./cell.css";

export interface CellPosition {
	x: number;
	y: number;
}

export interface CellState {
	position: CellPosition;
	isAlive: boolean;
}

interface CellProps {
	cell: CellState;
	onMouseDown: (row: number, col: number) => void;
}

function Cell({ cell, onMouseDown }: CellProps) {
	const cellRef = useRef(null);
	const cellId = `cell-${cell.position.x}-${cell.position.y}`;

	return (
		<div
			id={cellId}
			ref={cellRef}
			className={`cell${cell.isAlive ? " cell-alive" : ""}`}
			onMouseDown={() => onMouseDown(cell.position.x, cell.position.y)}
		></div>
	);
}

export default Cell;
