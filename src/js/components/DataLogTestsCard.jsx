
import React, { useState } from 'react';

import { Input, FormGroup, Label, Form, Card, CardTitle } from 'reactstrap';

import PropControl, { FormControl } from '../base/components/PropControl';
import DataStore, { getValue } from '../base/plumbing/DataStore';
import Wizard, { WizardStage } from '../base/components/WizardProgressWidget';
import WidgetExample from './WidgetExample';
import SearchQuery from '../base/searchquery';
import { substr } from '../base/utils/miscutils';
import { assMatch } from '../base/utils/assert';
import SubCard from './SubCard';
import MDText from '../base/components/MDText';
import Counter from '../base/components/Counter';
import Money from '../base/data/Money';
import SimpleTable from '../base/components/SimpleTable';
import Tree from '../base/data/Tree';
import C from '../base/CBase';
import pivot from 'data-pivot';

import { getDataLogData, pivotDataLogData } from '../base/plumbing/DataLog';

const baseKeywords = "datalog lg";

const DataLogTestsCard = () => {
	
	let data0 = {
		by_day: {buckets: [{key:'monday', count:7}, {key:'tuesday', count:5}]}
	};
	let kvFormat = pivotDataLogData(data0,["day"]);

	let pvData = getDataLogData({breakdowns:["pub/evt"], name:'1-month-data',dataspace:'gl'});
	let kkvFormat = pvData.value && pivotDataLogData(pvData.value, ["pub","evt"]);

	return <SubCard title="DataLog Tests">
		<WidgetExample name="Pivot" keywords={baseKeywords}>
			<pre>{JSON.stringify(kvFormat)}</pre>
			Should be: monday:7,tuesday:5
		</WidgetExample>
		<WidgetExample name="Load and Pivot" keywords={baseKeywords}>
			<pre>{JSON.stringify(kkvFormat)}</pre>
		</WidgetExample>
	</SubCard>;
};


export default DataLogTestsCard;
