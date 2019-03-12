import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nav', function(hooks) {
  setupRenderingTest(hooks);

  test('navigation renders and has links', async function(assert) {
	assert.expect(4);
    this.owner.lookup('router:main').setupRouter();

    await render(hbs `<Nav />`);

    let homeLink = this.element.querySelector("a.nav-link[href='/']");
    let calculatorLink = this.element.querySelector("a.nav-link[href='/calculator']");

    assert.ok(homeLink, 'home nav link exists and links to "/" ');
    assert.equal(homeLink.textContent.trim(), 'Home', 'home nav link text is "Home"');

    assert.ok(calculatorLink, 'calculator nav link exists and links to "/calculator" ');
    assert.equal(calculatorLink.textContent.trim(), 'Calculator', 'calculator nav link text is "Calculator"');

  });
});
