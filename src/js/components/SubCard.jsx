
import React, { useState } from 'react';
import {Card, CardTitle } from 'reactstrap';

/**
 * A Card for use inside a larger Card
 */
const SubCard = ({title,children}) => {
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
	return <Card body><CardTitle><h4>{title}</h4></CardTitle>{children}</Card>;
};

export default SubCard;
 