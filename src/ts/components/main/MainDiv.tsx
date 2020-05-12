import React, { Component, FC } from 'react';
import Login from 'you-again';

import DataStore from '../../../base/plumbing/DataStore';
import Profiler from '../../../base/Profiler';

import MainDivBase from '../../../base/components/MainDivBase';
import MainPage from "./MainPage";

const PAGES = {
	main: MainPage
};

Login.app = 'studio';

const MainDiv: FC = () => {
	return <MainDivBase 
		pageForPath={PAGES}
		defaultPage='main'
		navbarPages={['main']} />;
};

export default MainDiv;
