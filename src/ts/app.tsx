import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import MainPage from './components/main/MainPage';

window.$ = $;

ReactDOM.render(
	<MainPage />,
	document.getElementById('mainDiv')
);
