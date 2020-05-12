import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import MainDiv from './components/main/MainDiv';

window.$ = $;

ReactDOM.render(
	<MainDiv />,
	document.getElementById('mainDiv')
);
