/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import React, {useState} from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import ErrorAlert from '../base/components/ErrorAlert';
import DataStore from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form, CardTitle, Card, Alert } from 'reactstrap';
import LayoutWidgets from './LayoutWidgets';
import FunctionWidgets from './FunctionWidgets';
import WidgetExample, { getFilter } from './WidgetExample';
import PropControlWidgets from './PropControlWidgets';
import DisplayWidgets from './DisplayWidgets';
import JSend from '../base/data/JSend';
import Editor3ColLayout from '../base/components/Editor3ColLayout';
import LoginWidget, { LoginLink } from '../base/components/LoginWidget';
import Person, { getAllXIds, getProfilesNow, localLoad } from '../base/data/Person';
import Login from '../base/youagain';
import Cookies from 'js-cookie';

const LoginTestPage = () => {	
	return <>
		<LoginLink />
		<LoginWidget />
		<ProfilerTestWidget />
	</>;
};

const ProfilerTestWidget = () => {
	let pVerify = Login.verify();
	let allxids = getAllXIds();
	let peeps = getProfilesNow();
	let localPeeps = allxids.map(localLoad);
	return <WidgetExample name="SearchQuery" keywords="search query" >
		<h2>Logged in? {Login.isLoggedIn()? "Yes" : "No"}</h2>
		<div>User {Login.getUser() && Login.getUser().xid+" "+Login.getUser().jwt}</div>
		<div>js cookies: 
			<ul>
				{Object.keys(Cookies.get()).map(c => <li key={c}>{c} = {Cookies.get(c)}</li>)}
			</ul>
		</div>
		<h2>XIds</h2>
		{JSON.stringify(allxids)}
		<h2>People</h2>
		{JSON.stringify(peeps)}
		<h2>Local People</h2>
		{JSON.stringify(localPeeps)}

	</WidgetExample>;
};

export default LoginTestPage;