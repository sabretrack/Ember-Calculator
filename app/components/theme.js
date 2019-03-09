import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({
	router: service(),
	serviceTheme: service('theme'),
	classNames:['theme-component'],
	isCalculatorRoute: false,
	setTheme(theme) {
		//set active theme at application level
		this.serviceTheme.set('activeTheme', theme);

		//set active theme at component level
		this.set('activeTheme', theme);

		//set active theme in localstorage
		localStorage.setItem('localActiveTheme', JSON.stringify(theme));
	},
	didInsertElement() {
			//determine if it's the calculator route
			if(this.calculatorRoute) {
				this.isCalculatorRoute = true;
			} else {
				this.isCalculatorRoute = false;
			}

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

			//if on homepage and select theme, send me to calculator page
			//if(this.get('router').currentURL != '/calculator') {
			if(!this.isCalculatorRoute) {
				this.get('router').transitionTo('calculator');
			}
			
			this.setTheme(theme);
		} 
	}
});
