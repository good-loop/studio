/** 
 * Wrapper for server calls.
 *
 */
import $ from 'jquery';
import {SJTest, assert, assMatch} from 'sjtest';
import C from '../C.js';

import Login from '../base/youagain';
import NGO from '../base/data/NGO';

// Try to avoid using this for modularity!
import DataStore from '../base/plumbing/DataStore';
import Messaging, {notifyUser} from '../base/plumbing/Messaging';

import ServerIO from '../base/plumbing/ServerIOBase';
export default ServerIO;

/** dataspace = data-controller = (usually) app
 * This is the dataspace used in unit.js for reporting events */
ServerIO.dataspace = 'gl';

ServerIO.NO_API_AT_THIS_HOST = true;

ServerIO.PORTAL_DOMAIN = `${C.HTTPS}://${C.SERVER_TYPE}portal.good-loop.com`;
// Comment out the lines below when deploying!
// ServerIO.PORTAL_DOMAIN = 'https://testportal.good-loop.com'; // uncomment to let local use the test server's backend
ServerIO.PORTAL_DOMAIN = 'https://portal.good-loop.com'; // use in testing to access live data

/** The initial part of an API call. Allows for local to point at live for debugging */
ServerIO.APIBASE = ServerIO.PORTAL_DOMAIN; // My-Loop has no backend of its own - just use portal domain matching local/test/prod

ServerIO.DATALOG_ENDPOINT = `${C.HTTPS}://${C.SERVER_TYPE}lg.good-loop.com/data`;
ServerIO.DATALOG_ENDPOINT = 'https://testlg.good-loop.com/data';
// ServerIO.DATALOG_ENDPOINT = 'https://lg.good-loop.com/data';

// ServerIO.PROFILER_ENDPOINT = `${C.HTTPS}://${C.SERVER_TYPE}profiler.good-loop.com`;
ServerIO.PROFILER_ENDPOINT = 'https://testprofiler.good-loop.com';
// ServerIO.PROFILER_ENDPOINT = 'https://profiler.good-loop.com';

ServerIO.MEDIA_ENDPOINT = `${C.HTTPS}://${C.SERVER_TYPE}uploads.good-loop.com/`;
ServerIO.MEDIA_ENDPOINT = `https://testuploads.good-loop.com/`;
// ServerIO.MEDIA_ENDPOINT = `https://uploads.good-loop.com/`;

/**
 * Studio has no backend, so use profiler
 */
ServerIO.LOGENDPOINT = ServerIO.PROFILER_ENDPOINT + '/log';

ServerIO.checkBase();

