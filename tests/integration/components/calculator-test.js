import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | calculator', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders table cell height for calculator buttons', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    let cellHeight = 50;

    
    this.set('cellHeight', cellHeight);
    await render(hbs `<Calculator cellHeight={{cellHeight}} />`);
    //await render(hbs`{{calculator cellHeight=cellHeight}}`);

    //assert.async();
    assert.equal(this.element.querySelector('td').getAttribute('height'), cellHeight, 'Cell Height is correct');
  });
});
