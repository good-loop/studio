

import React, { useState, useEffect } from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import PropControls from '../base/components/PropControls';
import DataStore, { getValue } from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form, Card, CardTitle, Button } from 'reactstrap';
import Wizard, { WizardStage } from '../base/components/WizardProgressWidget';
import WidgetExample from './WidgetExample';
import ErrAlert from '../base/components/ErrAlert';
import SubCard from './SubCard';
import { stopEvent } from '../base/utils/miscutils';

let baseKeywords = 'propcontrol input';

const PropControlWidgets = () => {
	
	return (<SubCard title="PropControl Widgets">

		<SimpleInputs />

		<Selectors />

		<SubCard title="Files">
			<WidgetExample name="Image URL" keywords={baseKeywords}>
				<PropControl type="img" prop="myimg"
					path={['widget', 'BasicTextPropControl']} help="Image URL help goes here" />
			</WidgetExample>

			{/* Dropzone must be v4.3.0 for this - had to update package.json */}
			<WidgetExample name="Image upload" keywords={baseKeywords}>
				<PropControl type="imgUpload" prop="myimgupload"
					path={['widget', 'BasicTextPropControl']} help="Image upload help goes here" />
			</WidgetExample>

			{/* This too ^^ */}
			<WidgetExample name="Video upload" keywords={baseKeywords}>
				<PropControl type="videoUpload" prop="myvidupload"
					path={['widget', 'BasicTextPropControl']} help="Video upload help goes here" />
			</WidgetExample>
		</SubCard>

		{/* TODO: Throws error on mounting but is deprecated in place of EntrySet, so didn't dig any further */}
		{/*<WidgetExample name='Key value input' keywords={baseKeywords}>
			<PropControl type='keyvalue' prop='mykeyvalue'
				path={['widget','BasicTextPropControl']} help='Key value help goes here' />
		</WidgetExample>*/}

		<Card body>

			<CardTitle><h4>Other</h4></CardTitle>

			<WidgetExample name="XId input" keywords={baseKeywords}>
				<PropControl type="XId" prop="myxid" service="service"
					path={['widget', 'BasicTextPropControl']} help="XId help goes here" />
			</WidgetExample>

			{/* TODO: Behaviour is possibly a little iffy */}
			<WidgetExample name="Array text input" keywords={baseKeywords}>
				<PropControl type="arraytext" prop="myarraytext"
					path={['widget', 'BasicTextPropControl']} help="Array text help goes here" />
			</WidgetExample>

			<WidgetExample name="Key set input" keywords={baseKeywords}>
				<ErrAlert error="Can add entry before entering a value, yielding undefined key 22/09/2020" />
				<PropControl type="keyset" prop="mykeyset"
					path={['widget', 'BasicTextPropControl']} help="Key set help goes here" />
			</WidgetExample>

			<WidgetExample name="Entry set input" keywords={baseKeywords}>
				<PropControl type="entryset" prop="myentryset"
					path={['widget', 'BasicTextPropControl']} help="Entry set help goes here" />
			</WidgetExample>

		</Card>

		<Card body>

			<CardTitle><h4>Code</h4></CardTitle>

			<WidgetExample name="HTML input" keywords={baseKeywords}>
				<PropControl type="html" prop="myhtml"
					path={['widget', 'BasicTextPropControl']} help="HTML help: Try pasting in some formatted text from a web page or word processor"
				/>
			</WidgetExample>

			<WidgetExample name="JSON input" keywords={baseKeywords}>
				<ErrAlert error="Throws error on attempting to edit 22/09/2020" />
				<PropControl type="json" prop="myjson"
					path={['widget', 'BasicTextPropControl']} help="JSON help: type some JSON" />
			</WidgetExample>

		</Card>

		<Sizes />

		<Performance />

		<DataManipulation />
		
		<CustomControls />

		<Forms />

	</SubCard>);
};

const CustomControls = () => {
	return (<SubCard title="Custom Controls">
		<WidgetExample name="Pills" keywords={baseKeywords+" custom pills"}>
			<ErrAlert error="Known issues: (1) Styling" />
			<PropControl type="pills" prop="mypills" path={['widget', 'pills']} />
			<div>Value: <code>{JSON.stringify(DataStore.getValue('widget','pills','mypills'))}</code></div>
		</WidgetExample>
	</SubCard>);
};

const prepath = ['widget', 'dflt', 'already'];
const blankpath = ['widget', 'dflt', 'blank'];

