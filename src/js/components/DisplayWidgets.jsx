
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
import Counter from '../base/components/Counter';
import Money from '../base/data/Money';

const baseKeywords = "display";

const DisplayWidgets = () => {

	return (<Card body>
		<CardTitle><h3>Display Widgets</h3></CardTitle>
		<p>Widgets for displaying text and images.</p>
		<MDCard />
		<CounterCard />
	</Card>);
};

const CounterCard = () => {
	return (<SubCard title="Counter">
		<WidgetExample name="Low £ Counter - preservePennies" keywords={baseKeywords}>
			<p>The amount is: <Counter amount={new Money("£12.3411")} preservePennies /> (should be £12.34).</p>
		</WidgetExample>
		<WidgetExample name="High £ Counter - preservePennies" keywords={baseKeywords}>
			<p>The amount is: <Counter amount={new Money("£12345.12345")} preservePennies /> (should be £12,345.12).</p>
		</WidgetExample>
		<WidgetExample name="High £ Counter - 3 sig figs" keywords={baseKeywords}>
			<p>The amount is: <Counter amount={new Money("£12345.12345")} preservePennies /> (should be £12,300).</p>
		</WidgetExample>
		<WidgetExample name="Decimal Counter" keywords={baseKeywords}>
			<p>The number is: <Counter value={12345.12345} sigFigs={10} /> (should be 12334.12345).</p>
		</WidgetExample>
	</SubCard>);
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
		<WidgetExample name="MDText line-break parsing" keywords={baseKeywords}>
			<MDText source="This line ends in br-slash<br/>This line ends in br with no slash<br>This line ends in br-space-slash<br />This is the last line" />
		</WidgetExample>
	</SubCard>);
};

export default DisplayWidgets;
