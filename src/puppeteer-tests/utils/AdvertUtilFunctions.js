const fs = require('fs');
const JQuery = require('jquery');
const { CommonSelectors, TestAs } = require('./Selectors');

/**
 * Retrieves ID of Thing with given name & type
 * by querying JSON endpoint
 * @param type eg 'vert', 'vertiser', 'event', 'fundraiser'
 */
function idByName({name, type, apiBase}) {
	const $ = JQuery;
	// Make sure that we're comparing strings
	name = name + '';
// 	return $.ajax({
// 		url: `${apiBase}${type}/_list.json`,
// 		withCredentials: true,
// 		jwt: 'eyJraWQiOiJ1b2J4b3UxNjJjZWVkZTJlMSIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJzb2dpdmUiLCJqdGkiOiJTX0o1UE5rNHpGT0YtVGlrSVdJcDJBIiwiaWF0IjoxNTI3MjQ5NzkwLCJkdmNzaWciOm51bGwsInN1YiI6Im1hcmtAd2ludGVyd2VsbC5jb21AZW1haWwifQ.kmdCG5Xh2YypPLmtD_FP4Gc27cbpOd2Dx1LCOlBJNWqphBN-WQa7I6v-LmhwTbdheb8t7xE10xXtrsp9mObQ8QKsGU6Emdnyp9-eKrUTQFMf5HqwD-qpsiYEjw9SWTSaQkTOP4ieCbE61QL2-_3TN8hq4AAxYmjgJG0IUKUkN5jtozXCFYddqmpEXR4teRr7P470RDEAOqleddIJqd0KCId2ohGCe5CqMDFfcCLoaW-ICghQUAx9wlUDCmEN0I9BxErDp9WJ7spqji0MeanEurLlbAU47q5SyVQS70zAUJS3OhqFK_LHmFVETEQhb5nMpik3hSZJpS5x_YT56causg',
// 	}).then(res => {
// 		const hit = res.cargo.hits.filter(thing => thing.name === name);
// 		if (hit && hit[0] && hit[0].id) return hit[0].id;
// 		return '';
// 	});
	return axios.get(`${apiBase}${type}/advert/_list.json`, {
		withCredentials: true,
		headers: {
			Authorization: "Bearer " + 'eyJraWQiOiJ1b2J4b3UxNjJjZWVkZTJlMSIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJzb2dpdmUiLCJqdGkiOiJTX0o1UE5rNHpGT0YtVGlrSVdJcDJBIiwiaWF0IjoxNTI3MjQ5NzkwLCJkdmNzaWciOm51bGwsInN1YiI6Im1hcmtAd2ludGVyd2VsbC5jb21AZW1haWwifQ.kmdCG5Xh2YypPLmtD_FP4Gc27cbpOd2Dx1LCOlBJNWqphBN-WQa7I6v-LmhwTbdheb8t7xE10xXtrsp9mObQ8QKsGU6Emdnyp9-eKrUTQFMf5HqwD-qpsiYEjw9SWTSaQkTOP4ieCbE61QL2-_3TN8hq4AAxYmjgJG0IUKUkN5jtozXCFYddqmpEXR4teRr7P470RDEAOqleddIJqd0KCId2ohGCe5CqMDFfcCLoaW-ICghQUAx9wlUDCmEN0I9BxErDp9WJ7spqji0MeanEurLlbAU47q5SyVQS70zAUJS3OhqFK_LHmFVETEQhb5nMpik3hSZJpS5x_YT56causg'
		}
	}).then(res => {
		const hit = res.cargo.hits.filter(thing => thing.name === name);
		if (hit && hit[0] && hit[0].id) return hit[0].id;
		return '';
	});
}

// Goes to the given URL (which must contain a Good-loop ad), watches the video, and makes a donation 
/**
 * Advert must already be somewhere on the page before this method is called
 * @param { object } page puppeteer test object
 * @param { string } type(optional) behaviour needs to be slightly different for type:banner ads
 */
async function watchAdvertAndDonate({page, type}) {
	await page.waitFor(1000);//Allow 'visible' event to register. Doesn't get counted if you start working right away
	let pageOrIFrame = page; // If unit is wrapped in iframe, need to use iframe.ACTION instead of page.ACTION

	// Adunit may have been loaded in to an iframe.
	// Puppeteer will not cycle through frames to look for a given selector, so need to tell it where to look
	// TODO cut down on possible values after this has been harmonised across the different pages/services
	const iframe = await page.frames().find(f => f.name().slice(0, 2) === 'gl' || f.name() === 'test01' || f.name() === 'demo-iframe');
	
	if ( iframe ) {
		pageOrIFrame = iframe;
	}

	// Banner-types
	// Ad on Vpaid page should just autoplay
	if( type === 'banner' ) {
		await pageOrIFrame.waitForSelector(TestAs.Banner);
		await pageOrIFrame.click(TestAs.Banner);            
	}
	try{
		// Click-to-play video
		await pageOrIFrame.waitForSelector(TestAs.ClickToPlay, { timeout: 3000 });
		await pageOrIFrame.click(TestAs.ClickToPlay);
	} catch (e) { 
		console.log("Non click-to-play video. Continuing...");
	}
	// Pick a charity
	await pageOrIFrame.waitForSelector('.chooser-list.ready');
	await pageOrIFrame.click('a.charity');

	await page.waitFor(5000);//Generally needs a second to register that donation has been made
}

module.exports = { watchAdvertAndDonate };
