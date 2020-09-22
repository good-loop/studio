
import React from 'react';
import DataStore from '../base/plumbing/DataStore';
import { Card, CardTitle } from 'reactstrap';

const getFilter = () => (DataStore.getUrlValue('f') || '').toLowerCase();

const WidgetExample = ({name, keywords, children, setShow, className}) => {
	let filter = getFilter();
	if (filter) {
		let fs = (name+" "+keywords).toLowerCase();
		if ( ! fs.includes(filter)) {
			return null;
		}
	}	
	if (setShow) setShow(true);
	
	// The name is added as a "name" attribute to each prop to ensure a unique identifier for testing
	// Having the unique selector derive from the searchable term helps confirm search success in pupetteer too
	return (<Card name={name.replace(/[^a-zA-Z0-9-_]/g, "").toLowerCase()} body>
		<CardTitle>{name}</CardTitle>
		{children}
	</Card>);
};

export default WidgetExample;
export {
	getFilter
};
