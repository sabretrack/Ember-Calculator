import Service from '@ember/service';

export default Service.extend({
	activeTheme: 'light',
	setTheme(){
		return this.get('activeTheme');
	}
});
