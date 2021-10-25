/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import Cookies from 'js-cookie';
import React from 'react';
import { Alert, Card } from 'reactstrap';
import Icon from '../base/components/Icon';
import { DefaultListItem } from '../base/components/ListLoad';
import LoginWidget, { LoginLink } from '../base/components/LoginWidget';
import Misc from '../base/components/Misc';
import SearchQuery from '../base/searchquery';
import { randomPick } from '../base/utils/miscutils';
import Login from '../base/youagain';
import SubCard from './SubCard';
import WidgetExample from './WidgetExample';

const SeqrchQueryTestPage = () => {	
	return <>
		<SQAndOrTest />
	</>;
};

ServerIO.USE_PROFILER = true;

let once = false;

const check = (b, msg) => {
	if (b) return null;
	return <Alert color="danger">{msg || "Fail :'("}</Alert>;
};
const checkEq = (a, b) => {
	if (a === b) return <Alert color="success"><Icon name="tick"/>{a}</Alert>;
	return <Alert color="danger">{"Mismatch: "+a+" != "+b}</Alert>;
};

const SQAndOrTest = () => {
	let sq1 = new SearchQuery("alice AND bob");
	let sq2 = new SearchQuery("carol OR dave");
	let sq3 = SearchQuery.and(sq1,sq2);
	let sq11 = SearchQuery.and(sq1,sq1);
	let sq22 = SearchQuery.or(sq2,sq2);
	return <Card>
		<SubCard title="Cons Test">
			<h3>sq1: {sq1.query}</h3>
			<pre>{JSON.stringify(sq1)}</pre>

			<h3>sq2: {sq2.query}</h3>
			<pre>{JSON.stringify(sq2)}</pre>
		</SubCard>
		<SubCard title="And+Or Test">
			<h3>sq1 + sq2 = {sq3.query}</h3>
			<pre>{JSON.stringify(sq3)}</pre>
			{checkEq(sq3.query, "(alice AND bob) AND (carol OR dave)")}
		</SubCard>
		<SubCard title="And+And Test">
			<h3>sq1 + sq1 = {sq11.query}</h3>
			<pre>{sq11.query}</pre>
		</SubCard>
		<SubCard title="Or+Or Test">
			<h3>sq2 + sq2 = {sq22.query}</h3>
			<pre>{sq22.query}</pre>
			{checkEq(sq22.query, "carol OR dave OR carol OR dave")}
		</SubCard>
	</Card>;
}

export default SeqrchQueryTestPage;
