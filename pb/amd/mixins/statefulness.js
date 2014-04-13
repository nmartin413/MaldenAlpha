

define([

	'backbone'

], function (Backbone) {

	var State = Backbone.Model.extend({

		initialize: function (atts) {
			this.defaultKeys = _.keys(this.attributes);
			this.listenTo(this, 'change', this.didChange);
		},

		didChange: function () {
			var changed = this.changedAttributes();
			var defaults = this.defaultKeys;
			if (changed) {
				_.each(_.keys(changed), function (key) {
					if (_.indexOf(defaults, key) === -1) {
						console.warn(_.sprintf('Attribute %s was not present in defaults', key));
					}
				});
			}
		},

		toggle: function (name) {
			return this.set(name, !this.get(name));
		}

	});

	return {

		renderOnStateChange: true,

		defaultViewState: {},

		setState: function () {
			return this.state.set.apply(this.state, arguments);
		},

		getState: function () {
			return this.state.get.apply(this.state, arguments);
		},

		init__stateful: function () {
			this.state = new State(this.defaultViewState);

			if (this.renderOnStateChange) {
				this.listenTo(this.state, 'change', _.bind(this.render, this, "view state change"));
			}
		},

		action__toggleState: function (evt) {
			this.state.toggle(evt.currentTarget.dataset.key);
		},

		template__state: function () {
			return this.state.toJSON();
		}

	};


});