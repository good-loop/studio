/**
 * A convenient place for ad-hoc widget tests.
 * This is not a replacement for proper unit testing - but it is a lot better than debugging via repeated top-level testing.
 */
import React, {useState} from 'react';
import PropControl from '../base/components/PropControl';
import BG from '../base/components/BG';
import { Card } from 'reactstrap';
import { getUrlVars } from '../base/utils/miscutils';

const BGPage = () => {
	let image = {url:"https://source.unsplash.com/POKM7TN9_48/640x427", author:"Michael Glass",citation:"https://unsplash.com/@the_odyssey_image"};
	let {opacity=0.75, size='cover', height='auto', minHeight, fullscreen} = getUrlVars();
	return (
		<div cassName="BGPage">
			<p>Here is some content before the widget.</p>
			<BG image={image} {... {opacity, size, height, minHeight, fullscreen}} >
				<p>This page is to test out the background image widget - a widget which is surprisingly hard to make robust.</p>
				<Card body className='w-50'>
					<PropControl type='radio' prop='size' options={['cover','contain','fit']} label='Size (of image)' />

					<PropControl prop='height' label='content height' />

					<PropControl type='checkbox' prop='fullscreen' label='Fullscreen background' />
				</Card>
				<p>Some text at the bottom too.</p>
				<hr/>
			</BG>
			<Card body className='w-50'>
				Here is some content outside the BG widget.
			</Card>
		</div>
	);
};

export default BGPage;
