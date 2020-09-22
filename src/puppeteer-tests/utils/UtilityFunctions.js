const fs = require('fs');
const JQuery = require('jquery');
const { CommonSelectors, TestAs } = require('./Selectors');

/**Login to app. Should work for both SoGive and Good-loop 
 * Make sure that you are actually on a page with a clickable login button before running this!
 * @param selectors CSS selectors for the given page
 * @param url option param. Will go to the url before attempting to log in
 * @param service how are you loggin in? Can be email, Twitter or Facebook
*/
async function login({browser, page, username, password, Selectors=CommonSelectors, service='email'}) {
	if(!username || !password) throw new Error('UtilityFunctions -- no username/password provided to login');

	await page.waitForSelector(Selectors.logIn);
	await page.click(Selectors.logIn);
	// Wait for CSS transition to complete
	// Caused puppeteer to click on wrong div sometimes
	await page.waitFor(400);

	if (service === 'email') {
		await page.click('[name=email]');
		await page.keyboard.type(username);
		await page.click(Selectors.logInPassword);
		await page.keyboard.type(password);
		await page.keyboard.press('Enter');
		
		await page.waitForSelector(Selectors.logInEmail, {hidden: true});
	}

	if (service === 'twitter') {
		await page.waitForSelector(Selectors.twitterLogin);
		await page.click(Selectors.twitterLogin);
		await page.waitForSelector(Selectors.apiUsername);
	
		await page.click(Selectors.apiUsername);
		await page.keyboard.type(username);
		await page.click(Selectors.apiPassword);
		await page.keyboard.type(password);
	
		await page.click(Selectors.apiLogin);
		// twitter, for some reason, wants you
		// to enter the exact same username & password
		// again, but on a different page
		await page.waitForNavigation({ waitUntil: 'load'});
		await page.waitFor(5000); // Give Twitter login a second to process
		// await page.click(TwitterSelectors.username);
		// await page.keyboard.type(twitterUsername);
		// await page.click(TwitterSelectors.password);
		// await page.keyboard.type(twitterPassword);
		// await page.click(TwitterSelectors.login);
	}

	if (service === 'facebook') {

		if (!browser) throw new Error('login function needs to be passed a browser object when logging in via Facebook');

		// return promise and await below
		// workaround for issue where Jest would reach end of test
		// and deem it a success without waiting for the browser.on
		// callback to finish executing
		let fbResolve;
		let fbLoginFinished = new Promise(function(resolve, reject) { fbResolve = resolve; });
		fbLoginFinished.resolve = fbResolve;

		browser.on('targetcreated', async(target) => {
			if(target._targetInfo.type !== 'page') return;
			const fbPage = await target.page();

			await fbPage.waitForSelector(Selectors.username);
			await fbPage.click(Selectors.username);
			await fbPage.keyboard.type(username);

			await fbPage.click(Selectors.password);
			await fbPage.keyboard.type(password);
			await fbPage.click(Selectors.login);

			// only seems to appear once...
			// await fbPage.waitForSelector(FacebookSelectors.continue);
			// await fbPage.click(FacebookSelectors.continue);

			fbLoginFinished.resolve();
		});

		// trigger above code to handle
		// facebook login page
		// second click to handle popup being blocked
		await page.click(Selectors.facebookLogin);
		await page.click(Selectors.facebookLogin);

		// check that user is logged in, fail test if not
		await fbLoginFinished;
	}
}

/**
 * Takes an object in form {CSS_SELECTOR: value},
 * and fills in form accordingly
 */
async function fillInForm({page, Selectors, data}) {
	const keys = Object.keys(data);
	for(let i=0; i<keys.length; i++) {
		const key = keys[i];
		const selector = Selectors[key];

		//Clicks checkbox if value doesn't match boolean provided
		if( await page.$eval(selector, e => e.type) === 'checkbox' ) {
			//Would be nicer to have this as one if statement, but there is a bit of faff around passing arguments into page.$eval()
			const checkValue = await page.$eval(selector, e => e.checked);
			if( checkValue != data[key] ) await page.click(selector);
		}
		// Select drop-down menu option
		else if( await page.$eval(selector, e => e.tagName) === 'SELECT' ) {
			await page.select(selector, data[key]);
		} else {
			await page.click(selector);
			//Check for default value. Clear field if found
			if(await page.$eval(selector, e => e.value)) {
				await page.keyboard.down('Control');
				await page.keyboard.press('a');
				await page.keyboard.up('Control');
				await page.keyboard.press('Backspace');
			} 
			await page.keyboard.type(`${data[key]}`);
		}
	}
}

