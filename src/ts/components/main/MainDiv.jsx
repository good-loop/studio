import React, { Component } from 'react';
import Login from 'you-again';

import DataStore from '../../base/plumbing/DataStore';
import Profiler from '../../base/Profiler';

import MainDivBase from '../../base/components/MainDivBase';
import MainPage from "./MainPage";
import LoginWidget from '../../base/components/LoginWidget';

const PAGES = {
	MainPage
};

Login.app = 'studio';

const MainDiv = () => {
	return <MainDivBase 
		pageForPath={PAGES}
		defaultPage='widgets'
		navbarPages={['widgets']} />;
};

// class MainDiv extends Component {
// 	constructor(props) {
// 		super(props);
// 		// Login.app = C.app.service;
// 	}

// 	componentDidMount() {
// 		// redraw on change
// 		const updateReact = (mystate) => this.setState({});
// 		DataStore.addListener(updateReact);

// 		// Check if we're on a mobile device and place the result in state
// 		// COPIED FROM ADUNIT'S device.js
// 		const userAgent = navigator.userAgent || navigator.vendor || window.opera;
// 		const isMobile = !!(userAgent.match('/mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i'));
// 		DataStore.setValue(['env', 'isMobile'], isMobile);

// 		DataStore.setValue(['data', 'Person', 'xids'], Profiler.getAllXIds(), false);
// 	} // ./componentDidMount
	

// 	componentDidCatch(error, info) {
// 		// Display fallback UI
// 		this.setState({error, info, errorPath: DataStore.getValue('location', 'path')});
// 		console.error(error, info); 
// 		if (window.onerror) window.onerror("Caught error", null, null, null, error);
// 	}

// 	render() {
// 		let path = DataStore.getValue('location', 'path');	
// 		let page = (path && path[0]);
	
// 		// Fleshed out title for My-Loop custom login modal design.
// 		const loginWidgetTitle = (
// 			<div className="text-center">
// 				<span className="modal-main-title">My GOOD-LOOP</span><br />
// 				<span className="modal-subtitle">Raising money for charity with adverts</span>
// 			</div>
// 		);

// 		return (
// 			<>
// 				<div id={page} /* wrap in an id in case you need high-strength css rules */>
// 					<MainPage />
// 				</div>
// 				<LoginWidget />
// 			</>
// 		);
// 	} // ./render()
// } // ./MainDiv

export default MainDiv;
