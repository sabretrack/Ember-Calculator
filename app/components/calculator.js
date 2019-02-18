import Component from '@ember/component';

export default Component.extend({
	init: function() {
			this.set('activeTheme', this.defaultTheme.activeTheme);	
			//this.set('activeTheme', this.defaultTheme);
			return this._super();
	}
});
