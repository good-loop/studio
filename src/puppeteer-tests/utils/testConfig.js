
const project = 'studio';

// Which base URL should we visit to run tests in each context?
const ourServers = {
	local: 'http://local'+project+'.good-loop.com',
	test: 'https://studio.good-loop.com',
	prod: 'https://studio.good-loop.com'
};

module.exports = {
	ourServers,
};
