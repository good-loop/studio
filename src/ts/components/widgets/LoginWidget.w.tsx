import React, { FC } from 'react';

import LoginWidget, { getShowLogin, setShowLogin } from '../../../base/components/LoginWidget';

const SocialLinksWidgetWrapper: FC = () => {

	return (
		<div>
			<button type="button" onClick={ (): void => setShowLogin(true) }>Show Login widget!</button>
			{/* 
			//@ts-ignore */}
			{/* <LoginWidget /> */}
		</div>
	);
};

export default SocialLinksWidgetWrapper;
