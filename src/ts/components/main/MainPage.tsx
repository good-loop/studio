import React, { FC } from 'react';

import MainNavbar from './MainNavbar';
import FilterControl from './FilterControl';
import SocialLinksWidgetWrapper from '../widgets/LoginWidget.w';
import ShareWidgetWrapper from '../widgets/ShareWidget.w';
import LoginWidget from '../../base/components/LoginWidget';


const MainPage: FC = () => {
	return (
		<>
			<MainNavbar />
			<FilterControl />
			<SocialLinksWidgetWrapper />
			<ShareWidgetWrapper />
			<LoginWidget />
		</>
	);
};

export default MainPage;
