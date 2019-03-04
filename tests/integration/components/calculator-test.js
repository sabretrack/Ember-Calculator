import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | calculator', function(hooks) {
  setupRenderingTest(hooks);

  test('calculator component renders', async function(assert) {
    await render(hbs`{{calculator}}`);
    assert.equal(this.element.textContent.trim(), '', 'calculator component rendered successfully');
  });

  test('calculator table cell height', async function(assert) {
    await render(hbs `<Calculator />`);

    let cellHeightAttr = this.element.querySelector('td').getAttribute('height');

    assert.notEqual(cellHeightAttr, '', 'Cell Height is set');

  });

  /* test('calculator buttons update the equation input', async function(assert) {
    await render(hbs `<Calculator />`);
  }); */



});
