/** @jsx React.DOM */

function Firebase (url) {
	console.log('Mock Firebase', url);
	this.url = url;
};

Firebase.prototype.on = function (ev, cb) {
	console.log('Mock Firebase .on', this.url, ev);
};

module.exports = Firebase;