/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import React, {useState} from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import ErrorAlert from '../base/components/ErrorAlert';
import DataStore from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form } from 'reactstrap';

const WidgetsPage = () => {

	let f = (DataStore.getUrlValue('f') || '').toLowerCase();

	return (<>
		<h1>Welcome to the Widget Studio</h1>			

		<FormGroup>
			<Label>Filter widgets</Label>
			<Input type='search' name='f' value={f} onChange={e => DataStore.setUrlValue('f', e.target.value)} />
		</FormGroup>

		<hr/>

		<MessageWidgets filter={f} />

		<PropControlWidgets filter={f} />		

	</>
	);

};

// ??REfactor into separate files
const MessageWidgets = ({filter}) => {
	// ?? copy or refactor the F code from AdvertPage??
	if (filter && ! "erroralert messagewidgets".includes(filter)) {
		return null;
	}

	const err = new Error("Show this when something goes wrong.");
	return <><h4>ErrorAlert</h4> <ErrorAlert error={err} /> </>;
};

const PropControlWidgets = ({filter}) => {
	if (filter && ! "propcontrolwidgets input text".includes(filter)) {
		return null;
	}

	return <><h4>PropControl Widgets</h4> <PropControl prop='testprop' label='Basic text input' help='Use this for text entry' /></>;
};

export default WidgetsPage;
