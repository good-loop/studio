/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import React, {useState} from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import ErrorAlert from '../base/components/ErrorAlert';
import DataStore from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form } from 'reactstrap';
import LayoutWidgets from './LayoutWidgets';

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

		<LayoutWidgets filter={f} />
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
	if (filter && ! "propcontrolwidgets input text basic".includes(filter)) {
		return null;
	}

	return (<><h4>PropControl Widgets</h4>
		<PropControl prop='mybasictext' path={['widget','BasicTextPropControl']} 
			label='Basic text input' help='Use this for text entry' />
		
		<PropControl type='radio' options={['Apples', 'Bananas', 'Pears']} prop='myradio' 
			path={['widget','BasicTextPropControl']} help='Radio button help would go here.' />
	</>);
};

export default WidgetsPage;
