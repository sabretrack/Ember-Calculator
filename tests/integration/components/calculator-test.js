import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | calculator', function(hooks) {
  setupRenderingTest(hooks);

  test('Calculator component renders - defaults to 0 - sets cellHeight - updates equation when numbers, decimal and clear buttons are clicked', async function(assert) {

    let defaultEquation = 0;

    this.set('equation', defaultEquation);
    this.set('cellHeight', '');

    await render( hbs `<Calculator @equation={{equation}} @cellHeight={{cellHeight}}/>`);

    //ON LOAD - DEFAULT TO ZERO, SET CELLHEIGHT
    assert.equal(this.equation, defaultEquation, 'onLoad - default equation is set to zero');
    assert.notEqual(this.element.querySelector('td').getAttribute('height'), '', 'onLoad - Cell Height is set');

    //ON CLICK - INDIVIDUAL NUMBERS AND CLEAR BUTTONS
    let i;
    for(i = 0; i < 10; i++) {
      clickNumberButton(i, this);
    }
    function clickNumberButton(NumberButton, self){
      //click a number
      self.element.querySelector('.btn-' + NumberButton ).click();
      assert.equal(self.equation, NumberButton, 'onClick - "number" ('+NumberButton+') button updates the equation to ( '+self.equation+' )');

      //click clear
      self.element.querySelector('.btn-clear').click();
      assert.equal(self.equation, defaultEquation, 'onClick - "clear" button resets the equation back to default value ( '+defaultEquation+')');
    }

    //ON CLICK - DECIMAL BUTTON
    this.element.querySelector('.btn-decimal').click();
    assert.equal(this.equation, '0.', 'onClick - "decimal" button updates the equation to "0." ');

  });

});
