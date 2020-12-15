
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
import SimpleTable from '../base/components/SimpleTable';
import Tree from '../base/data/Tree';

const baseKeywords = "display";

const DisplayWidgets = () => {
	return (<Card body>
		<CardTitle><h3>Display Widgets</h3></CardTitle>
		<p>Widgets for displaying text and images.</p>
		<MDCard />
		<CounterCard />
		<TableCard />		
	</Card>);
};

const TableCard = () => {
	let columns = ['name','city','pet','somethinglongwindedheretouseupspace'];
	let dataTree = new Tree();
	let tt = Tree.add(dataTree, {name:"Tech Team", city:"Edinburgh"});
	Tree.add(tt, {name:"Dan", city:"Edinburgh", pet:"cat", somethinglongwindedheretouseupspace:"wellwhatdoyouknowIthinkthisisalongentry"});
	let st = Tree.add(dataTree, {name:"Commercial Team", city:"London"});
	Tree.add(st, {name:"Amy", city:"London"});
	let st2 = Tree.add(st, {name:"Sales Team", city:"London"});
	Tree.add(st2, {name:"Jules", city:"London"});
	Tree.add(st2, {name:"Charley", city:"London"});

	let cols = "row/col 1 2 3 4 5 6 7 8 9".split(" ")
	let items = [];
	for(let i=0; i<5; i++) {
		let item = {"row":i};
		items.push(item);
		for(let j=1; j<10; j++) {
			item[j] = "row: "+i+" col: "+j;
		}
	}

	return (<SubCard title="SimpleTable">
		<WidgetExample name="Tree and Scroll" keywords={baseKeywords}>
			<SimpleTable columns={columns} dataTree={dataTree} csv scroller hasCollapse />
		</WidgetExample>

		<WidgetExample name="Big scrolling table">
			<SimpleTable scroller style={{width:'300px', height:'300px'}} data={items} columns={cols} />
		</WidgetExample>

	</SubCard>);
};



const CounterCard = () => {
	return (<SubCard title="Counter">
		<WidgetExample name="Low £ Counter - preservePennies" keywords={baseKeywords}>
			<p>The amount is: <Counter amount={new Money("£12.3411")} preservePennies /> (should be £12.34).</p>
		</WidgetExample>
		<WidgetExample name="No pennies Counter - preservePennies" keywords={baseKeywords}>
			<p>The amount is: <Counter amount={new Money("£14")} preservePennies /> (should be £14.00).</p>
		</WidgetExample>
		<WidgetExample name="High £ Counter - preservePennies" keywords={baseKeywords}>
			<p>The amount is: <Counter amount={new Money("£56789.12345")} preservePennies /> (should be £56,789.12).</p>
		</WidgetExample>
		<WidgetExample name="High £ Counter - 3 sig figs" keywords={baseKeywords}>
			<p>The amount is: <Counter amount={new Money("£22345.7777")} sigFigs={3} /> (should be £22,300).</p>
		</WidgetExample>
		<WidgetExample name="Counter - 2 sig figs + pennies (Broken - but it is an odd usage)" keywords={baseKeywords}>
			<p>The amount is: <Counter amount={new Money("£987.2222")} sigFigs={2} preservePennies /> (should be £990.00).</p>
		</WidgetExample>
		<WidgetExample name="Decimal Counter" keywords={baseKeywords}>
			<p>The number is: <Counter value={12345.12345} sigFigs={10} /> (should be 12334.12345).</p>
		</WidgetExample>
		<WidgetExample name="Counter - centred text" keywords={baseKeywords}>
			<p>The number is: <Counter value={12345} centerText /> (should be 12,345).</p>
		</WidgetExample>
	</SubCard>);
};

const MDCard = () => {
	return (<SubCard title="Markdown">
		<WidgetExample name="mdtext image tag" keywords={baseKeywords}>
			<MDText source={`<img src='/img/gl-logo/LogoMark/logo.64.png' />`} />
		</WidgetExample>
		<WidgetExample name="mdtext image md format" keywords={baseKeywords}>
			<MDText source="![](/img/gl-logo/LogoMark/logo.64.png)" />
		</WidgetExample>
		<WidgetExample name="mdtext security: no js allowed" keywords={baseKeywords}>
			<MDText source={`

<script>alert("pwnd!");</script>


<button onClick="alert('gotcha');">mwhaha</button>


			`}
			/>
			<MDText source={`

<button 
onClick="alert('gotcha');">mwhaha again
</button>


			`}
			/>
		</WidgetExample>
		<WidgetExample name="MDText line-break parsing" keywords={baseKeywords}>
			<MDText source="This line ends in br-slash<br/>This line ends in br with no slash<br>This line ends in br-space-slash<br />This is the last line" />
		</WidgetExample>
	</SubCard>);
};

export default DisplayWidgets;
