import Component from '@ember/component';
import ResizeAware from 'ember-resize-aware/mixins/resize-aware';

export default Component.extend(ResizeAware,{
	didRender: function() {//on load
		this.resizeTable();
	},
	debounceRate: 50,
	didResize(){//on window resize
		this.resizeTable();
	},
	resizeTable(){//Prevent Table from skewing, (equal height/width)
		let newTableWidth = document.getElementById('calc-buttons').offsetWidth;
		this.set('tableWidth',newTableWidth)
		
	},

	solved: false,
	actions: {

		//-------clear calculator
		clear() {
			this.set('equation','0');
			this.solved = false;
		},

		//-------create equation
		input(value) {
			let currentValue = String(this.equation);
			let solved = this.solved;
			//if solved and clicked a number or decimal, reset the calculator
			if(solved && !isNaN(value) || solved && value == ".") {
				//this.solved = false;
				currentValue = '0';
				this.set('equation','0');
			}
			
			//if calculator is blank or reset, remove default zero and replace with clicked number
			if(currentValue == '0' && !isNaN(value)) {
				currentValue = '';
			}

			//prevent multiple operators next to each other
			let lastChar = currentValue[currentValue.length -1];
			if(isNaN(lastChar) && isNaN(value) && isNaN(currentValue) || value == "." ) {

				//replace operator with new one
				if(value != '.') 
				{
					currentValue = currentValue.slice(0, -1);
				} 
				//prevent too many decimal points
				else 
				{
					let operators = ["×","÷","-","+"];
					let lastOperator = 0;
					let self = this;
					operators.forEach(function(v) {

						//get position of last operator in equation
						v = self.equation.lastIndexOf(v);
						if(lastOperator < v) {
							lastOperator = v;
						}

					});

					//get position of last decimal in equation
					let lastDecimal = this.equation.lastIndexOf(".");

					//compare operator position vs decimal position
					if(lastDecimal > lastOperator) {
						//
						value = '';
					}
				}
			}
			this.solved = false;
			this.set('equation', currentValue + value);
		},

		//-------solve equation
		solve(string) {

			//convert equation into string
			string = String(string);
			if(string.indexOf("÷") || string.indexOf("×")) {
				string = string.replace(/÷/g,'/');
				string = string.replace(/×/g,'*');
			}
			
			//remove last character if not a number
			let lastChar = string[string.length -1];
			if(isNaN(lastChar)) {
				string = string.slice(0, -1);
			}
			
			//solve equation
			let solution = eval(string);
			solution = Math.round((solution) * 1e12) / 1e12;

			this.set('equation', solution);
			this.solved = true;
		}

	}
});
