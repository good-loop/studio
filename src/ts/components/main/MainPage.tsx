import React, { FC } from 'react';

import ShareWidgetWrapper from '../widgets/ShareWidget.w';
import WizardProgress from '../widgets/WizardProgressWidget.w';
import BasicAccountPage from '../widgets/BasicAccountPage.w';

import { ShareLink } from '../../../base/components/ShareWidget';
import DataStore from '../../../base/plumbing/DataStore';
import SearchForm from './SearchForm';


const MainPage: FC = () => {
	//TODO depending on user input we'll map widgets, propcontrol or others based on search query, returning the component wrapper
	const widgets = [
		{name: 'wizardprogress', component: <WizardProgress />},
		{name: 'basicaccountpage', component: <BasicAccountPage />}
	];

	const searchQuery = DataStore.getValue(['misc', 'searchValue']) as unknown as string || '';

	const widgetsToRender = widgets
		.filter( widget => widget.name.includes(searchQuery) )
		.map( widget => widget.component);

	return (
		<>
			<SearchForm />
			{ widgetsToRender }
		</>
	);
};

export default MainPage;
