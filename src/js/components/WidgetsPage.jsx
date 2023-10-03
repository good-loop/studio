/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import React, {useState} from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import ErrAlert from '../base/components/ErrAlert';
import DataStore from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form, CardTitle, Card } from 'reactstrap';
import LayoutWidgets from './LayoutWidgets';
import FunctionWidgets from './FunctionWidgets';
import WidgetExample, { getFilter } from './WidgetExample';
import PropControlWidgets from './PropControlWidgets';
import DisplayWidgets from './DisplayWidgets';
import JSend from '../base/data/JSend';
import SubCard from './SubCard';
import DragDropWidgets from './DragDropWidgets';
import CrudWidgets from './CrudWidgets';
import DataLogTestsCard from './DataLogTestsCard';
import Wrap from '../base/components/Wrap';

const WidgetsPage = () => {
	let f = getFilter();

	return <>
		<h1>Welcome to the GL Widget Studio</h1>

		<FormGroup>
			<Label>Filter widgets</Label>
			<Input type='search' name='f' value={f} onChange={e => DataStore.setUrlValue('f', e.target.value)} />
		</FormGroup>

		<hr/>

		<DataLogTestsCard />

		<PropControlWidgets />

		<MessageWidgets />

		<LayoutWidgets />

		<FunctionWidgets />

		<DisplayWidgets />

		<DragDropWidgets />

		<CrudWidgets />

		<SmallWidgets />
	</>;
};


const SmallWidgets = () => {
	return <SubCard body title="Small Widgets">
		<WidgetExample name='Wrap' keywords='wrap style' >
			<Wrap style={{color:"red"}}><span>Hello!</span><span>Red World!</span></Wrap>
		</WidgetExample>
		<WidgetExample name='UnWrap' keywords='unwrap' >
			<Wrap><span>Hello!</span><span>Plain World!</span></Wrap>
		</WidgetExample>	
	</SubCard>
};

// ??REfactor into separate files
const MessageWidgets = () => {
	const err = new Error("Show this when something goes wrong.");
	const err2 = new JSend();
	err2.message = "The computer is unhappy";
	err2.status = "warning";

	return <SubCard body title="Message Widgets">
		<WidgetExample name='ErrAlert' keywords='error alert' >
			<ErrAlert error={err} />
		</WidgetExample>

		<WidgetExample name='ErrAlert - JSend, warning' keywords='warning alert' >
			<ErrAlert error={err2} color='warning' />
		</WidgetExample>
	</SubCard>;
};

export default WidgetsPage;