const DataManipulation = () => {
	// Set a value for the "dflt, but val"
	useEffect(() => {
		DataStore.setValue(prepath, "Text from DataStore which should override dflt :)");
	}, []);

	return (
		<SubCard title="Data Manipulation in PropControl">
			<WidgetExample name="Component given dflt, but a value is already present at its path+prop in DataStore." keywords={baseKeywords}>
				<PropControl prop="already" path={['widget','dflt']} label="Already set" dflt="default text should be ignored :(" 
					help="Expected behaviour: the default is ignored" />
				DS value: {DataStore.getValue(prepath)}
			</WidgetExample>
			<WidgetExample name="Component given dflt, and no pre-existing value in DataStore. " keywords={baseKeywords}>
				<PropControl prop="blank" path={['widget','dflt']} label="Blank" dflt="default text provided :)" 
					help="Expected behaviour: the default gets set as the DS value. Otherwise, if the user left it as-is, then it'd never get set. NB: use placeholder if you want to suggest a value without setting it." 
				/>
				DS value: {DataStore.getValue(blankpath)}
			</WidgetExample>
		</SubCard>
	);
};

DataStore.setValue(['widget', 'BlankMoneyBug','damoney'], {currency:'GBP'});

const autocompleteOptions = ['Able', 'Alpha', 'Baker', 'Bravo', 'Charlie', 'Delta', 'Dog', 'Easy', 'Echo',
	'Fox', 'Foxtrot', 'George', 'Golf', 'Hotel', 'How', 'India', 'Item', 'Jig', 'Juliet', 'Kilo', 'King',
	'Lima', 'Love', 'Mike', 'Nan', 'November', 'Oboe', 'Oscar', 'Papa', 'Peter', 'Quebec', 'Queen', 'Roger',
	'Romeo', 'Sierra', 'Sugar', 'Tango', 'Tare', 'Uncle', 'Uniform', 'Victor', 'Whiskey', 'William', 'X-ray',
	'Yankee', 'Yoke', 'Zebra', 'Zulu'];

const autocompleteObjectOptions = [
	{id:'apple', name:"Lovely Apples!"},
	{id:'banana', name:"Yes, we have some Bananas"},
	{id:'capsicum', name:"Pepper. It's a fruit, alright?"}
];

