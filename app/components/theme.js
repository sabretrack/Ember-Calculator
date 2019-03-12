import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({
	router: service(),
	serviceTheme: service('theme'),
	classNames:['theme-component'],
	setTheme(theme) {
		//set active theme at application level
		this.serviceTheme.set('activeTheme', theme);

		//set active theme at component level
		this.set('activeTheme', theme);

		//set active theme in localstorage
		localStorage.setItem('localActiveTheme', JSON.stringify(theme));
	},
	didInsertElement() {

			//if localstorage theme is set, use it
			let localStorageTheme = JSON.parse(localStorage.getItem('localActiveTheme'));
			if (localStorageTheme) 
			{
				this.setTheme(localStorageTheme);
			} 
			//else get default theme from "services/theme"
			else 
			{
				let defaultTheme = this.serviceTheme.get('activeTheme');
				this.setTheme(defaultTheme);
			}
	},
	actions: {
		setThemeAction(theme) {

			//if not on calculator page and select theme, send me to calculator page
			if(this.get('router').currentURL != '/calculator') {
				this.get('router').transitionTo('calculator');
			}
			
			this.setTheme(theme);
		} 
	}
});
