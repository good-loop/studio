
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
	
	return (<Card className={className} name={name.replace(/[^a-zA-Z0-9-_]/g, "").toLowerCase()} body>
		<CardTitle>{name}</CardTitle>
		{children}
	</Card>);
};

export default WidgetExample;
export {
	getFilter
};