const SimpleInputs = () => {
	return (
		<Card body>

			<CardTitle><h4>Simple Values</h4></CardTitle>

			<WidgetExample name="Basic text input" keywords={baseKeywords}>
				<PropControl prop="mybasictext" path={['widget', 'BasicTextPropControl']}
					label="Favourite Pizza" help="Use this for text entry" />
			</WidgetExample>

			<WidgetExample name="Autocomplete simple" keywords={baseKeywords}>
				<PropControl type="autocomplete" prop="myautocomp" path={['widget', 'BasicTextPropControl']}
					options={autocompleteOptions}
					help="Type a letter and get an autocomplete option"
				/>
			</WidgetExample>
			<WidgetExample name="Autocomplete Objects" keywords={baseKeywords}>
				<PropControl type="autocomplete" prop="myobjval" path={['widget', 'AutoComplete']}
					options={autocompleteObjectOptions}
					getItemValue={itm => itm.id}
					renderItem={itm => <div key={itm.id} className="dropdown-item">{itm.name}</div>}
					shouldItemRender={(itm,val) => JSON.stringify(itm).toLowerCase().includes((val+"").toLowerCase())}
					help="Filter by Name, but set the ID"
				/>
				<code>{DataStore.getValue(['widget','AutoComplete','myobjval'])}</code>
			</WidgetExample>

			<WidgetExample name="MoneyControl" keywords={baseKeywords}>
				<PropControl type="Money" prop="mymoney" currency="GBP"
					path={['widget', 'BasicMoneyPropControl']} help="Money help would go here." />
					<code>{JSON.stringify(DataStore.getValue("widget",'BasicMoneyPropControl','mymoney'))}</code>
			</WidgetExample>

			<WidgetExample name="BlankMoneyControl" keywords={baseKeywords}>
				<PropControl type="Money" prop="damoney" currency="GBP" min={new Money(5)} max={new Money(100)}
					path={['widget', 'BlankMoneyBug']} />
					<code>{JSON.stringify(DataStore.getValue("widget",'BlankMoneyBug','damoney'))}</code>
			</WidgetExample>

			<WidgetExample name="MoneyControl with value" keywords={baseKeywords}>
				{DataStore.getValue("widget",'HasMoneyBug','damoney')? null	// set a value to begin with
					: DataStore.setValue(["widget",'HasMoneyBug','damoney'], new Money(12.34)) && null
				}
				<PropControl type="Money" prop="damoney" path={['widget', 'HasMoneyBug']} />
					<code>{JSON.stringify(DataStore.getValue("widget",'HasMoneyBug','damoney'))}</code>
			</WidgetExample>

			<WidgetExample name="Money with min:5 max:100" keywords={baseKeywords}>
				<PropControl type="Money" prop="minmaxmoney" currency="GBP" min={new Money(5)} max={new Money(100)}
					path={['widget', 'MoneyControl']} />
					<code>{JSON.stringify(DataStore.getValue("widget",'MoneyControl','minmaxmoney'))}</code>
			</WidgetExample>

			<WidgetExample name="MoneyControl - change currency £ $" keywords={baseKeywords}>
				<PropControl type="Money" prop="mymoney" changeCurrency
					path={['widget', 'MoneyPropControlCurrency']} help="Try switching currency" />
					<code>{JSON.stringify(DataStore.getValue("widget",'MoneyPropControlCurrency','mymoney'))}</code>
			</WidgetExample>

			<WidgetExample name="SmallMoneyControl" keywords={baseKeywords}>
				<PropControl size="sm" type="Money" prop="smallmoney" currency="GBP" min={new Money(5)} max={new Money(100)}
					path={['widget', 'SmallMoney']} />
					<code>{JSON.stringify(DataStore.getValue("widget",'SmallMoney','smallmoney'))}</code>
			</WidgetExample>

			<WidgetExample name="URL input" keywords={baseKeywords}>
				<PropControl type="url" prop="myurl"
					path={['widget', 'BasicTextPropControl']} help="Put in a URL" />
			</WidgetExample>

			<WidgetExample name="Textarea input" keywords={baseKeywords}>
				<PropControl type="textarea" prop="mytextarea"
					path={['widget', 'BasicTextPropControl']} help="Text area help: type something" />
			</WidgetExample>

			<WidgetExample name="Flex-grow textarea + button" keywords={baseKeywords}>
				<div className='flex-row'>
					<div className='flex-grow'>
						<PropControl type="textarea" prop="mytextarea" className="w-100"
							path={['widget', 'textarea2']} help="Textarea2 help: type something" />
					</div>
					<Button className='btn btn-secondary'>Button</Button>
				</div>
			</WidgetExample>

			<WidgetExample name="Date input" keywords={baseKeywords}>
				<PropControl type="date" prop="mydate" path={['widget', 'BasicTextPropControl']}
					label="Date" help="Take a date" />
			</WidgetExample>

		</Card>);
};

const Selectors = () => {
	return (
		<Card body>

			<CardTitle><h4>Selectors</h4></CardTitle>

			<WidgetExample name="Country input" keywords={baseKeywords}>
				<PropControl type="country" prop="mycountry" path={['widget', 'BasicTextPropControl']}
					label="Country" help="Select a country" />
			</WidgetExample>

			<WidgetExample name="Radio buttons" keywords={baseKeywords}>
				<PropControl type="radio" options={['Apples', 'Bananas', 'Pears']} prop="myradio"
					path={['widget', 'BasicTextPropControl']} help="Radio button help would go here." />
			</WidgetExample>

			<WidgetExample name="Yes-No" keywords={baseKeywords + ' yesno'}>
				<PropControl type="yesNo" prop="yehnay" label="Do you like dogs?"
					path={['widget', 'BasicTextPropControl']} help="Help for yes or no: pick one." />
			</WidgetExample>

			<WidgetExample name="Checkboxes" keywords={baseKeywords}>
				<PropControl type="checkboxes" label="We accept" options={['Cash', 'Cheque', 'Card','Cheque with Card']} 
					prop="mycheckboxes"
					path={['widget', 'BasicTextPropControl']} help="Checkboxes help would go here." />
				<pre>{JSON.stringify(DataStore.getValue('widget','BasicTextPropControl','mycheckboxes'))}</pre>
			</WidgetExample>
			
			<WidgetExample name="Checkboxes type=checkboxObject aka Map" keywords={baseKeywords}>
				<PropControl type="checkboxObject" label="We accept" options={['Cash', 'Cheque', 'Card','Cheque with Card']} 
					prop="mycheckboxobj"
					path={['widget', 'BasicTextPropControl']} help="Checkboxes help would go here." />
				<pre>{JSON.stringify(DataStore.getValue('widget','BasicTextPropControl','mycheckboxobj'))}</pre>
			</WidgetExample>

			<WidgetExample name="Selection control" keywords={baseKeywords}>
				<PropControl type="select" prop="myselect" options={["fee", "fi", "fo", "fum"]} labels={["Fee", "Fi", "Fo", "Fum"]}
					path={['widget', 'BasicTextPropControl']} help="Selection help: choose one" />
			</WidgetExample>

			<WidgetExample name="Selection Default and Unset" keywords={baseKeywords+' select unset'}>
				<PropControl type="select" prop="myselect_default_unset" options={["fee", "fi", "fo", "fum"]} dflt="fi" canUnset
					path={['widget', 'BasicTextPropControl']} help="Selection help: choose one - or unset" />
				Value: <code>{DataStore.getValue(['widget', 'BasicTextPropControl', 'myselect_default_unset'])}</code>
			</WidgetExample>

			<WidgetExample name="Multiselect control" keywords={baseKeywords}>
				<PropControl type="select" prop="mymultselect" options={["fee", "fi", "fo", "fum"]} labels={["Fee", "Fi", "Fo", "Fum"]} multiple={true}
					path={['widget', 'BasicTextPropControl']} help="Multiple selection help: choose some" />
			</WidgetExample>

		</Card>);
};

