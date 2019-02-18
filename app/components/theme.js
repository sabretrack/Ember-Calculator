import Component from '@ember/component'; 
//import { inject } from '@ember/service';

export default Component.extend({
	//defaultTheme: inject('active-theme'),
	//defaultTheme: 'light',
	triggerSetTheme(theme) {
		this.set('activeTheme', theme);
	},
	/*init: function() {
			console.log('INIT');
			this.set('activeTheme', this.defaultTheme.activeTheme);	
			//this.set('activeTheme', this.defaultTheme);
			return this._super();
	},*/
	didInsertElement() {
		this.triggerSetTheme(this.defaultTheme.activeTheme);
	},
	actions: {
		setTheme(theme) {
			this.set('activeTheme', theme);
		} 
	}
});
