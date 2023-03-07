module.exports = {
	apiHost: process.env.NODE_ENV === 'development' ? `http://${window.location.hostname}` : process.env.REACT_APP_API_HOST,
	apiPort: process.env.NODE_ENV === 'development' ? 3000 : null,
	serverURL: process.env.NODE_ENV === 'development' ? `http://${window.location.hostname}:3001` : process.env.REACT_APP_SERVER_URL,
};