const Sizes = () => {
	return (<SubCard title="Sizes">
		<WidgetExample name="Small text input" keywords={baseKeywords+" size small"}>
			<PropControl 
					size="sm"
					prop="mysmalltext" path={['widget', 'BasicTextPropControl']}
					label="Favourite Mouse" help="Use this for text entry" />
		</WidgetExample>

		<WidgetExample name="Normal text input" keywords={baseKeywords+" size normal"}>
			<PropControl 
					prop="mynormaltext" path={['widget', 'BasicTextPropControl']}
					label="Favourite Cat" help="Use this for text entry" />
		</WidgetExample>

		<WidgetExample name="Large text input" keywords={baseKeywords+" size large"}>
			<PropControl 
					size="lg"
					prop="mylargetext" path={['widget', 'BasicTextPropControl']}
					label="Favourite Elephant" help="Use this for text entry" />
		</WidgetExample>

		<WidgetExample name="Small checkbox" keywords={baseKeywords+" size small checkbox"}>
			<PropControl className="mr-2" size="sm" type="checkbox" label="Wibble?" prop="wibble" path={['widget', 'SmallCheckbox']} value="foo" />
			<code>Value: {DataStore.getValue(['widget', 'SmallCheckbox','wibble'])}</code>
		</WidgetExample>
		<WidgetExample name="Normal checkbox" keywords={baseKeywords+" size normal checkbox"}>
			<PropControl className="mr-2" type="checkbox" label="Wibble?" prop="wibble" path={['widget', 'SmallCheckbox']} value="foo" />
		</WidgetExample>
		<WidgetExample name="Large checkbox" keywords={baseKeywords+" size large checkbox"}>
			<PropControl className="mr-2" size="lg" type="checkbox" label="Wibble?" prop="wibble" path={['widget', 'SmallCheckbox']} value="foo" />
		</WidgetExample>
	</SubCard>
	);
};

const RenderCounter = () => {
	let updates = React.useRef(0);
	return <div>Renders: {updates.current++}</div>;
};

const Performance = () => {
	return (<SubCard title="Performance">
		<WidgetExample name="fast no-update textarea" keywords={baseKeywords}>
			<PropControl 
				fast
				prop="myfasttext" path={['widget', 'FastPropControl']}
				label="Type fast" help="Only the propcontrol should re-render as you type." />			
			<RenderCounter />
			<p>Last update of DataStore: <code>{DataStore.getValue("widget","FastPropControl","myfasttext")}</code></p>
		</WidgetExample>
	</SubCard>);
};

const Forms = () => {
	return (<SubCard title="Forms">
		<WidgetExample name="submit on return" keywords={baseKeywords}>			
			<Form className='flex-row' onSubmit={e => stopEvent(e) && alert(JSON.stringify(DataStore.getValue('widget','MyForm')))}>
				<PropControl className='flex-grow' prop="formtext" path={['widget', 'MyForm']} />
				<Button className="ml-1" color='primary' type="submit">Submit</Button>
			</Form>
			<p>This isn't our widget, but standard use of Form and Button type="submit"</p>
<code><pre>
&lt;Form className='flex-row' onSubmit=&gt; 
	&lt;PropControl className='flex-grow' prop="" path= /&gt; 
	&lt;Button className="ml-1" color='primary' type="submit"&gt;Submit&lt;/Button&gt; 
&lt;/Form&gt;
</pre></code>
		</WidgetExample>
	</SubCard>);
};

export default PropControlWidgets;
