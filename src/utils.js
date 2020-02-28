const globals = require('./globals.js');

module.exports = {
	getMainUrl: function () {
		let url = globals.apiHost;
		if (globals.apiPort) {
			url = `${globals.apiHost}:${globals.apiPort}`;
		}
		console.log('test', url);
		return url;
	}
}
