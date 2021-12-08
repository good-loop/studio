/** 
 * Wrapper for server calls.
 *
 */
import C from '../C.js';

// Try to avoid using this for modularity!

import ServerIO from '../base/plumbing/ServerIOBase';
export default ServerIO;

/** dataspace = data-controller = (usually) app
 * This is the dataspace used in unit.js for reporting events */
ServerIO.dataspace = 'gl';

ServerIO.NO_API_AT_THIS_HOST = true;

ServerIO.PORTAL_DOMAIN = `${C.HTTPS}://${C.SERVER_TYPE}portal.good-loop.com`;

/** The initial part of an API call. Allows for local to point at live for debugging */
ServerIO.APIBASE = ServerIO.PORTAL_DOMAIN; // Studio has no backend of its own - just use portal domain matching local/test/prod

ServerIO.DATALOG_ENDPOINT = `${C.HTTPS}://${C.SERVER_TYPE}lg.good-loop.com/data`;

ServerIO.PROFILER_ENDPOINT = `${C.HTTPS}://${C.SERVER_TYPE}profiler.good-loop.com`;

ServerIO.MEDIA_ENDPOINT = `${C.HTTPS}://${C.SERVER_TYPE}uploads.good-loop.com/`;

/**
 * Studio has no backend, so use profiler
 */
ServerIO.LOGENDPOINT = ServerIO.PROFILER_ENDPOINT + '/log';

ServerIO.checkBase();

