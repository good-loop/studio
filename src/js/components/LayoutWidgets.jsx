
import React, {useState} from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import DataStore, {getValue} from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form, Card, CardTitle } from 'reactstrap';
import Wizard, {WizardStage} from '../base/components/WizardProgressWidget';

const LayoutWidgets = ({filter}) => {
	// ?? copy or refactor the F code from AdvertPage??
	if (filter && ! "layoutwidgets wizard".includes(filter)) {
		return null;
	}

	const lwpath = ['widget','LayoutWidgets'];

	return (<Card body>
		<CardTitle>Layout Widgets</CardTitle>
		<Wizard stagePath={lwpath.concat('stage')}>
			<WizardStage title='Stage One (basic)'>
				Here is stage one. Just click Next...
			</WizardStage>
			<WizardStage title='Stage Two: Sufficient check' sufficient={getValue(lwpath.concat('s2done'))} >
				Here is stage two. Click the checkbox to continue.
				<PropControl type='checkbox' prop='s2done' path={lwpath} />
			</WizardStage>
			<WizardStage title='The End' >
				All done :)
			</WizardStage>
		</Wizard>
	</Card>);
};

export default LayoutWidgets;
