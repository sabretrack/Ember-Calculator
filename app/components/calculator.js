import Component from '@ember/component';

export default Component.extend({
	actions: {
		clear() {
			this.set('equation','');
		},
		input(value) {
			var currentValue = this.equation;
			this.set('equation', currentValue + value);
		},
		solve(string) {
			string = string.replace('÷','/');
			string = string.replace('×','*');
			//string = string.replace('-','-');
			//string = string.replace('+','+');
			var solution = eval(string);
			this.set('equation', solution);
		}

	}
});
