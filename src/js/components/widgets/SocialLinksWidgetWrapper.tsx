import React, { FC } from 'react';

import { SocialMediaFooterWidget, SocialMediaShareWidget } from '../SocialLinksWidget';

const SocialLinksWidgetWrapper: FC = () => {
	return (
		<div>
			{/* 
			//@ts-ignore */}
			<SocialMediaFooterWidget 
				type="goodloop"
				fb_url="https://www.facebook.com/the.good.loop/"
				tw_url="https://twitter.com/goodloophq"
				insta_url="https://www.instagram.com/goodloophq/"
			/>
		</div>
	);
};

export default SocialLinksWidgetWrapper;
