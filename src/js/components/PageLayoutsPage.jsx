/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import React from 'react';
import { Alert } from 'reactstrap';
import Editor3ColLayout from '../base/components/Editor3ColLayout';
import PropControl from '../base/components/PropControl';
import DataStore from '../base/plumbing/DataStore';

const PageLayoutsPage = () => {
	let layout = window.location.hash.split(/[/?]/)[1];
	if ( ! layout) {
		return (<ul>
			<li><a href='#pagelayouts/editor3col'>Editor3Col</a></li>
		</ul>);
	}
	switch(layout) {
	case "editor3col":
		return <Editor3ColEg />;
	}
	return <Alert>Huh? <code>{layout}</code></Alert>
};

const LoremIpsum = ({words=100}) => {
	let s = '';
	const il = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");
	for(let i=0; i<words; i++) {
		s += il[i % il.length]+i+" ";
	}
	return <p>{s}</p>;
};

const Editor3ColEg = () => {
	// HACK
	window.fullWidthPage = true;
	const is2 = DataStore.getUrlValue('is2');
	
	let $main = (<div style={{background:'rgba(128,128,255,128)', height:'150vh'}}>
		<h1>Editor3ColLayout - Main Content</h1>
		Space for lots of stuff
		<PropControl size='lg' prop='is2' type='checkbox' label='2 Columns Only?' />
		<LoremIpsum words={50} />
		<LoremIpsum words={50} />
	</div>);
	let $right = <div style={{background:'rgba(255,128,128,128)'}}>Extra panel - which does not scroll <LoremIpsum words={100} /></div>;

	if (is2) {
		return (<Editor3ColLayout>
			{$main}
			{$right}
		</Editor3ColLayout>);	
	}

	return (<Editor3ColLayout>
		<div style={{background:'rgba(128,255,128,128)'}}>Sub page navigation</div>
		{$main}
		{$right}
	</Editor3ColLayout>);
};

export default PageLayoutsPage;
