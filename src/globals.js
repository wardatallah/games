module.exports = {
	apiHost: process.env.REACT_APP_API_HOST || `http://${window.location.hostname}`,
	apiPort: process.env.REACT_APP_API_PORT || '',
};
