

define([

	'q',
	'backbone',
	'handlebars'

], function (Q, Backbone, Handlebars) {

	var ViewCache = (function () {
		return function (opts) {
			var items = [];

			return {
				getAll: function () {
					return _.pluck(items, 'view');
				},
				add: function (view, tag) {
					items.push({ view: view, tag: tag });
				},
				get: function (t) {
					return _.findWhere(items, { tag: t })
				}
			};
		}
	}());

	function createElementTag(el) {
		return _.reduce($(el).data(), function (memo, value, key) {
			return [memo, value, key].join('');
		}, "");
	}

	Handlebars.registerHelper('bbview', function (path) {
		return new Handlebars.SafeString('<div data-load="' + path + '"/>')
	});

	return {

		init__managedViews: function (opts) {
			if (opts && opts.parent) {
				this.parent = opts.parent;
			}
			this.viewCache = new ViewCache();

			this.linkManagedView();
			this.on('didRender', _.bind(this.linkManagedView, this));
		},

		linkManagedView: function () {
			this.el.__backboneView = this;
		},

		didInitView: function (view, data) { },

		getViewWithTag: function (tag) {
			var result = _.select(this.viewCache.getAll(), function (view) {
				return view.data.tag === tag;
			});
			return result ? _.first(result) : null;
		},

		loadBBViews: function () {
			var viewCache = this.viewCache;
			var elements = document.querySelectorAll('[data-load]');
			var parentView = this;

			return Q.all(_.map(elements, function (placeholder) {
				var path = placeholder.dataset.load;
				//var parent = el.parentElement;
				var elementTag = createElementTag(placeholder);

				if (!placeholder.parentElement)
					return Q.fcall(_.bind(console.warn, console, "Target element has no parent?"));

				return Q.promise(function (resolve) {
					var cached = viewCache.get(elementTag);

					if (cached) {
						return resolve(cached.view.el);

					} else {
						require([path], function (View) {
							var data = $(placeholder).data();
							var view = new View({ data: data, parent: parentView }).render();
							parentView.didInitView(view, data);
							viewCache.add(view, elementTag);
							resolve(view.el);
						});

					}

				}).then(function (viewEl) {
					try {
						return placeholder.parentElement.replaceChild(viewEl, placeholder);
					}
					catch (err) {
						if (!document.contains(placeholder)) {
							console.warn("Placeholder no longer in document at replace operation...");
						}

						//var msg = "Unable to replace element";

						//if (!placeholder.parentElement) {
						//	msg += "\n\tParent element not found";
						//}

						//msg += "\n";
						//throw new Error(msg);
					}
				});

			}));

		}

	};

});