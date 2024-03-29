
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
import Icon from '../base/components/Icon';
import DynImg from '../base/components/DynImg';

const baseKeywords = "display";

const DisplayWidgets = () => {
	return (
	<SubCard body title="DisplayWidgets">
		<p>Widgets for displaying text and images.</p>
		<DynImgCard />
		<IconCard />
		<MDCard />
		<CounterCard />
		<TableCard />
	</SubCard>);
};


const DynImgCard = () => {
	return (
		<SubCard title="DynImg - dynamic image scaling">
			<p>Check the elements used - they should be scaled to the size or a bit bigger (and hence avoid the 1.7mb raw file)</p>
			<DynImg src="https://media.good-loop.com/uploads/raw/abae-1920301059708066881.png" style={{width:"200px"}} />
			<DynImg src="https://media.good-loop.com/uploads/raw/abae-1920301059708066881.png" style={{width:"800px"}} />
		</SubCard>
	);
};


const IconCard = () => {
	let iconNames = Object.keys(
		// copy-paste from Icon.jsx
		{camera: "📷",
	trashcan: "🗑", //&#x1f5d1;
	info: "🛈", // ℹ or 🛈
	".txt":"🖹",
	tick: "✔",
	memo: "📝",
	});

	let appNames = "twitter facebook instagram linkedin google chrome".split(" ");

	return (
		<SubCard title="Icons and Emoji">
			<p>
				Maybe in colour: {iconNames.map(n => <span key={n}>{n}: <Icon name={n} />, </span>)}
			</p>

			<p className="bg-info">White and medium: 
				{iconNames.map(n => <span key={n}>{n}: <Icon color="white" size="" name={n} />, </span>)}
			</p>

			<p>Black and Large: 
				{iconNames.map(n => <span key={n}>{n}: <Icon color="black" size="lg" name={n} />, </span>)}
			</p>

			<p>Small logos: 
				{appNames.map(n => <span key={n}>{n}: <Icon size="sm" name={n} />, </span>)}
			</p>

			<p>Large logos: 
				{appNames.map(n => <span key={n}>{n}: <Icon size="lg" name={n} />, </span>)}
			</p>
		</SubCard>
	);
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

	let cols = "row 1 2 3 4 5 6 7 8 9".split(" ")
	let items = [];
	for(let i=0; i<5; i++) {
		let item = {"row":i};
		items.push(item);
		for(let j=1; j<10; j++) {
			item[j] = "row: "+i+" col: "+j;
		}
	}

	let [sum,setSum] = useState();
	const onSelect = (selection) => {
		let {start, end, data} = selection;
		console.log(selection);
		if (data) {
			let s = 0;
			data.forEach(row => {
				row.forEach(v => s+=v);
			});
			setSum(s);
		}
	};

	return (
		<SubCard title="SimpleTable">

			<WidgetExample name="Tree and Scroll" keywords={baseKeywords}>
				<SimpleTable columns={columns} dataTree={dataTree} csv scroller hasCollapse />
			</WidgetExample>

			<WidgetExample name="Select Sum Table">
				<SimpleTable data={[{row:"A", 1:1, 2:2, 3:3}, {row:"B", 1:2, 2:4, 3:6}]} columns={"row 1 2 3".split(" ")} onSelect={onSelect} />
				<div>Sum: {sum}</div>
			</WidgetExample>

			<WidgetExample name="Big scrolling table">
				<div style={{width:'300px', height:'300px'}}><SimpleTable scroller data={items} columns={cols} /></div>
			</WidgetExample>
		</SubCard>
	);
};



const CounterCard = () => {
	return (
		<SubCard title="Counter">
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
		</SubCard>
	);
};


const taskMarkdown = `
Task list

- [ ] A task *with* **bold** text.
- [x] A done task with a <http://example.com> link

Just a List

- A normal list
- *just a list item*

Yeh :)`;

const securityMarkdown1 = `
<script>alert("pwnd!");</script>

<button onClick="alert('gotcha');">mwhaha</button>`;

const securityMarkdown2 = `
<button 
onClick="alert('gotcha');">mwhaha again
</button>`;

const linebreakMarkdown = 'This line ends in br-slash<br/>This line ends in br with no slash<br>This line ends in br-space-slash<br />This is the last line';

const strikethroughMarkdown = 'Hello ~blah~';

const imgHTMLMarkdown = '<img src="/img/gl-logo/LogoMark/logo.64.png" />';

const imgMDMarkdown = '![](/img/gl-logo/LogoMark/logo.64.png)';


const MDCard = () => {
	const taskPath = ['misc','markdown', 'taskText'];
	let taskText = DataStore.getValue(taskPath) || DataStore.setValue(taskPath, taskMarkdown);

	return (
		<SubCard title="Markdown">
			<WidgetExample name="mdtext markdown-tasks" keywords={baseKeywords}>
				<MDText 
					setSource={newText => DataStore.setValue(taskPath, newText)}
					source={taskText}
				/>
			</WidgetExample>
			<WidgetExample name="mdtext image tag" keywords={baseKeywords}>
				<MDText source={imgHTMLMarkdown} />
			</WidgetExample>
			<WidgetExample name="mdtext image md format" keywords={baseKeywords}>
				<MDText source={imgMDMarkdown} />
			</WidgetExample>
			<WidgetExample name="mdtext security: no js allowed" keywords={baseKeywords}>
				<MDText source={securityMarkdown1} />
				<MDText source={securityMarkdown2} />
			</WidgetExample>
			<WidgetExample name="MDText line-break parsing" keywords={baseKeywords}>
				<MDText source={linebreakMarkdown} />
			</WidgetExample>
			<WidgetExample name="MDText GFM - should have strikethrough" keywords={baseKeywords}>
				<MDText source={strikethroughMarkdown} />
			</WidgetExample>
		</SubCard>
	);
};

export default DisplayWidgets;
