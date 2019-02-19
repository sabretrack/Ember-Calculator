import Component from '@ember/component'; 
//import { inject } from '@ember/service';

export default Component.extend({
	//defaultTheme: inject('active-theme'),
	//defaultTheme: 'light',
	SetThemeOnLoad(theme) {
		this.set('activeTheme', theme);
		//localStorage.setItem('activeTheme', JSON.stringify(theme));
	},
	/*init: function() {
			console.log('INIT');
			this.set('activeTheme', this.defaultTheme.activeTheme);	
			//this.set('activeTheme', this.defaultTheme);
			return this._super();
	},*/
	didInsertElement() {
		//this.SetThemeOnLoad(this.defaultTheme.activeTheme);
		var localStorageTheme = JSON.parse(localStorage.getItem('localActiveTheme'));

			if (localStorageTheme) {
				this.SetThemeOnLoad(localStorageTheme);
			} else {
				this.SetThemeOnLoad('light');
			}

		
	},
	actions: {
		setTheme(theme) {
			this.set('activeTheme', theme);
			localStorage.setItem('localActiveTheme', JSON.stringify(theme));
		} 
	}
});