/**
 * Get the value attribute of an element
 * @param { string } selector the element to get the value from
 */
async function getValue (selector) {
	await page.waitForSelector(selector);
	const iv = await page.$eval(selector, e => e.value);
	return iv;
}

/**
 * Get attribute of an element
 * @param { string } selector the element to get the attribute from
 * @param { string } attribute the attribute to get
 */
async function getAttr (selector, attribute) {
	await page.waitForSelector(selector);
	const iv = await page.evaluate((sel, attr) => {
		return document.querySelector(sel).getAttribute(attr);
	}, selector, attribute);
	return iv;
}

/**
 * Get innerHTML of an element
 * @param { string } selector the element to get the innerHTML from
 */
async function getInnerHTML (selector) {
	await page.waitForSelector(selector);
	const iv = await page.$eval(selector, e => e.innerHTML);
	return iv;
}

// Is used in cases were there is no unique selector other than the inner HTML
// e.g. lists - so it will check all matching elements
/**
 * Expects to find a matching selector with the given HTML content
 * @param { string } selector the selector to monitor
 * @param { string } innerHTML the HTML content to wait on
 */
async function expectInnerHTML (selector, innerHTML) {
	await page.waitForSelector(selector);
	const iv = await page.evaluate( 
		(sel, html) => {
			// This code runs on the browser so use legacy syntax for support
			var foundMatch = false;
			var foundHTML = "";
			var nodes = document.querySelectorAll(sel);
			for (var i = 0; i < nodes.length; i++) {
				var obj = nodes[i];
				foundHTML = obj.innerHTML;
				if (obj.innerHTML === html) {
					foundMatch = true;
					break;
				}
			}
			return {match:foundMatch, lastHTML:foundHTML};
		} , selector, innerHTML);
	if (!iv.match) {
		console.log("Expect innerHTML FAIL\nExpected: " + innerHTML + "\nReceived: " + iv.lastHTML);
	}
	await expect(iv.match).toBeTruthy();
}

/**
 * Type a string into an input
 * @param { string } sel the selector to type to
 * @param { string } text what to type
 */
const enterVal = async (sel, text) => {
	let str = text.toString();
	await page.click(sel, { clickCount: 3 });
	await page.type(sel, str);
	await expect(await getValue(sel)).toBe(str);
};

/**
 * Retrieve a value from the DataStore
 * @param { Array } valPath the DataStore path of the value
 */
const getDataStoreVal = async (valPath) => {
	return page.evaluate( 
		(path) => window.DataStore.getValue(path),
		valPath
	);
};

const expectMoneyVal = async (dataStorePath, moneyVal) => {
	let money = await getDataStoreVal(dataStorePath);
	await expect(money['@type']).toBe('Money');
	await expect(money.currency).toEqual('GBP');
	await expect(money.value).toEqual(moneyVal);
	await expect(money.value100p).toBe(moneyVal * 10000);
};

const elementExists = async (selector) => {
	const eArray = await page.$$(selector);
	return eArray.length > 0;
};

const countElement = async (selector) => {
	const eArray = await page.$$(selector);
	return eArray.length;
};

const eventIdFromName = ({name}) => idByName({name, type: 'event'});

const fundIdByName = ({name}) => idByName({name, type: 'fundraiser'});

const vertiserIdByName = ({name, apiBase}) => idByName({name, type: 'vertiser', apiBase});

const vertIdByName= ({name}) => idByName({name, type: 'vert'});

module.exports = {
	login,
	vertiserIdByName,
	fillInForm,
	getValue,
	getDataStoreVal,
	enterVal,
	getAttr,
	getInnerHTML,
	expectInnerHTML,
	expectMoneyVal,
	elementExists,
	countElement
};
