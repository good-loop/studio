/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import React, {useState} from 'react';
import PropControl, { FormControl } from '../base/components/PropControl';
import ErrorAlert from '../base/components/ErrorAlert';
import DataStore from '../base/plumbing/DataStore';
import { Input, FormGroup, Label, Form, CardTitle, Card } from 'reactstrap';
import LayoutWidgets from './LayoutWidgets';
import WidgetExample, { getFilter } from './WidgetExample';

const WidgetsPage = () => {

	let f = getFilter();

	return (<>
		<h1>Welcome to the Widget Studio</h1>			

		<FormGroup>
			<Label>Filter widgets</Label>
			<Input type='search' name='f' value={f} onChange={e => DataStore.setUrlValue('f', e.target.value)} />
		</FormGroup>

		<hr/>

		<PropControlWidgets />		

		<MessageWidgets />

		<LayoutWidgets />
	</>
	);

};

// ??REfactor into separate files
const MessageWidgets = () => {	
	const err = new Error("Show this when something goes wrong.");
	return (<Card body>		
		<CardTitle><h3>Message Widgets</h3></CardTitle>
		
		<WidgetExample name='ErrorAlert' keywords='error alert' >
			<ErrorAlert error={err} />
		</WidgetExample>
		
	</Card>);
};

const PropControlWidgets = () => {
	let baseKeywords = 'propcontrol input';
	return (<Card body>
		
		<CardTitle><h3>PropControl Widgets</h3></CardTitle>

		<Card body>

			<CardTitle><h4>Simple Values</h4></CardTitle>

			<WidgetExample name='Basic text input' keywords={baseKeywords}>
				<PropControl prop='mybasictext' path={['widget','BasicTextPropControl']} 
					label='Favourite Pizza' help='Use this for text entry' />
			</WidgetExample>

			{/* TODO: The actual autocomplete box seems hidden or empty somehow? */}
			<WidgetExample name='Autocomplete' keywords={baseKeywords}>
				<PropControl type="autocomplete" prop='myautocomp' path={['widget','BasicTextPropControl']} 
					help='Use this for text entry' />
			</WidgetExample>

			<WidgetExample name='MoneyControl' keywords={baseKeywords}>
				<PropControl type='Money' prop='mymoney' currency="GBT" min={new Money(5)} max={new Money(100)}
					path={['widget','BasicTextPropControl']} help='Money help would go here.' />
			</WidgetExample>

			<WidgetExample name='URL input' keywords={baseKeywords}>
			<PropControl type='url' prop='myurl'
				path={['widget','BasicTextPropControl']} help='Put in a URL' />
			</WidgetExample>

			<WidgetExample name='Text area input' keywords={baseKeywords}>
			<PropControl type='textarea' prop='mytextarea'
				path={['widget','BasicTextPropControl']} help='Text area help: type something' />
			</WidgetExample>

			<WidgetExample name='Date input' keywords={baseKeywords}>
				<PropControl type="date" prop='mydate' path={['widget','BasicTextPropControl']} 
					label='Date' help='Take a date' />
			</WidgetExample>
		
		</Card>

		<Card body>

			<CardTitle><h4>Selectors</h4></CardTitle>

			<WidgetExample name='Country input' keywords={baseKeywords}>
				<PropControl type="country" prop='mycountry' path={['widget','BasicTextPropControl']} 
					label='Country' help='Select a country' />
			</WidgetExample>

			<WidgetExample name='Radio buttons' keywords={baseKeywords}>
				<PropControl type='radio' options={['Apples', 'Bananas', 'Pears']} prop='myradio' 
					path={['widget','BasicTextPropControl']} help='Radio button help would go here.' />
			</WidgetExample>

			<WidgetExample name='Yes-No' keywords={baseKeywords+' yesno'}>
				<PropControl type='yesNo' prop='yehnay' label='Do you like dogs?'
					path={['widget','BasicTextPropControl']} help='Help for yes or no: pick one.' />
			</WidgetExample>

			<WidgetExample name='Checkboxes' keywords={baseKeywords}>
				<PropControl label='We accept' type='checkboxes' options={['Cash', 'Cheque', 'Card']} prop='mycheckbox' 
					path={['widget','BasicTextPropControl']} help='Checkboxes help would go here.' />
			</WidgetExample>

			<WidgetExample name='Selection control' keywords={baseKeywords}>
				<PropControl type='select' prop='myselect' options={["fee", "fi", "fo", "fum"]} labels={["Fee", "Fi", "Fo", "Fum"]}
					path={['widget','BasicTextPropControl']} help='Selection help: choose one' />
			</WidgetExample>

			{/* TODO: Throws warning that uncontrolled checkboxes are being changed to controlled, but multi select code looks like a temp workaround anyway? */}
			<WidgetExample name='Selection control - multiple select' keywords={baseKeywords}>
				<PropControl type='select' prop='mymultselect' options={["fee", "fi", "fo", "fum"]} labels={["Fee", "Fi", "Fo", "Fum"]} multiple={true}
					path={['widget','BasicTextPropControl']} help='Multiple selection help: choose some' />
			</WidgetExample>

		</Card>

		<Card body>

			<CardTitle><h4>Files</h4></CardTitle>

			<WidgetExample name='Image URL' keywords={baseKeywords}>
				<PropControl type='img' prop='myimg'
					path={['widget','BasicTextPropControl']} help='Image URL help goes here' />
			</WidgetExample>

			{/* Dropzone must be v4.3.0 for this - had to update package.json */}
			<WidgetExample name='Image upload' keywords={baseKeywords}>
				<PropControl type='imgUpload' prop='myimgupload'
					path={['widget','BasicTextPropControl']} help='Image upload help goes here' />
			</WidgetExample>

			{/* This too ^^ */}
			<WidgetExample name='Video upload' keywords={baseKeywords}>
				<PropControl type='videoUpload' prop='myvidupload'
					path={['widget','BasicTextPropControl']} help='Video upload help goes here' />
			</WidgetExample>

		</Card>

		{/* TODO: Throws error on mounting but is deprecated, so didn't dig any further */}
		{/*<WidgetExample name='Key value input' keywords={baseKeywords}>
			<PropControl type='keyvalue' prop='mykeyvalue'
				path={['widget','BasicTextPropControl']} help='Key value help goes here' />
		</WidgetExample>*/}

		<Card body>

			<CardTitle><h4>Other</h4></CardTitle>

			{/* TODO: Has no service prop, does it need one passed, and if so what? */}
			<WidgetExample name='XId input' keywords={baseKeywords}>
				<PropControl type='XId' prop='myxid'
					path={['widget','BasicTextPropControl']} help='XId help goes here' />
			</WidgetExample>

			{/* TODO: Behaviour is possibly a little iffy */}
			<WidgetExample name='Array text input' keywords={baseKeywords}>
				<PropControl type='arraytext' prop='myarraytext'
					path={['widget','BasicTextPropControl']} help='Array text help goes here' />
			</WidgetExample>

			<WidgetExample name='Key set input' keywords={baseKeywords}>
				<PropControl type='keyset' prop='mykeyset'
					path={['widget','BasicTextPropControl']} help='Key set help goes here' />
			</WidgetExample>

			<WidgetExample name='Entry set input' keywords={baseKeywords}>
				<PropControl type='entryset' prop='myentryset'
					path={['widget','BasicTextPropControl']} help='Entry set help goes here' />
			</WidgetExample>

		</Card>

		<Card body>

			<CardTitle><h4>Code</h4></CardTitle>

			{/* TODO: Behaviour seems totally wack, unless its purpose is beyond my understanding */}
			<WidgetExample name='HTML input' keywords={baseKeywords}>
				<PropControl type='html' prop='myhtml'
					path={['widget','BasicTextPropControl']} help='HTML help: type some HTML' />
			</WidgetExample>

			{/* Laggy but works fine */}
			<WidgetExample name='JSON input' keywords={baseKeywords}>
				<PropControl type='json' prop='myjson'
					path={['widget','BasicTextPropControl']} help='JSON help: type some JSON' />
			</WidgetExample>

		</Card>

	</Card>);
};

export default WidgetsPage;
