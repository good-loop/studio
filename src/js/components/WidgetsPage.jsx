/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import React, {useState} from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import ErrorAlert from '../base/components/ErrorAlert';
import DataStore from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form, CardTitle, Card } from 'reactstrap';
import LayoutWidgets from './LayoutWidgets';
import WidgetExample, { getFilter } from './WidgetExample';
import PropControlWidgets from './PropControlWidgets';

cant compile this;

const WidgetsPage = () => {

	let f = getFilter();

	return (<>
		<h1>Welcome to the Widget Studio</h1>			

		<FormGroup>
			<Label>Filter widgets</Label>
			<Input type='search' name='f' value={f} onChange={e => DataStore.setUrlValue('f', e.target.value)} />
		</FormGroup>

		<hr/>

		<PropControlWidgets />		

		<MessageWidgets />

		<LayoutWidgets />
	</>
	);

};

// ??REfactor into separate files
const MessageWidgets = () => {
	const err = new Error("Show this when something goes wrong.");
	return (<Card body>
		<CardTitle><h3>Message Widgets</h3></CardTitle>
		
		<WidgetExample name='ErrorAlert' keywords='error alert' >
			<ErrorAlert error={err} />
		</WidgetExample>
		
	</Card>);
};

export default WidgetsPage;
