

define([

	'backbone',
	'mixins/baseActions',
	'mixins/nsMethods',
	'mixins/renderable',
	'mixins/managedView',
	'mixins/formHandling',
	'mixins/statefulness',
	'q',
	'app/config'

], function (Backbone, BaseActions, PatternExecute, Renderable, ManagedView, FormHandling, Statefulness, Q, AppConfig) {

	var MixedIn = Backbone.View
		.extend(PatternExecute)
		.extend(Renderable)
		.extend(ManagedView)
		.extend(FormHandling)
		.extend(Statefulness)
		.extend(BaseActions);

	/** 
		@class BaseView
	*/
	var View = MixedIn.extend({

    	initialize: function (opts) {
    		this.bindDomMap();
    		this.data = opts ? opts.data ? opts.data : {} : {};
    		this.executeForPattern(/init__/ig, arguments);
    		this.initView.apply(this, arguments);
    	},

		initView: function () { },

		domMap: {},

		template__appConfig: function () {
			return AppConfig;
		},

		bindDomMap: function () {
			var dom = this.dom = {};

    		_(this.domMap).each(function (selector, name) {
    			var getter = _.bind(function () {
    				return this.el.querySelector(selector);
    			}, bind);
    			Object.defineProperty(dom, name, { get: getter });
    		}, this);
    	},

		appendView: function (view) {
			this.el.appendChild(view.el)
		},

    	/**
			@method replaceView
			@param {string} tag - value of data-replace in dom
			@param {BaseView} [view] - another view, or the _.result of 'this'
		*/
        replaceView: function (tag, view) {
        	var view = view || _.result(this, tag);
        	var target = this.el.querySelector('[data-replace=' + tag + ']');

            target.parentElement.replaceChild(view.el, target);
        }

    });

	View.extend = _.wrap(View.extend, function (func, props, staticProps) {
    	if (props.initialize) {
    		throw new Error('Cannot override initialize for base/view, please use initView instead.');
    	}

    	return func.apply(this, [props, staticProps]);
    });

    return View;

});