// Copy this file to $YOURHOSTNAME.js and re-run webpack to override constants in ServerIO.
// You don't have to commit it, but it won't affect any other machines if you do.
// The setup below is only an example - you can mix and match servers and hardcode whatever you want.

// Change index to switch all endpoints together
const cluster = ['', 'stage', 'test', 'local'][3];

// Change to "http" if you don't have SSL set up locally
const PROTOCOL_LOCAL = 'https';
const protocol = (cluster === 'local') ? PROTOCOL_LOCAL : 'https';

export const ServerIOOverrides = {
	APIBASE: `${protocol}://${cluster}portal.good-loop.com`,
	DATALOG_ENDPOINT: `${protocol}://${cluster}lg.good-loop.com/data`,
	PROFILER_ENDPOINT: `${protocol}://${cluster}profiler.good-loop.com`,
	MEDIA_ENDPOINT: `${protocol}://${cluster}uploads.good-loop.com`,
};
