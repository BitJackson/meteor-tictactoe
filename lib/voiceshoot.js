/**
 * Voice Shoot
 */

VoiceShoot = {};

(function (scope) {
	
	var _commands = {
			'one': function()   { $('.col[data-voice-shoot="1"]').click(); }
		, 'two': function()   { $('.col[data-voice-shoot="2"]').click(); }
		, 'three': function() { $('.col[data-voice-shoot="3"]').click(); }
		, 'four': function()  { $('.col[data-voice-shoot="4"]').click(); }
		, 'five': function()  { $('.col[data-voice-shoot="5"]').click(); }
		, 'six': function()   { $('.col[data-voice-shoot="6"]').click(); }
		, 'seven': function() { $('.col[data-voice-shoot="7"]').click(); }
		, 'eight': function() { $('.col[data-voice-shoot="8"]').click(); }
		, 'nine': function()  { $('.col[data-voice-shoot="9"]').click(); }
	};

	scope.initialize = function() {
		if(annyang) {
			annyang.setLanguage('en');
			annyang.init(_commands);
			annyang.start();
		}
	};

})(VoiceShoot);