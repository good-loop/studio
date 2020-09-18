
import React, { useState } from 'react';

import { Input, FormGroup, Label, Form, Card, CardTitle } from 'reactstrap';

import PropControl, { FormControl } from '../base/components/PropControl';
import DataStore, { getValue } from '../base/plumbing/DataStore';
import Wizard, { WizardStage } from '../base/components/WizardProgressWidget';
import WidgetExample from './WidgetExample';
import SearchQuery from '../base/searchquery';
import { substr } from '../base/utils/miscutils';
import { assMatch } from '../base/utils/assert';
import SubCard from './SubCard';
import MDText from '../base/components/MDText';

const baseKeywords = "display";

const DisplayWidgets = () => {

	return (<Card body>
		<CardTitle><h3>Display</h3></CardTitle>
		<MDCard />
	</Card>);
};

const MDCard = () => {
	return (<SubCard title="Markdown">
		<WidgetExample name="mdtext image tag" keywords={baseKeywords}>
			<MDText source={`<img src='/img/gl-logo/LogoMark/logo.64.png' />`} />
		</WidgetExample>
		<WidgetExample name="mdtext image md format" keywords={baseKeywords}>
			<MDText source={`![](/img/gl-logo/LogoMark/logo.64.png)`} />
		</WidgetExample>
		<WidgetExample name="mdtext security: no js allowed" keywords={baseKeywords}>
			<MDText source={`

<script>alert("pwnd!");</script>


<button onClick="alert('gotcha');">mwhaha</button>


			`} />
			<MDText source={`

<button 
onClick="alert('gotcha');">mwhaha again
</button>


			`} />			
		</WidgetExample>
	</SubCard>);
};

export default DisplayWidgets;
