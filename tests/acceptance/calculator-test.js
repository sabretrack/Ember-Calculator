import { module, test } from 'qunit';
import { visit, currentURL, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | calculator', function(hooks) {
	setupApplicationTest(hooks);

	test('activeTheme in <h1> title matches activeTheme in <select> themes menu', async function(assert) {
		assert.expect(3);

		await visit('/calculator');

		//ON LOAD
		let h1Title = this.element.querySelector('h1').textContent.trim();
		let selectValue = this.element.querySelector('select#ChooseTheme').value;
		assert.equal(h1Title,selectValue,'onLoad - <h1> title matches selected value of <select> themes menu');

		//ON CHANGE
		await fillIn('select#ChooseTheme', 'dark');
		h1Title = this.element.querySelector('h1').textContent;
		selectValue = this.element.querySelector('select#ChooseTheme').value;
		assert.equal(h1Title,selectValue,'onChange - <h1> title matches selected value of <select> themes menu');


		assert.equal(currentURL(), '/calculator', 'visit calculator URL is correct');
	})
});