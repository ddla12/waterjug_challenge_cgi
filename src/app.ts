import { JugMeasure, measure } from "./Jug";

const TIMER = 1_000;
let interval: number;

export class App {
	measures: JugMeasure[] = [];
	values: Record<string, number> = {
		x: 0,
		y: 0,
		z: 0
	};
	noSolution: boolean = false;

	onSubmit(e: SubmitEvent) {
		this.measures = [];
		this.noSolution = false;
		const iter = measure(+this.values.x, +this.values.y, +this.values.z);

		interval = window.setInterval(() => {
			const cur = iter.next();

			if (cur.done) {
				clearInterval(interval);
			} else {
				(cur.value[0] === -1)
					? (this.noSolution = true)
					: this.measures.push(cur.value);
			}
		}, TIMER);

	}
}
