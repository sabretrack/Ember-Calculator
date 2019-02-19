import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	'class-name': attr('string'),
	name: attr('string')

});
