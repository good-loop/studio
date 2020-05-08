import React, { FC } from 'react';

import MainNavbar from './MainNavbar';
import FilterControl from './FilterControl';
import SocialLinksWidgetWrapper from '../widgets/SocialLinksWidgetWrapper';

const MainPage: FC = () => {
	return (
		<>
			<MainNavbar />
			<FilterControl />
			<SocialLinksWidgetWrapper />
		</>
	);
};

export default MainPage;
