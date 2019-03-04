import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | theme', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('retrieves each theme\'s name and class name', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('theme', {
		'class-name': 'light',
		name: "Light"
    });
    
    assert.ok(model.get('class-name'), 'theme classname exists');
    assert.ok(model.get('name'), 'theme name exists');

  });
});
