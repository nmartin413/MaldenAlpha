

define([

	'q'

], function (Q) {

	return {

		init__renderable: function () {
			this.renderPromise = Q.promise(function (r) { r(); });
		},

		willRender: function () {
			return Q.promise(function (r) { r(); });
		},

		didRender: function () { },

		showError: function (msg) {
			this.$el.css({ outline: "2px solid red" });
			this.el.innerHTML = msg || "Error.";
		},

		templateModel: function () {
			return {};
		},

		render: function (reason) {
			this.renderPromise.then(_.bind(function () {
				var renderTag = _.uniqueId('render_');
				console.time(renderTag);
				var reason = (typeof reason === "string") ? reason : null;

				this.trigger('willRender');

				this.renderPromise = this.willRender().then(_(function () {
					if (typeof this.template === "undefined") return this;

					var templateModel = this.objectForPatternFromName(/template__/ig);

					_.extend(templateModel, _.result(this, 'templateModel'));

					try {
						var contents = this.template(templateModel);
						this.el.innerHTML = contents;
					}
					catch (err) {
						this.showError();
						throw err;
					}

					this.delegateActions();

					return this.loadBBViews().then(_.bind(function () {
						this.didRender();
						this.trigger('didRender');

						var identifier = _.reduce(this.el.classList, function (m, n) { return [m, n].join(" ") }, "");
						console.groupCollapsed("%cRender%s", "color:#aaa", identifier);
						console.log("root: \t\t %o", this.el);
						console.log("model: \t\t %o", _.clone(templateModel));
						console.log("reason: \t %o", reason);
						console.timeEnd(renderTag);
						console.groupEnd();
					}, this));

				}).bind(this));

			}, this));

			return this;
		}

	}

});