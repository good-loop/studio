import React, { FC } from 'react';
import ShareWidget from '../../../base/components/ShareWidget';

const item = {"@class":"com.goodloop.data.Advertiser","created":"2020-05-01T14:30:13Z","name":"test_fabric_unit","id":"Y3DUsLAS","status":"MODIFIED"};

const ShareWidgetWrapper: FC = () => {
	return (
		<div>
			{/* 
			//@ts-ignore */}
			<ShareWidget type="User" id="12345" />
		</div>
	);
};

export default ShareWidgetWrapper;
