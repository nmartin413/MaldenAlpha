

define([

	'ember',
	'stream'

], function (Ember, Stream) {

	return Ember.Controller.extend({

		numberedKeys: [1,2,3,4,5,6,7,8,9,0],

		currentSequence: "", 

		actions: {

			clearSequence: function () {
				this.set('currentSequence', '');
				return false;
			},

			pressedKey: function (num) {
				this.set('currentSequence', this.get('currentSequence') + num);
				return false;
			},

			changeChannel: function () {
				var channel = this.get('currentSequence');
				if (channel.length > 3) {
					alert('Please enter a sequence less than 4');
				}
				this.set('currentSequence', '');
				Stream.tivoChannel(channel);
			}

		}		

	});

});