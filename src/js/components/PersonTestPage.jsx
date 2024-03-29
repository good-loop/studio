/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import Cookies from 'js-cookie';
import React from 'react';
import { Card } from 'reactstrap';
import { DefaultListItem } from '../base/components/ListLoad';
import LoginWidget, { LoginLink } from '../base/components/LoginWidget';
import Misc from '../base/components/Misc';
import Person, { getAllXIds, localLoad, addClaim, setClaimValue, getClaimValue } from '../base/data/Person';
import { randomPick } from '../base/utils/miscutils';
import Login from '../base/youagain';
import WidgetExample from './WidgetExample';

// expose for debug / tests
window.Person = Person;
window.getAllXIds = getAllXIds;
window.setClaimValue = setClaimValue;
window.getClaimValue = getClaimValue;

const PersonTestPage = () => {	
	return <>
		<AddClaimGetProfileRaceTest />
	</>;
};

ServerIO.USE_PROFILER = true;

let once = false;


const AddClaimGetProfileRaceTest = () => {
	// Note: This can include localLoads which are instant
	let pvsPeeps = getAllXIds().map(xid => getProfile({xid}));
	let persons = pvsPeeps.map(pv => pv.value).filter(x => x);

	// Do before a profile can be loaded. Then check: did the load delete this local edit?
	if (persons.length && ! once) {		
		let img = randomPick(["https://i.pinimg.com/564x/56/a9/7a/56a97ab064716fc08e680bb1b5fb9f7a.jpg","https://i.pinimg.com/564x/32/e6/20/32e620377da60f8e79fb3db5452f02a2.jpg"]);
		setClaimValue({persons, key:"img", value:img});
		setClaimValue({persons, key:"name", value:"Foo"});
		console.log("Set name, img", JSON.stringify(pvsPeeps));
		once = true;
	}

	return <Card>
		
		1. Spike getProfile to be slow with a breakpoint in Person.js<br/>		
		2. Add a claim.<br/>
		3. Will the profile load overwrite the claim?<br/>
		
		<div>XIds: {getAllXIds().join(", ")}</div>
		<div>Profiles: {persons.map(peep => 
			<div key={peep.id}>
				<Misc.ImgThumbnail url={getClaimValue({persons:[peep],key:"img"})} /> {peep.id} 
				{getClaimValue({persons:[peep],key:"name"})} 
				{getClaimValue({persons:[peep],key:"gender"})}
			</div>)}
		</div>
	</Card>;
}

export default PersonTestPage;
