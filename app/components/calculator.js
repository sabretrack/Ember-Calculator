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
			this.set('equation','0');
		},
		input(value) {

			let currentValue = this.equation;
			
			if(currentValue == '0' && !isNaN(value) ) {
				currentValue = ''
			}

			let lastChar = currentValue[currentValue.length -1];
			if(isNaN(lastChar) && isNaN(value) && isNaN(currentValue) ) {//prevent multiple operators
				if(value != '.') {
					currentValue = currentValue.slice(0, -1);//replace operator with new one
				}
			}

			this.set('equation', currentValue + value);

		},
		solve(string) {

			string = String(string);//convert to string
			if(string.includes("÷") || string.includes("×")) {
				string = string.replace('÷','/');
				string = string.replace('×','*');
			}

			let lastChar = string[string.length -1];
			if(isNaN(lastChar)) {
				string = string.slice(0, -1);//remove last character if not a number
			}

			let solution = eval(string);//solve equation
			this.set('equation', solution);
		}

	}
});
