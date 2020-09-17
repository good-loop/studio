

import React, { useState, useEffect } from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import PropControlPills from '../base/components/PropControlPills';
import DataStore, { getValue } from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form, Card, CardTitle } from 'reactstrap';
import Wizard, { WizardStage } from '../base/components/WizardProgressWidget';
import WidgetExample from './WidgetExample';
import ErrorAlert from '../base/components/ErrorAlert';
import SubCard from './SubCard';

let baseKeywords = 'propcontrol input';

const PropControlWidgets = () => {
	
	return (<Card body>

		<CardTitle><h3>PropControl Widgets</h3></CardTitle>

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
				<ErrorAlert error={"Behaviour is inconsistent (9/6/2020)"} />
				<PropControl type="arraytext" prop="myarraytext"
					path={['widget', 'BasicTextPropControl']} help="Array text help goes here" />
			</WidgetExample>

			<WidgetExample name="Key set input" keywords={baseKeywords}>
				<ErrorAlert error={"Does not update DataStore on removing key (9/6/2020)"} />
				<PropControl type="keyset" prop="mykeyset"
					path={['widget', 'BasicTextPropControl']} help="Key set help goes here" />
			</WidgetExample>

			<WidgetExample name="Entry set input" keywords={baseKeywords}>
				<ErrorAlert error={"Does not update DataStore on removing entry (9/6/2020)"} />
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
				<PropControl type="json" prop="myjson"
					path={['widget', 'BasicTextPropControl']} help="JSON help: type some JSON" />
			</WidgetExample>

		</Card>

		<Sizes />

		<Performance />

		<DataManipulation />
		
		<CustomControls />

	</Card>);
};

const CustomControls = () => {
	return (<SubCard title="Custom Controls">
		<WidgetExample name="Pills" keywords={baseKeywords+" custom pills"}>
			<PropControl type="pills" prop="mypills" path={['widget', 'pills']} />
			<div>Value: <code>{JSON.stringify(DataStore.getValue('widget','pills','mypills'))}</code></div>
			Known issues: styling, add-pill if you leave the control
		</WidgetExample>
	</SubCard>);
};

const prepath = ['widget', 'dflt', 'already'];
const blankpath = ['widget', 'dflt', 'blank'];

const DataManipulation = () => {
	// Set a value for the "dflt, but val"
	useEffect(() => {
		DataStore.setValue(prepath, "Text from DataStore which should override dflt");
	}, []);

	return (
		<SubCard title="Data Manipulation in PropControl">
			<WidgetExample name="Component given dflt, but a value is already present at its path+prop in DataStore." keywords={baseKeywords}>
				<PropControl prop="already" path={['widget','dflt']} label="Already set" dflt="default text provided :)" />
				DS value: {DataStore.getValue(prepath)}
			</WidgetExample>
			<WidgetExample name="Component given dflt, and no pre-existing value in DataStore. " keywords={baseKeywords}>
				<PropControl prop="blank" path={['widget','dflt']} label="Blank" dflt="default text provided :)" />
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


const SimpleInputs = () => {
	return (
		<Card body>

			<CardTitle><h4>Simple Values</h4></CardTitle>

			<WidgetExample name="Basic text input" keywords={baseKeywords}>
				<PropControl prop="mybasictext" path={['widget', 'BasicTextPropControl']}
					label="Favourite Pizza" help="Use this for text entry" />
			</WidgetExample>

			<WidgetExample name="Autocomplete" keywords={baseKeywords}>
				<PropControl type="autocomplete" prop="myautocomp" path={['widget', 'BasicTextPropControl']} staticOptions
					options={autocompleteOptions}
					help="Type a letter and get an autocomplete option"
				/>
			</WidgetExample>

			<WidgetExample name="MoneyControl" keywords={baseKeywords}>
				<PropControl type="Money" prop="mymoney" currency="GBT"
					path={['widget', 'BasicMoneyPropControl']} help="Money help would go here." />
					<code>{JSON.stringify(DataStore.getValue("widget",'BasicMoneyPropControl','mymoney'))}</code>
			</WidgetExample>

			<WidgetExample name="BlankMoneyControl" keywords={baseKeywords}>
				<PropControl type="Money" prop="damoney" currency="GBT" min={new Money(5)} max={new Money(100)}
					path={['widget', 'BlankMoneyBug']} />
					<code>{JSON.stringify(DataStore.getValue("widget",'BlankMoneyBug','damoney'))}</code>
			</WidgetExample>

			<WidgetExample name="Money with min:5 max:100" keywords={baseKeywords}>
				<PropControl type="Money" prop="minmaxmoney" currency="GBT" min={new Money(5)} max={new Money(100)}
					path={['widget', 'MoneyControl']} />
					<code>{JSON.stringify(DataStore.getValue("widget",'MoneyControl','minmaxmoney'))}</code>
			</WidgetExample>

			<WidgetExample name="URL input" keywords={baseKeywords}>
				<PropControl type="url" prop="myurl"
					path={['widget', 'BasicTextPropControl']} help="Put in a URL" />
			</WidgetExample>

			<WidgetExample name="Text area input" keywords={baseKeywords}>
				<PropControl type="textarea" prop="mytextarea"
					path={['widget', 'BasicTextPropControl']} help="Text area help: type something" />
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
				<PropControl type="checkboxes" label="We accept" options={['Cash', 'Cheque', 'Card']} prop="mycheckbox"
					path={['widget', 'BasicTextPropControl']} help="Checkboxes help would go here." />
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

export default PropControlWidgets;
