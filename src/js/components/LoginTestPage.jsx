/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import Cookies from 'js-cookie';
import React from 'react';
import LoginWidget, { LoginLink } from '../base/components/LoginWidget';
import { getAllXIds, getProfilesNow} from '../base/data/Person';
import { localLoad } from '../base/plumbing/Crud';
import Login from '../base/youagain';
import WidgetExample from './WidgetExample';

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
