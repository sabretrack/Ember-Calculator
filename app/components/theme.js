import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Location from '@ember/routing/location';


export default Component.extend({
	serviceTheme: service('theme'),
	classNames:['theme-component'],
	thisURL: Location._location.pathname,
	setTheme(theme) {
		//set active theme at application level
		this.serviceTheme.set('activeTheme', theme);

		//set active theme at component level
		this.set('activeTheme', theme);

		//set active theme in localstorage
		localStorage.setItem('localActiveTheme', JSON.stringify(theme));
	},
	didInsertElement() {

			let localStorageTheme = JSON.parse(localStorage.getItem('localActiveTheme'));
			//if localstorage theme is set, use it
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

			//if on homepage and select theme, send me to calculator page
			if(this.thisURL != '/calculator') {
				this.element.querySelector('#goToCalculator').click();
			}
			
			this.setTheme(theme);
		} 
	}
});
