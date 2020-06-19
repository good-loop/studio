/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import React, {useState} from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import ErrorAlert from '../base/components/ErrorAlert';
import DataStore, { getDataPath } from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form, CardTitle, Card } from 'reactstrap';
import LayoutWidgets from './LayoutWidgets';
import WidgetExample, { getFilter } from './WidgetExample';
import PropControlWidgets from './PropControlWidgets';
import Misc from '../base/components/Misc';
import SavePublishDeleteEtc from '../base/components/SavePublishDeleteEtc';
import Crud from '../base/plumbing/Crud';
import C from '../base/CBase';

const CrudPage = () => {
	const type = 'Testthingy';
	let id = 'testid';
	let status = C.KStatus.DRAFT;
	let thingy = DataStore.getData({status, type, id});
	const path = getDataPath({status, type, id});

	return (<>
		<h1>Test CRUD</h1>			

		<PropControl path={path} prop='name' label='Name' />

		<pre><code>{JSON.stringify(thingy)}</code></pre>

		saveAs
		<SavePublishDeleteEtc type={type} id={id} />
	</>
	);

};

export default CrudPage;
