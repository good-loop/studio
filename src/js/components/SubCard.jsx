
import React, { useState } from 'react';
import {Card, CardTitle } from 'reactstrap';
import { space } from '../base/utils/miscutils';

/**
 * TODO a nice way to control visibility based on child-element answers.
 * Currently buggy (erratic)
 */
const useFlag = () => {
	let [flag, setFlag] = useState({});

	// defer to avoid upsetting react with a nested update
	let dsetFlag = x => _.defer(setFlag, {v:x});

	// use an object and set the value, to allow us to null it here.
	// sets up a 2-pass render
	let old = flag.v;
	flag.v = null;

	return [old, dsetFlag];
};

/**
 * A Card for use inside a larger Card
 */
const SubCard = ({title,children,keywords}) => {
	// hide if nothing is visible
	let [show, setShow] = useFlag();

	// 	array of elements (or just one)? screen nulls
	if (children.filter) children = children.filter(x => !! x);

	// pass in extra keywords and setShow
	children = React.Children.map(children, (Kid, i) => {
		let kws = Kid.props && Kid.props.keywords;
		let kws2 = space(kws, title, keywords);
		return React.cloneElement(Kid, {keywords:kws2, show, setShow});
	});

	return <Card body><CardTitle><h4>{title}</h4></CardTitle>{children}</Card>;
};

export default SubCard;
 