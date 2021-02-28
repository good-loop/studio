const $ = require('jquery');
const {
	login,
	getValue,
	getDataStoreVal,
	enterVal,
	expectInnerHTML,
	expectMoneyVal,
	getInnerHTML,
	getAttr,
	elementExists,
	countElement
} = require('../utils/UtilityFunctions');
const { filterProps } = require('../utils/StudioUtilityFunctions');
const {password, username} = require('../utils/Credentials');
const {CommonSelectors} = require('../utils/Selectors');

const config = JSON.parse(process.env.__CONFIGURATION);
const { targetServer } = require('../utils/TestConfig');
const TestConfig = require('../utils/TestConfig');

//    o<| : o ) --|--<
const APIBASE = targetServer[config.site];

describe('PersonTest tests', () => {
	const testBaseUrl = APIBASE +"/#person";
	// setup console logging
	page.on("console", e => {
		console.log("page.console.1", e.text());
	});
	const loadPage = async () => {
		console.log("goto "+testBaseUrl); // goto http://localstudio.good-loop.com/#person
		await page.goto(testBaseUrl);
		await expect(page.title()).resolves.toMatch('Good-Loop Design Studio');
	};

	// THIS TEST MUST BE FIRST SO THE PAGE IS LOADED
	// Loading the page every test causes timeouts
	test('Can open PropControlTest and login', async () => {
		await loadPage();
	}, 60000);


	test('TODO Person edit then load result: merge', async () => {		
		// See https://stackoverflow.com/questions/52045947/nodejs-puppeteer-how-to-use-page-evaluate		
		let persons = await page.evaluate(() => {
			return getProfilesNow();
		});
		console.log("getProfilesNow -> ",persons);
	});

});
