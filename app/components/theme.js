import Component from '@ember/component';

export default Component.extend({
	classNames:['theme-component'],
	setTheme(theme) {
		this.set('activeTheme', theme);
		document.getElementById("cover-page").className = "bg-"+theme;
		localStorage.setItem('localActiveTheme', JSON.stringify(theme));
	},
	didInsertElement() {
			let localStorageTheme = JSON.parse(localStorage.getItem('localActiveTheme'));

			if (localStorageTheme) {
				this.setTheme(localStorageTheme);
			} else {
				this.setTheme('light');
			}
	},
	actions: {
		setThemeAction(theme) {
			if(window.location.pathname != '/calculator') {
				document.getElementById('goToCalculator').click();
			}
			this.setTheme(theme);
		} 
	}
});
