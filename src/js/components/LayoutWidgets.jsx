
import React, {useState} from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import DataStore, {getValue} from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form, Card, CardTitle, Button, Row, Col } from 'reactstrap';
import Wizard, {WizardStage} from '../base/components/WizardProgressWidget';
import WidgetExample from './WidgetExample';
import SubCard from './SubCard';

const LayoutWidgets = () => {	
	const lwpath = ['widget','LayoutWidgets'];

	return (<SubCard title="Layout Widgets">
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

		<WidgetExample name='form-compact Layout' keywords='' >
			<Row>
				<Col>
					<div className='form-compact'>
						<PropControl prop='compact-1' label='My first compact label' value='Some text' />
						<PropControl prop='compact-2' label='Another label with some help' help='How can we help you?' />
						<PropControl prop='compact-3' label='Checkbox 1' type='checkbox' warning='Oh dear, blah blah' />
						<PropControl prop='compact-4' label='Some free text' type='text' modal/>
						<Button>A Button</Button>
					</div>
				</Col>
				<Col>
					<div>
						<PropControl prop='compact-1' label='My first normal label' />
						<PropControl prop='compact-2' label='Another label with some help' help='How can we help you?' />
						<PropControl prop='compact-3' label='Checkbox 1' type='checkbox' warning='Oh dear, blah blah' />
						<PropControl prop='compact-LEWIS' fast label='ModalTestingElement' modal styled="js" type='textarea' />
						<Button>Finally, a button</Button>
					</div>
				</Col>
			</Row>
		</WidgetExample>

		<WidgetExample name='Inline Form Layout' keywords='' >
			<Form inline>
				<PropControl prop='compact-1' label='My first inline label' value='Some text' />
				<PropControl prop='compact-2' label='Another label with some help' help='How can we help you?' />
				<PropControl prop='compact-3' label='Checkbox 1' type='checkbox' warning='Oh dear, blah blah' />
				<PropControl prop='compact-4' label='Some free text' type='textarea'/>
				<Button>A Button</Button>
			</Form>
		</WidgetExample>
		<WidgetExample name='Modal Layout' keywords='' >
			<Form inline>
				<PropControl prop='compact-1' label='My first inline label' value='Some text' />
				<PropControl prop='compact-2' label='Another label with some help' help='How can we help you?' />
				<PropControl prop='compact-3' label='Checkbox 1' type='checkbox' warning='Oh dear, blah blah' />
				<PropControl prop='compact-4' label='Some free text' type='textarea'/>
				<Button>A Button</Button>
			</Form>
		</WidgetExample>
		<WidgetExample name='Modal textareas/text' keywords='' >
			<Row>
				<Col>
					<div>
					<PropControl fast prop='compact-5' label='Modal textarea' value='Some text' type="textarea" modal/>
					<PropControl fast prop='compact-6' label='Modal text'  value='Some text' type="text" modal/>
					</div>
				</Col>
				<Col>
					<div>
						<PropControl fast prop='compact-7' label='Modal Styled CSS' value="p {colour : red}" type="textarea" modal styled="css"/>
						<PropControl fast prop='compact-8' label='Modal Styled JS' value="let x = true" type="textarea" modal styled="js"/>
					</div>
				</Col>
			</Row>
		</WidgetExample>
	</SubCard>);
};

export default LayoutWidgets;
