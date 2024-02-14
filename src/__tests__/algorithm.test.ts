import { nextGeneration } from "../utils/checkNeighbours";
import { createMockGridWithPattern } from "../utils/mockGrid";

describe("Generations tests", () => {
	it("test1-cross pattern should return new pattern", () => {
		const grid = createMockGridWithPattern("test1-cross");

		// first generation
		const resultFirstGrid = nextGeneration(grid);
		const resultFirst = resultFirstGrid.map((row) =>
			row.map((cell) => cell.isAlive)
		);
		const expectedFirst = [
			[false, true, false],
			[false, true, false],
			[false, true, false],
		];
		expect(resultFirst).toEqual(expectedFirst);

		// second generation
		const resultSecond = nextGeneration(resultFirstGrid).map((row) =>
			row.map((cell) => cell.isAlive)
		);
		const expectedSecond = [
			[false, false, false],
			[true, true, true],
			[false, false, false],
		];
		expect(resultSecond).toEqual(expectedSecond);
	});

	it("test2-glider pattern should return new pattern", () => {
		const grid = createMockGridWithPattern("glider", 5, 5);

		// first generation
		const resultFirstGrid = nextGeneration(grid);
		const resultFirst = resultFirstGrid.map((row) =>
			row.map((cell) => cell.isAlive)
		);
		const expectedFirst = [
			[false, false, false, false, false],
			[false, false, false, false, false],
			[false, true, false, true, false],
			[false, false, true, true, false],
			[false, false, true, false, false],
		];
		expect(resultFirst).toEqual(expectedFirst);

		// second generation
		const resultSecond = nextGeneration(resultFirstGrid).map((row) =>
			row.map((cell) => cell.isAlive)
		);

		const expectedSecond = [
			[false, false, false, false, false],
			[false, false, false, false, false],
			[false, false, false, true, false],
			[false, true, false, true, false],
			[false, false, true, true, false],
		];
		expect(resultSecond).toEqual(expectedSecond);
	});
	it("test3-square pattern should return the same pattern - not move", () => {
		const grid = createMockGridWithPattern("test-square", 5, 5);

		// first generation
		const resultFirstGrid = nextGeneration(grid);
		const resultFirst = resultFirstGrid.map((row) =>
			row.map((cell) => cell.isAlive)
		);
		const expectedFirst = [
			[false, false, false, false, false],
			[false, true, true, false, false],
			[false, true, true, false, false],
			[false, false, false, false, false],
			[false, false, false, false, false],
		];
		expect(resultFirst).toEqual(expectedFirst);

		// second generation
		const resultSecond = nextGeneration(resultFirstGrid).map((row) =>
			row.map((cell) => cell.isAlive)
		);

		const expectedSecond = [
			[false, false, false, false, false],
			[false, true, true, false, false],
			[false, true, true, false, false],
			[false, false, false, false, false],
			[false, false, false, false, false],
		];
		expect(resultSecond).toEqual(expectedSecond);
	});
});
