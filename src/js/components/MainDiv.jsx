/* global navigator */
import React, { Component } from 'react';
import Login from 'you-again';
import { assert } from 'sjtest';

// Plumbing
import DataStore from '../base/plumbing/DataStore';
import Roles from '../base/Roles';
import C from '../C';
import Crud from '../base/plumbing/Crud'; // Crud is loaded here (but not used here)
import Profiler from '../base/Profiler';

// Templates
import MessageBar from '../base/components/MessageBar';
import LoginWidget from '../base/components/LoginWidget';

// Pages
import TestPage from '../base/components/TestPage';
import BGPage from './BGPage';
import CrudPage from './CrudPage';
import WidgetsPage from './WidgetsPage';
import PageLayoutsPage from './PageLayoutsPage';
import MainDivBase from '../base/components/MainDivBase';
import LoginTestPage from './LoginTestPage';
// import RedesignPage from './pages/RedesignPage';

// DataStore
C.setupDataStore();

const PAGES = {
	widgets: WidgetsPage,
	crud: CrudPage,
	test: TestPage,
	bg: BGPage,
	pagelayouts: PageLayoutsPage,
	login: LoginTestPage,
};

Login.app = C.app.service;

const MainDiv = () => {
	return <MainDivBase 
		pageForPath={PAGES}
		navbarPages={['widgets', 'pagelayouts', 'login', 'test', 'crud']}
		defaultPage='widgets'
	/>;
}; // ./MainDiv

export default MainDiv;
