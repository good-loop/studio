/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import React from 'react';
import C from '../base/CBase';
import PropControl from '../base/components/PropControl';
import SavePublishDeleteEtc from '../base/components/SavePublishDeleteEtc';
import { getDataPath } from '../base/plumbing/DataStore';
import ActionMan from '../plumbing/ActionMan';

const CrudPage = () => {
	const type = 'Testthingy';
	let id = 'testid';
	let status = C.KStatus.DRAFT;	
	const path = getDataPath({status, type, id});

	let pvThingy = ActionMan.getDataItem({status, type, id});
	let thingy = pvThingy.value;

	return (<>
		<h1>Test CRUD</h1>			

		<PropControl path={path} prop='name' label='Name' />

		<PropControl path={path} prop='description' label='Description' type='textarea' />

		<pre><code>{JSON.stringify(thingy)}</code></pre>

		saveAs
		<SavePublishDeleteEtc type={type} id={id} />
	</>
	);

};

export default CrudPage;
