// this function helps translate the patterns from the original game of life
// https://conwaylife.com/wiki/Run_Length_Encoded

export function translatePattern(pattern: string): boolean[][] {
	return pattern.split("$").map((row) => {
		const translatedRow: boolean[] = [];
		let i = 0;
		while (i < row.length) {
			const char = row[i];
			if (char === "b") {
				translatedRow.push(false);
				i++;
			} else if (char === "o") {
				translatedRow.push(true);
				i++;
			} else if (!isNaN(parseInt(char, 10))) {
				// It's a digit, calculate the run length
				let runLength = parseInt(char, 10);
				i++;
				// Check if next character is also a digit (for numbers > 9)
				while (i < row.length && !isNaN(parseInt(row[i], 10))) {
					runLength = runLength * 10 + parseInt(row[i], 10);
					i++;
				}
				const nextChar = row[i];
				const cellState = nextChar === "o";
				for (let j = 0; j < runLength; j++) {
					translatedRow.push(cellState);
				}
				i++; // Move past the character ('b' or 'o')
			}
		}
		return translatedRow;
	});
}
