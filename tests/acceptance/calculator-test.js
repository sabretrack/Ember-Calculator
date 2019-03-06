import { module, test } from 'qunit';
import { visit, currentURL, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | calculator', function(hooks) {
	setupApplicationTest(hooks);

	test('activeTheme in <h1> title matches activeTheme in <select> themes menu', async function(assert) {
		assert.expect(3);

		await visit('/calculator');

		//ON LOAD
		let h1Title = this.element.querySelector('h1');
		let selectValue = this.element.querySelector('select#ChooseTheme');
		assert.equal( h1Title.textContent.trim(), selectValue.value, 'onLoad - <h1> title matches selected value of <select> themes menu');

		//ON CHANGE
		await fillIn('select#ChooseTheme', 'dark');
		assert.equal( h1Title.textContent.trim(), selectValue.value, 'onChange - <h1> title matches selected value of <select> themes menu');


		assert.equal(currentURL(), '/calculator', 'visit calculator URL is correct');
	})
});