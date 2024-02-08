import { useState } from "react";
import { randomizeGrid } from "../../utils/checkNeighbours";
import "./nav.css";

interface NavProps {
	startGame: boolean;
	setStartGame: (value: boolean) => void;
	clearCells: () => void;
	randomizeGrid: () => void;
	nextGeneration: () => void;
	setSpeed: (value: number) => void;
	generations: number;
}

function NavBar({
	startGame,
	setStartGame,
	clearCells,
	nextGeneration,
	randomizeGrid,
	setSpeed,
	generations,
}: NavProps) {
	function handleSpeedChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const value = e.target.value;
		switch (value) {
			case "very-slow":
				setSpeed(400);
				break;
			case "slow":
				setSpeed(150);
				break;
			case "normal":
				setSpeed(100);
				break;
			case "fast":
				setSpeed(50);
				break;
			case "very-fast":
				setSpeed(5);
				break;

			default:
				break;
		}
	}
	return (
		<div className="nav-bar-bg">
			<div className="nav-bar">
				<ul className="nav-links">
					<li>
						<a href="#" onClick={() => setStartGame(!startGame)}>
							{startGame ? "Stop" : "Start"}
						</a>
					</li>
					<li>
						<a href="#" onClick={clearCells}>
							Reset
						</a>
					</li>
					<li>
						<a href="#" onClick={nextGeneration}>
							Next Generation
						</a>
					</li>
					<li>
						<a href="#" onClick={randomizeGrid}>
							Randomize Grid
						</a>
					</li>
					<li>
						<p>Generations: {generations}</p>
					</li>
				</ul>
				<div>
					<select
						className="speed-select"
						defaultValue="normal"
						onChange={handleSpeedChange}
					>
						<option value="" disabled>
							Select Speed
						</option>
						<option value="very-slow">Very Slow</option>
						<option value="slow">Slow</option>
						<option value="normal">Normal</option>
						<option value="fast">Fast</option>
						<option value="very-fast">Very Fast</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
