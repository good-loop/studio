
import React, {useState} from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import DataStore, {getValue} from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form, Card, CardTitle } from 'reactstrap';
import Wizard, {WizardStage} from '../base/components/WizardProgressWidget';
import WidgetExample from './WidgetExample';
import SearchQuery from '../base/searchquery';
import { substr } from '../base/utils/miscutils';
import { assMatch } from '../base/utils/assert';

const FunctionWidgets = () => {	
	const lwpath = ['widget','FunctionWidgets'];

	let q = DataStore.getValue(lwpath.concat('q'));
	let sq = new SearchQuery(q);

	return (<Card body>
		<CardTitle><h3>Functions</h3></CardTitle>
		
		<WidgetExample name='SearchQuery' keywords='search query' >
			<PropControl path={lwpath} prop='q' label='Query' />
			<pre>{JSON.stringify(sq)}</pre>
			<pre>rm blue: {JSON.stringify(SearchQuery.remove(sq, "blue"))}</pre>
		</WidgetExample>

		<WidgetExample name='substr' keywords='substring string miscutils' >			
			<pre>substr("foo bar", -2) = {assMatch(substr("foo bar", -2), "ar")}</pre>
			<pre>substr("foo bar", 0, -2) = {assMatch(substr("foo bar", 0, -2), "foo b")}</pre>
		</WidgetExample>

	</Card>);
};

export default FunctionWidgets;
