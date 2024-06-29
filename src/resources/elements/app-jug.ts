import {bindable, computedFrom} from 'aurelia-framework';

export class AppJug {
	@bindable capacity: number;
	@bindable currentLevel: number;

	get gradient() {
		const value = (+this.currentLevel * 100) / (+this.capacity || 1);
		
		if(value === 0)
			return "background-color: white;";

		return `background-image: linear-gradient(to top, #5ebfff ${value}%, white ${value}%);`
	}
}
