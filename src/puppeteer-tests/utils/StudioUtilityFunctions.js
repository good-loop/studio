const { CommonSelectors } = require('./Selectors');

// Filters through prop controls on the Studio page
/**
 * Studio page must be loaded before this is called
 * @param { string } filter what to search for
 * @param { string } name specify a custom name to confirm the search with - overrides filter
 * @param { string } confirmSelector specify a custom selector to confirm the search with - overrides name and filter
 * @param { object } Selectors reserve of common GL selectors to use
 */
async function filterProps ({filter, name, confirmSelector, Selectors=CommonSelectors}) {
	if (!name) {
		name = filter.replace(/[^a-zA-Z0-9-_]/g, "").toLowerCase();
	}
	// wait for filter then type string with delay per key
    await page.waitForSelector(Selectors.Filter);
    // Close remenant errors if in the way
    if (await page.$('.MessageBar .alert-danger') !== null) {
        await page.click('.MessageBar .alert-danger button.close');
    }
	// 3 clicks selects all text - aka clear last input
	await page.click(Selectors.Filter, {clickCount: 3});
	await page.keyboard.press("Backspace");
	await page.type(Selectors.Filter, filter, {delay: 5});
	// Case insensitive query
	if (confirmSelector) {
		await page.waitForSelector(confirmSelector);
	} else {
		await page.waitForSelector('[name~=' + name + ' i]');
	}
}

module.exports = { filterProps };
