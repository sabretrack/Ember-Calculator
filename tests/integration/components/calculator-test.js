import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | calculator', function(hooks) {
  setupRenderingTest(hooks);


  test('It renders, defaults to 0, sets cellHeight', async function(assert) {
    assert.expect(2);
    let defaultEquation = 0;

    this.set('equation', defaultEquation);
    this.set('cellHeight', '');

    await render( hbs `<Calculator @equation={{equation}} @cellHeight={{cellHeight}}/>`);

    //ON LOAD - DEFAULT TO ZERO, SET CELLHEIGHT
    assert.equal(this.equation, defaultEquation, 'onLoad - default equation is set to zero');
    assert.notEqual(this.element.querySelector('td').getAttribute('height'), '', 'onLoad - Cell Height is set');
  });


  test('It updates equation when numbers, decimal, clear and operator buttons are clicked - also prevents consecutive operators and multiple decimals', async function(assert) {
    assert.expect(26);
    let defaultEquation = 0;
    this.set('equation', defaultEquation);

    await render( hbs `<Calculator @equation={{equation}}/>`);

    //ON CLICK - INDIVIDUAL NUMBERS
    let i;
    for(i = 0; i < 10; i++) {
      clickNumberButton(i, this);
    }
    function clickNumberButton(NumberButton, self){
      //click a number
      self.element.querySelector('.btn-' + NumberButton ).click();
      assert.equal(self.equation, NumberButton, 'onClick - "number" ('+NumberButton+') button updates the equation to ( '+self.equation+' )');

      //clear
      self.element.querySelector('.btn-clear').click();
      assert.equal(self.equation, defaultEquation, 'onClick - "clear" button resets the equation back to default value ( '+defaultEquation+')');
    }

    //ON CLICK - DECIMAL BUTTON
    await click('.btn-decimal');
    assert.equal(this.equation, '0.', 'onClick - "decimal" button updates the equation to "0." ');
    await click('.btn-decimal');
    assert.equal(this.equation, '0.', 'onClick - "decimal" prevents multiple decimals (ex 0..) ');
    this.element.querySelector('.btn-clear').click();

    //ON CLICK - OPERATOR BUTTONS
    //divide
    await click('.btn-divide');
    assert.equal(this.equation, '0÷', 'onClick - "divide" button updates the equation to "0÷" ');

    //multiply
    await click('.btn-multiply');
    assert.equal(this.equation, '0×', 'onClick - "multiply" button updates the equation to "0×". no consecutive operators (ex 0÷×) ');

    //add
    await click('.btn-add');
    assert.equal(this.equation, '0+', 'onClick - "add" button updates the equation to "0+". no consecutive operators (ex 0×+)');

    //subtract
    await click('.btn-subtract');
    assert.equal(this.equation, '0-', 'onClick - "subtract" button updates the equation to "0-". no consecutive operators (ex 0+-) ');

  });

  test('It solves complex equations', async function(assert) {
    assert.expect(5);
    this.set('equation', 0);
    await render( hbs `<Calculator @equation={{equation}}/>`);

    //operators: × ÷ - +  //the multiply symbol "×" is not the letter "x"

    //basic equation
    this.set('equation', '2×10+5');
    await click('.btn-equals');
    assert.equal(this.equation,'25', 'solved - 2x10+5=25');

    //build new equation using previous answer
    await click('.btn-subtract');
    await click('.btn-5');
    assert.equal(this.equation,'25-5', 'built new equation using previous answer');
    await click('.btn-equals');
    assert.equal(this.equation,'20', 'solved - equation using previous answer');
    
    //equation with decimals
    this.set('equation', '1.1+2.22-3.333×4.4444÷5.55555');
    await click('.btn-equals');
    assert.equal(this.equation,'0.653623997624', 'solved - complex equation with decimals (1.1+2.22-3.333×4.4444÷5.55555=0.653623997624)');

    //equation with extremely large numbers
    this.set('equation', '999000000000×999000000000');
    await click('.btn-equals');
    assert.equal(this.equation,'9.98001e+23', 'solved - extremely large numbers (999000000000×999000000000=9.98001e+23)');

  });

});
