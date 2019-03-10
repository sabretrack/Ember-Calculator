import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Model | theme', function(hooks) {
  setupTest(hooks);

  test('retrieves theme name and class name', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = run(() => store.createRecord('theme', {
		'class-name': 'light',
		name: "Light"
    }));

    assert.ok(model.get('class-name'), 'theme classname exists');
    assert.ok(model.get('name'), 'theme name exists');

  });
});
