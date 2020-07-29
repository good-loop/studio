
import React, {useState} from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import DataStore, {getValue} from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form, Card, CardTitle, Button, Row, Col } from 'reactstrap';
import Wizard, {WizardStage} from '../base/components/WizardProgressWidget';
import WidgetExample from './WidgetExample';

const LayoutWidgets = () => {	
	const lwpath = ['widget','LayoutWidgets'];

	return (<Card body>
		<CardTitle><h3>Layout Widgets</h3></CardTitle>
		
		<WidgetExample name='Wizard' keywords='wizard stages' >
			<Wizard stagePath={lwpath.concat('stage')}>
				<WizardStage title='Stage One (basic)'>
					Here is stage one. Just click Next...
				</WizardStage>
				<WizardStage title='Stage Two: Sufficient check' sufficient={getValue(lwpath.concat('s2done'))} >
					Here is stage two.
					<PropControl label='Click the checkbox to continue' type='checkbox' prop='s2done' path={lwpath} />
				</WizardStage>
				<WizardStage title='The End' >
					All done :)
				</WizardStage>
			</Wizard>
		</WidgetExample>

		<WidgetExample name='Compact Form Layout' keywords='' >
			<Row>
				<Col>
					<div className='compact'>
						<PropControl prop='compact-1' label='My first compact label' value='Some text' />
						<PropControl prop='compact-2' label='Another label with some help' help='How can we help you?' />
						<PropControl prop='compact-3' label='Checkbox 1' type='checkbox' warning='Oh dear, blah blah' />
						<PropControl prop='compact-4' label='Some free text' type='textarea' />
						<Button>A Button</Button>
					</div>
				</Col>
				<Col>
					<div>
						<PropControl prop='compact-1' label='My first normal label' />
						<PropControl prop='compact-2' label='Another label with some help' help='How can we help you?' />
						<PropControl prop='compact-3' label='Checkbox 1' type='checkbox' warning='Oh dear, blah blah' />
						<PropControl prop='compact-4' label='Some free text' type='textarea' />
						<Button>Finally, a button</Button>
					</div>
				</Col>
			</Row>
		</WidgetExample>

	</Card>);
};

export default LayoutWidgets;
