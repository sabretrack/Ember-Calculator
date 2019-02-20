import Component from '@ember/component';
import ResizeAware from 'ember-resize-aware/mixins/resize-aware';

export default Component.extend(ResizeAware,{
	didRender: function() {
		this.resizeTable();
	},
	debounceRate: 50,
	didResize(){//window resized
		this.resizeTable();
	},
	resizeTable(){//Prevent Table from skewing, (equal height/width)
		let newTableWidth = document.getElementById('calc-buttons').offsetWidth;
		this.set('tableWidth',newTableWidth)
		
	},
	actions: {
		clear() {
			this.set('equation','');
		},
		input(value) {
			let currentValue = this.equation;
			this.set('equation', currentValue + value);
		},
		solve(string) {
			string = string.replace('÷','/');
			string = string.replace('×','*');
			const solution = eval(string);
			this.set('equation', solution);
		}

	}
});
