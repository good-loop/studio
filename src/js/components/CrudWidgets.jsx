
import React, { useState } from 'react';

import { Input, FormGroup, Label, Form, Card, CardTitle } from 'reactstrap';
import {normaliseSogiveId} from '../base/plumbing/ServerIOBase';
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

import { nonce } from '../base/data/DataClass';
import KStatus from '../base/data/KStatus';
import ListLoad from '../base/components/ListLoad';

const baseKeywords = 'crud';


const CrudWidgets = () => {
	return (
		<SubCard body title="CRUD Widgets">
			<SelectDataItemCard />
			<ListLoadCard />
		</SubCard>
	);
};


DataStore.setValue(['misc','crudtest','selectngoold'], "Foo Bar");

const ListLoadCard = () => {
	return (<SubCard title="CRUD ListLoad Agency canDelete canCopy">
		<ListLoad hideTotal type="Agency" status="ALL_BAR_TRASH" 
			pageSize={5} canDelete canCopy
		/>
	</SubCard>);
};


const SelectDataItemCard = () => {
	let norm = v => {
		return normaliseSogiveId(v);
	};
	return (<SubCard title="CRUD select DataItem">
		<WidgetExample name="Select NGO selectngo" keywords={baseKeywords}>
			<PropControl modelValueFromInput={norm} prop='selectngo' path={['misc','crudtest']} type='DataItem' itemType='NGO' 
				status={C.KStatus.PUBLISHED} detail='lite' sort='id' pageSize={5} />
			<pre>{JSON.stringify(DataStore.getValue('misc','crudtest','selectngo'))}</pre>
		</WidgetExample>
		<WidgetExample name="NGO - preserve old bad format value" keywords={baseKeywords}>
			<PropControl modelValueFromInput={norm} prop='selectngoold' path={['misc','crudtest']} type='DataItem' itemType='NGO' status={C.KStatus.PUBLISHED} detail='lite' sort='id' />
			<pre>{JSON.stringify(DataStore.getValue('misc','crudtest','selectngoold'))}</pre>
		</WidgetExample>
		<WidgetExample name="Select NGO embed" keywords={baseKeywords}>
			<PropControl embed prop='selectngoEmbed' path={['misc','crudtest']} type='DataItem' itemType='NGO' status={C.KStatus.PUBLISHED} detail='lite' sort='id' />
			<pre>{JSON.stringify(DataStore.getValue('misc','crudtest','selectngoEmbed'))}</pre>
		</WidgetExample>
		<WidgetExample name="Select Test Agency canCreate" keywords={baseKeywords}>
			<PropControl canCreate prop='selectagency' path={['misc','crudtest']} type='DataItem' itemType='Agency' status={KStatus.PUB_OR_DRAFT} />
			<pre>{JSON.stringify(DataStore.getValue('misc','crudtest','selectagency'))}</pre>
		</WidgetExample>
	</SubCard>);
};


export default CrudWidgets;
