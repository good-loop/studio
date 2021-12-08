// Copy this file to $YOURHOSTNAME.js and re-run webpack to override constants in ServerIO.
// You don't have to commit it, but it won't affect any other machines if you do.
// The setup below is only an example - you can mix and match servers and hardcode whatever you want.

// Change to "local", "test" or "" to switch all endpoints together
const cluster = 'test';
const protocol = (cluster === 'local') ? 'http' : 'https';

module.exports = {
	ServerIOOverrides: {
    APIBASE: `${protocol}://${cluster}portal.good-loop.com`,
    DATALOG_ENDPOINT: `${protocol}://${cluster}lg.good-loop.com/data`,
    PROFILER_ENDPOINT: `${protocol}://${cluster}profiler.good-loop.com`,
		MEDIA_ENDPOINT: `${protocol}://${cluster}uploads.good-loop.com`,
	}
};
