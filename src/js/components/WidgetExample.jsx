
import React from 'react';
import DataStore from '../base/plumbing/DataStore';
import { Card, CardTitle } from 'reactstrap';

const getFilter = () => (DataStore.getUrlValue('f') || '').toLowerCase();

const WidgetExample = ({name, keywords, children}) => {
	let filter = getFilter();
	if (filter) {
		let fs = (name+" "+keywords).toLowerCase();
		if ( ! fs.includes(filter)) {
			return null;
		}
	}

	return (<Card body>
		<CardTitle>{name}</CardTitle>
		{children}
	</Card>);
};

export default WidgetExample;
export {
	getFilter
};
