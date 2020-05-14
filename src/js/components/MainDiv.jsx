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
import NavBar from './MyLoopNavBar';

// Pages
import MyPage from './pages/MyPage';
import CampaignPage from './campaignpage/CampaignPage';
import {BasicAccountPage} from '../base/components/AccountPageWidgets';
import E404Page from '../base/components/E404Page';
import TestPage from '../base/components/TestPage';
import AccountPage from './pages/AccountPage';
import MainDivBase from '../base/components/MainDivBase';
// import RedesignPage from './pages/RedesignPage';

// DataStore
C.setupDataStore();

const PAGES = {
	widgets: WidgetsPage,
	scratch: ScratchPage,
};

Login.app = C.app.service;

const MainDiv = () => {
	return <MainDivBase 
		pageForPath={PAGES}
		navbarPages={['widgets', 'scratch']}
		defaultPage='widgets'
	/>;
}; // ./MainDiv

export default MainDiv;
