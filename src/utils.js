const globals = require('./globals.js');

module.exports = {
	getMainUrl: function () {
		let url = globals.apiHost;
		if (globals.apiPort) {
			url = `${globals.apiHost}:${globals.apiPort}`;
		}
		return url;
	},
	getServerURL: function () {
		return globals.serverURL;
	}
}
