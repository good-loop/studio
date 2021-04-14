/* global navigator */
import React, { Component } from 'react';
import Login from '../base/youagain';

// Plumbing
import DataStore from '../base/plumbing/DataStore';
import Roles from '../base/Roles';
import C from '../C';
import Crud from '../base/plumbing/Crud'; // Crud is loaded here (but not used here)
import Profiler from '../base/Profiler';

// Templates

// Pages
import TestPage from '../base/components/TestPage';
import BGPage from './BGPage';
import CrudPage from './CrudPage';
import WidgetsPage from './WidgetsPage';
import PageLayoutsPage from './PageLayoutsPage';
import MainDivBase from '../base/components/MainDivBase';
import LoginTestPage from './LoginTestPage';
import PersonTestPage from './PersonTestPage';
import SearchQueryTestPage from './SearchQueryTestPage';
// import RedesignPage from './pages/RedesignPage';

// DataStore
C.setupDataStore();

const PAGES = {
	widgets: WidgetsPage,
	crud: CrudPage,
	test: TestPage,
	bg: BGPage,
	pagelayouts: PageLayoutsPage,
	person: PersonTestPage,
	searchquery: SearchQueryTestPage,
	login: LoginTestPage,
};

Login.app = C.app.service;

const MainDiv = () => {
	return <MainDivBase 
		pageForPath={PAGES}
		navbarPages={['widgets', 'pagelayouts', 'login', 'test', 'crud', 'person']}
		defaultPage='widgets'
	/>;
}; // ./MainDiv

export default MainDiv;
