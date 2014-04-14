
var Q = require('q'),
	punycode = require('punycode'),
	_ = require('underscore'),
	net = require('net'),
	fs = require('fs');


function getMediaContent() {

	var musicPath = "/Users/Drew/Music/iTunes/iTunes Media/Music";
	
	var artists = _.map(fs.readdirSync(musicPath, function(err, files){
	//		console.log(files);
	}), function(artistName){return {artist: artistName}});
	

	return artists;
}

module.exports.getMediaContent = getMediaContent;



