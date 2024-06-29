export class Jug {
	protected _gallons: number = 0;
	
	get gallons() {
		return this._gallons;
	}

	protected get isFull() {
		return this.gallons === this.capacity;
	}

	get isEmpty() {
		return this.gallons === 0;
	}

	constructor(
		private readonly capacity: number,
	) {}

	fill() {
		this._gallons = this.capacity;
	}

	empty() {
		this._gallons = 0;
	}

	transfer(to: Jug) {
		while(!this.isEmpty && !to.isFull) {
			this._gallons--;
			to._gallons++;
		}
	}
}

export type JugMeasure = [number, number];

function gcd(x: number, y: number) {
	if(!y)
		return x;

	return gcd(y, x % y);
}

// Because I'm using an endless loop it is better to use a generator (also from UI purposes)
export function *measure(x: number, y: number, z: number): Generator<JugMeasure> {
	// https://www.interviewbit.com/blog/water-jug-problem/#mathematical-approach
	if ([x, y, z].some((i) => i < 0) || (x + y) <= z || z % gcd(x, y) !== 0) {
		yield [-1, -1];
		return;
	}

	const [max, min] = (x > y) ? [x, y] : [y, x];
	const [bigger, smaller] = [new Jug(max), new Jug(min)];
	const tuple = (): JugMeasure => [smaller.gallons, bigger.gallons];

	// If z is less than half of the full capacity we take the smaller jug approach
	if (z < (max + min) / 2) {
		while(1) {
			smaller.fill();

			yield tuple();

			if(smaller.gallons === z)	
				break;

			smaller.transfer(bigger);

			yield tuple();

			if(bigger.gallons === z || smaller.gallons === z)
				break;

			smaller.empty();
		}	
	} else {
		bigger.fill();
		
		while(1) {
			yield tuple();

			if(bigger.gallons === z)
				break;
			
			bigger.transfer(smaller);

			yield tuple();

			if(bigger.gallons === z || smaller.gallons === z)
				break;

			(bigger.isEmpty)
				? bigger.fill()
				: smaller.empty();
		}
	}
}

