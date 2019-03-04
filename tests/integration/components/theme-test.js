import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | theme', function(hooks) {
  setupRenderingTest(hooks);

  test('Themes are loaded and activeTheme is selected in <select> menu', async function(assert) {

    let themes = [
      {'class-name': 'light', 'name': 'Light'}, 
      {'class-name': 'dark', 'name': 'Dark'}, 
      {'class-name': 'colors', 'name': 'Colors'} 
    ];

    /* TODO: test if localStorage active theme is captured correctly*/
    let localStorageTheme = JSON.parse(localStorage.getItem('localActiveTheme'));
    let activeTheme = localStorageTheme ? localStorageTheme : 'light';

    this.set('activeTheme',activeTheme);
    this.set('themes', themes);

    await render(hbs `<Theme @themes={{themes}} @activeTheme={{activeTheme}} />` );
    
    let optionSelectedValue = this.element.querySelector('option:checked').value;
    assert.equal(this.activeTheme, optionSelectedValue, 'Active theme ('+ optionSelectedValue +') is selected in <select> menu');

  });

});
