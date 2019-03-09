import Route from '@ember/routing/route';

export default Route.extend({
	model() {
		return ({
			calculatorRoute: true,
			allThemes: this.store.findAll('theme')
		});
	}
});
