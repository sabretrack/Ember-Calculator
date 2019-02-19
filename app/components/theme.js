import Component from '@ember/component';

export default Component.extend({
	SetThemeOnLoad(theme) {
		this.set('activeTheme', theme);
	},
	didInsertElement() {
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
