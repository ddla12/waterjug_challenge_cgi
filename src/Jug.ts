export class Jug {
	protected _gallons: number = 0;
	
	get gallons() {
		return this._gallons;
	}

	protected get isFull() {
		return this.gallons === this.capacity;
	}

	protected get isEmpty() {
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

export function *measure(x: number, y: number, z: number): Generator<JugMeasure> {
	if (((x + y) / z) % 1 !== 0) {
		yield [-1, -1];
		return;
	}

	const [max, min] = (x > y) ? [x, y] : [y, x];
	const [bigger, smaller] = [new Jug(max), new Jug(min)];
	const tuple = (): JugMeasure => [smaller.gallons, bigger.gallons];

	if (z <= (max + min) / 2) {
		while(1) {
			smaller.fill();

			yield tuple();

			if(smaller.gallons === z)	
				break;

			smaller.transfer(bigger);

			yield tuple();

			if(bigger.gallons === z)
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

			smaller.empty();
		}
	}
}

