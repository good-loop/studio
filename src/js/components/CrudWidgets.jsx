
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

import PropControlDataItem from '../base/components/PropControlDataItem';

const baseKeywords = "crud";

const CrudWidgets = () => {
	return (<Card body>
		<CardTitle><h3>CRUD Widgets</h3></CardTitle>
		<SelectDataItemCard />
	</Card>);
};

const SelectDataItemCard = () => {
	return (<SubCard title="CRUD select">
		<WidgetExample name="Select NGO" keywords={baseKeywords}>
			<PropControl prop='selectngo' path={['misc','crudtest']} type='DataItem' diType='NGO' status={C.KStatus.PUBLISHED} detail='lite' sort='id' />
			<pre>{JSON.stringify(DataStore.getValue('misc','crudtest','selectngo'))}</pre>
		</WidgetExample>


	</SubCard>);
};

export default CrudWidgets;
