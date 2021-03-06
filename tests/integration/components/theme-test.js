import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | theme', function(hooks) {
  setupRenderingTest(hooks);

  test('Themes are loaded and activeTheme is selected in <select> menu', async function(assert) {
    assert.expect(2);

    this.owner.lookup('router:main').setupRouter();

    let themes = [
      {'class-name': 'light', 'name': 'Light'}, 
      {'class-name': 'dark', 'name': 'Dark'}, 
      {'class-name': 'colors', 'name': 'Colors'} 
    ];

    /* TODO: test if localStorage active theme is captured correctly*/
    let localStorageTheme = JSON.parse(localStorage.getItem('localActiveTheme'));
    let activeTheme = localStorageTheme ? localStorageTheme : 'default';

    this.set('activeTheme',activeTheme);
    this.set('themes', themes);

    await render(hbs `<Theme @themes={{themes}} @activeTheme={{activeTheme}} @onChange={{action (mut activeTheme)}} />`);

    //ON LOAD
    let optionSelectedValue = this.element.querySelector('option:checked').value;
    assert.equal(this.activeTheme, optionSelectedValue, 'on load - Active theme ('+ optionSelectedValue +') is selected in <select> menu');

    //ON CHANGE
    await fillIn('select#ChooseTheme', 'default');
    assert.equal(this.element.querySelector('select#ChooseTheme').value, this.activeTheme, 'onChange - <select> changes the activeTheme');

  });

});
