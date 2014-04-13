


define([

	'underscore'

], function (_) {

	var eventString = "submit";
	var eventSelector = "form[data-handler]";

	var inputAttribute = "data-handler-name";
	var inputFormat = "[" + inputAttribute + "=%s]";
	var inputSelector = "[" + inputAttribute + "]";

	var err_handlerUndefined = "Could not find handler %s";
	var err_formElementNameMissing = "Some form elements did not have a name element";

	return {
		lastFocusedName: undefined,

		init__handlerMixin: function () {
			this.$el.on(eventString, eventSelector, _.bind(this.handleSubmit, this));

			this.$el.on('focus', inputSelector, _.bind(this.recordFocus, this));
		},

		recordFocus: function (evt) {
			this.lastFocusedName = evt.currentTarget.dataset.handlerName;
		},

		restoreFocus: function () {
			if (this.lastFocusedName) {
				this.$el.find(_.sprintf(inputFormat, this.lastFocusedName)).focus();
			}
		},

		formHandlers: {},

		submitFormOnChange: function (handlerName) {
			return this.submitFormOn('change', handlerName);
		},

		submitFormOn: function (eventName, handlerName) {
			var selector = _.sprintf('[data-handler=%s] [data-handler-name]', handlerName);
			this.$el.on(eventName, selector, _.bind(function (evt) {
				$(evt.currentTarget).parents('form').trigger('submit');
			}, this));
		},

		getFormData: function (handlerName) {
			var form = this.el.querySelector('[data-handler=' + handlerName);
			if (!form) {
				throw new Error("no form with handler name " + handlerName + " found");
			} else {
				return this.getFormDataFromElement(form);
			}
		},

		getFormDataFromElement: function (form) {
			var inputs = form.querySelectorAll(inputSelector);

			function toNameValuePairs(formEl) {
				var val = formEl.value;
				if (formEl.type === "checkbox") {
					val = formEl.checked;
				}

				return [formEl.dataset.handlerName, val];
			}

			return _.chain(inputs).map(toNameValuePairs).object().value();
		},

		handleSubmit: function (evt) {
			evt.stopPropagation();
			evt.preventDefault();

			var handlerName = evt.currentTarget.dataset.handler,
				handler = this.formHandlers[handlerName];

			if (!handler) {
				throw new Error(_.sprintf(err_handlerUndefined, handlerName));
			} else {
				handler.apply(this, [this.getFormDataFromElement(evt.currentTarget), evt]);
			}
		}

	};


});