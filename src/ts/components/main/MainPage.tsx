import React, { FC } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import ShareWidgetWrapper from '../widgets/ShareWidget.w';
import WizardProgress from '../widgets/WizardProgressWidget.w';
import BasicAccountPage from '../widgets/BasicAccountPage.w';

const SearchForm = () => {
	return (
		<Form>
			<FormGroup>
				<Label>Search component:</Label>
				<Input type="text" name="search" placeholder="Type the component's name here..." />
			</FormGroup>
		</Form>
	);
};

const MainPage: FC = () => {

	//TODO depending on user input we'll map widgets, propcontrol or others based on search query, returning the component wrapper
	const widgets = [
		{name: 'wizardprogress', component: <WizardProgress />}
	];

	return (
		<>
			<SearchForm />
			<WizardProgress />
			<BasicAccountPage />
		</>
	);
};

export default MainPage;
