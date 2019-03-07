import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | calculator', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    let defaultEquation = 0;

    this.set('equation', defaultEquation);
    this.set('cellHeight', '');

    await render( hbs `<Calculator @equation={{equation}} @cellHeight={{cellHeight}}/>`);

    //ON LOAD
    assert.equal(this.equation, defaultEquation, 'onLoad - default equation is set to zero');

    //ON CLICK - INDIVIDUAL NUMBERS AND CLEAR
    let i;
    for(i = 0; i < 10; i++) {
      clickNumberButton(i, this);
    }
    function clickNumberButton(NumberButton, self){
      //click a number
      let buttonNumber = NumberButton;
      self.element.querySelector('.btn-' + buttonNumber ).click();
      assert.equal(self.equation, buttonNumber, 'onClick - number ('+buttonNumber+') button   updates the equation to ( '+self.equation+' )');

      //click clear
      self.element.querySelector('.btn-clear').click();
      assert.equal(self.equation, defaultEquation, 'onClick - clear button resets the equation back to default value ( '+defaultEquation+')');
    }

  });

  /*test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{calculator}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#calculator}}
        template block text
      {{/calculator}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  }); */

});
