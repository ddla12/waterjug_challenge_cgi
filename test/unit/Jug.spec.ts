import { measure } from "../../src/Jug";

test('Measure function works for x=3, y=5 and z=4', () => {
	const iter = measure(3, 5, 4);

	expect(iter.next().value).toEqual([0, 5]);
	expect(iter.next().value).toEqual([3, 2]);
	expect(iter.next().value).toEqual([0, 2]);
	expect(iter.next().value).toEqual([2, 0]);
	expect(iter.next().value).toEqual([2, 5]);
	expect(iter.next().value).toEqual([3, 4]);
	expect(iter.next().done).toBe(true);
});

test("measure takes 4 steps from x=2, y=100 and z=96", () => {
	const iter = measure(2, 100, 96);
	let steps = 0;

	while(!iter.next().done) steps++;

	expect(steps).toBe(4);
});

test("measure takes 4 steps from x=2, y=10 and z=4", () => {
	const iter = measure(2, 10, 4);
	let steps = 0;

	while(!iter.next().done) steps++;

	expect(steps).toBe(4);
});

const INVALID = [-1, -1];

test("measure function return [-1, -1] with negative numbers", () => {
	const iter = measure(-1, -1, -1);

	expect(iter.next().value).toEqual(INVALID);	
});

test("measure function return [-1, -1] when z % GCD(x, y) != 0", () => {
	const iter = measure(2, 6, 5);

	expect(iter.next().value).toEqual(INVALID);
});

test("measure function return [-1, -1] when z > (x + y)", () => {
	const iter = measure(1, 2, 4);

	expect(iter.next().value).toEqual(INVALID);
});

