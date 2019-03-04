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
    this.set('activeTheme', 'light');
    this.set('themes', themes);

    /* TODO: get localstorage value for active Theme and test */

    await render(hbs `<Theme @themes={{themes}} @activeTheme={{activeTheme}} />` );
    
    let optionSelectedValue = this.element.querySelector('option:checked').value;
    assert.equal(this.activeTheme, optionSelectedValue, 'Active theme is selected in <select> menu');

  });

});
