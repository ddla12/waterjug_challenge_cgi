import { computedFrom } from "aurelia-framework";
import { JugMeasure, measure, } from "./Jug";

const TIMER = 1_000;
const DEFAULT = [0, 0];
let interval: number;

export class App {
	measures: JugMeasure[] = [];
	values: Record<string, number> = {
		x: 0,
		y: 0,
		z: 0
	};
	noSolution: boolean = false;

	@computedFrom('measures.length')
	get lastMeasure() {
		console.log(this.measures);
		return this.measures.at(-1) || DEFAULT;
	}

	onSubmit(e: SubmitEvent) {
		window.clearInterval(interval);

		this.measures = [];
		this.noSolution = false;

		// We fetch the measures one by one every TIMER seconds
		const iter = measure(+this.values.x, +this.values.y, +this.values.z);

		interval = window.setInterval(() => {
			const cur = iter.next();

			if (cur.done) {
				window.clearInterval(interval);
			} else {
				(cur.value[0] === -1)
					? (this.noSolution = true)
					: this.measures.push(cur.value);
			}
		}, TIMER);

	}
}
