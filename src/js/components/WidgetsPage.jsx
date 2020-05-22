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

const PropControlWidgets = () => {
	let baseKeywords = 'propcontrol input';
	return (<Card body>
		
		<CardTitle><h3>PropControl Widgets</h3></CardTitle>

		<WidgetExample name='Basic text input' keywords={baseKeywords}>
			<PropControl prop='mybasictext' path={['widget','BasicTextPropControl']} 
				label='Favourite Pizza' help='Use this for text entry' />
		</WidgetExample>
		
		<WidgetExample name='Radio buttons' keywords={baseKeywords}>
			<PropControl type='radio' options={['Apples', 'Bananas', 'Pears']} prop='myradio' 
				path={['widget','BasicTextPropControl']} help='Radio button help would go here.' />
		</WidgetExample>

		<WidgetExample name='Yes-No' keywords={baseKeywords+' yesno'}>
			<PropControl type='yesNo' prop='yehnay' label='Do you like dogs?'
				path={['widget','BasicTextPropControl']} help='Help for yes or no: pick one.' />
		</WidgetExample>

		<WidgetExample name='Checkboxes' keywords={baseKeywords}>
			<PropControl label='We accept' type='checkboxes' options={['Cash', 'Cheque', 'Card']} prop='mycheckbox' 
				path={['widget','BasicTextPropControl']} help='Checkboxes help would go here.' />
		</WidgetExample>
	</Card>);
};

export default WidgetsPage;
