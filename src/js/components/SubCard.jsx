
import React, { useState } from 'react';
import {Card, CardTitle } from 'reactstrap';
import { space } from '../base/utils/miscutils';

/**
 * A Card for use inside a larger Card
 */
const SubCard = ({title,children,keywords}) => {
	// TODO hide if nothing is visible
	// let [show, setShow] = useState(false);
	// // pass in setShow
	// if (children) {
	// 	// array of elements (or just one)? screen nulls
	// 	if (children.filter) children = children.filter(x => !! x);
	// 	children = React.Children.map(children, (Kid, i) => {
	// 		console.log("clone", Kid);
	// 		return React.cloneElement(Kid, {setShow});
	// 	});
	// }

	// 	array of elements (or just one)? screen nulls
	if (children.filter) children = children.filter(x => !! x);
	
	children = React.Children.map(children, (Kid, i) => {
		let kws = Kid.props && Kid.props.keywords;
		let kws2 = space(kws, title, keywords);
		return React.cloneElement(Kid, {keywords:kws2});
	});

	return <Card body><CardTitle><h4>{title}</h4></CardTitle>{children}</Card>;
};

export default SubCard;
 