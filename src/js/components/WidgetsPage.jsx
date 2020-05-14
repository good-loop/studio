/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import React, {useState} from 'react';
import PropControl from '../base/components/PropControl';
import ErrorAlert from '../base/components/ErrorAlert';

const WidgetsPage = () => {

	return (<>
		<h1>Welcome to the Widget Studio</h1>			

		TODO filter

		<MessageWidgets />

		<PropControl prop='testprop' label='Basic text input' help='Use this for text entry' />

	</>
	);

};

const MessageWidgets = () => {
	const err = new Error("Show this when something goes wrong.");
	return <ErrorAlert error={err} />;
};

export default WidgetsPage;
