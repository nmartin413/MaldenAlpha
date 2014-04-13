

define([

    'underscore'

], function (_) {

	function byMatchingPattern(pattern, n) {
		return n.match(pattern);
	}

	function fromNameToBoundFn(n) {
		return _.bind(this[n], this);
	}

	function toReturnValue(fn) {
		var args = _.rest(arguments, 1);
		return fn.apply(null, args);
	}

	/**
		@class NSMethods
	*/
	return {

		functionNamesForPattern: function (pattern) {
			return _.chain(this).functions().filter(_.partial(byMatchingPattern, pattern)).value();
		},

		/**
			@method functionsForPattern
			@param {RegExp} pattern
		*/
		functionsForPattern: function (pattern) {
			return _.map(this.functionNamesForPattern(pattern), _.bind(fromNameToBoundFn, this));
		},

		/**
			@method executeForPattern
			@param {RegExp} pattern
		*/
		executeForPattern: function (pattern, args) {
			return _.map(this.functionsForPattern(pattern), _.bind(function (func) {
				return func.apply(this, args);
			}, this));
		},

		/**
			@method returnForPattern
			@param {RegExp} pattern
		*/
		returnForPattern: function (pattern) {
			return _.map(this.functionsForPattern(pattern), toReturnValue);
		},

		/**
			@method objectForPattern
			@param {RegExp} pattern
		*/
		objectForPattern: function (pattern) {
			return _.object(this.returnForPattern(pattern));
		},

		/**
		*/
		objectForPatternFromName: function (pattern) {
			var names = _.map(this.functionNamesForPattern(pattern), function (name) {
				return name.replace(pattern, "");
			});
			var returns = this.returnForPattern(pattern);
			return _.object(names, returns);
		},

		/**
			@method functionMapForPatternFromName
			@param {RegExp} pattern
		*/
		functionMapForPatternFromName: function (pattern) {
			var names = _.map(this.functionNamesForPattern(pattern), function (name) {
				return name.replace(pattern, "");
			});
			return _.object(names, this.functionsForPattern(pattern));
		}


	};

});