/* global navigator */
import React, { Component } from 'react';
import Login from 'you-again';
import { assert } from 'sjtest';
import { modifyHash } from 'wwutils';

// Plumbing
import DataStore from '../base/plumbing/DataStore';
import Roles from '../base/Roles';
import C from '../C';
import Crud from '../base/plumbing/Crud'; // Crud is loaded here (but not used here)
import BS from '../base/components/BS4';
import Profiler from '../base/Profiler';

// Templates
import MessageBar from '../base/components/MessageBar';
import LoginWidget from '../base/components/LoginWidget';

// Pages
import TestPage from '../base/components/TestPage';
import WidgetsPage from './WidgetsPage';
import MainDivBase from '../base/components/MainDivBase';
// import RedesignPage from './pages/RedesignPage';

// DataStore
C.setupDataStore();

const PAGES = {
	widgets: WidgetsPage,
	test: TestPage,
};

Login.app = C.app.service;

const MainDiv = () => {
	return <MainDivBase 
		pageForPath={PAGES}
		navbarPages={['widgets', 'test']}
		defaultPage='widgets'
	/>;
}; // ./MainDiv

export default MainDiv;
