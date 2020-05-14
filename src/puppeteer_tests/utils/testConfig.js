
const project = 'studio';

// Which base URL should we visit to run tests in each context?
const ourServers = {
	local: 'http://local'+project+'.good-loop.com',
	test: 'https://test'+project+'.good-loop.com',
	prod: 'https://'+project+'.good-loop.com'
};

module.exports = {
	ourServers,
};
