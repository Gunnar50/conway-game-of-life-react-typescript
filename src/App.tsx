import { useEffect, useState } from "react";
import { CellState } from "./components/Cell/Cell";
import Grid from "./components/Grid/Grid";

export type GridState = CellState[][];

function App() {
	const navbarHeight = 150;
	const textHeight = 60;
	const [dimensions, setDimensions] = useState({ height: 5, width: 5 });

	useEffect(() => {
		const calculateDimensions = () => {
			const height = Math.floor(
				(window.innerHeight - navbarHeight - textHeight) / 28
			);
			const width = Math.floor(window.innerWidth / 25);
			setDimensions({ height, width });
		};

		calculateDimensions();

		return () => window.removeEventListener("resize", calculateDimensions);
	}, []);

	return (
		<>
			<Grid numRows={dimensions.height} numCols={dimensions.width} />
		</>
	);
}

export default App;