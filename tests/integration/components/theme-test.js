import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | theme', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders active theme', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    let activeTheme = 'light';

    this.set('activeTheme', activeTheme);
    await render(hbs `<Theme activeTheme={{activeTheme}} />`);
    //await render(hbs `{{theme activeTheme=activeTheme}}`);

    //assert.async();
    assert.equal(this.element.querySelector('.theme-component').getAttribute('activetheme'), activeTheme, 'Active theme is set for component');

  });

});
