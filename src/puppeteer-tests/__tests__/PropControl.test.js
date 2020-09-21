const $ = require('jquery');
const {login, filterProps, getValue, getDataStoreVal, enterVal} = require('../utils/UtilityFunctions');
const {password, username} = require('../utils/Credentials');
const {CommonSelectors} = require('../utils/Selectors');

const config = JSON.parse(process.env.__CONFIGURATION);
const { targetServer } = require('../utils/TestConfig');
const UtilityFunctions = require('../utils/UtilityFunctions');

//    o<| : o ) --|--<
const APIBASE = targetServer[config.site];

describe('PropControlTest tests', () => {

	const loadPage = async () => {
		await page.goto(APIBASE);
		await expect(page.title()).resolves.toMatch('Good-Loop Design Studio');
	};

	// THIS TEST MUST BE FIRST SO THE PAGE IS LOADED
	// Loading the page every test causes timeouts
	test('Can open PropControlTest and login', async () => {
		await loadPage();
		await login({ page, username, password, service: 'email' });
		await page.reload(); // Reload to see content
	}, 99999);

	test("Basic text input displays/stores correctly", async () => {
		await filterProps({filter:'basic text input'});
		
		// type in text
		await enterVal("[name=mybasictext]", "Hello World");
		// check datastore updated 
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','mybasictext'])).toBe("Hello World");				
	});

	test("Text area input displays/stores correctly", async () => {
		await filterProps({filter:'text area input'});
		
		// type in text
		await enterVal("[name=mytextarea]", "Hello World");
		// check datastore updated 
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','mytextarea'])).toBe("Hello World");				
	});

	test('Can filter props through text input', async () => {
		await filterProps({filter:"money", name:"mymoney"});
		await expect(await getValue(CommonSelectors.Filter)).toBe("money");
		const cardArray = await page.$$('.Money.form-group');

		// If we filter by 'money' we should be able to see 3 different PropControl cards.
		await expect(cardArray.length).toBe(3);
	}, 99999);

	test('Simple text field communicates correctly with DataStore', async () => {
		// TODO: Replace with BasicTextPropControl
		// This tests the updating state of the search box through the page location -
		// Not a direct test of state, but I haven't been introduced to DataStore yet
		// and this works for now. - Ben 17/09/2020
		await filterProps({filter:"money", name:"mymoney"});
		let dataStoreVal = await getDataStoreVal(["location", "params", "f"]);
		await expect(dataStoreVal).toBe('money');
	}, 99999);

	// We use HTML5 number inputs - thus there is no need for a custom test anymore
	/*
	test('Number prop only accepts, well... ints', async () => {
		await loadPage();

		// Testing valid input first
		await page.waitForSelector('.form-control[name=prop]');
		await page.type('[name=prop]', '21', {delay: 10});

		await page.waitForSelector('.card-item');

		//await expect(dataStore.prop).toBe(21);

		// Invalid Input
		// Triple click on input box to select content and then overwrite it, simulating proper user interaction
		const propField = await page.$('[name=prop]');
		await propField.click({ clickCount: 3 });
		await page.type('[name=prop]', 'string', {delay: 10});

		// Since we wrote an invalid value the Store stores an empty string instead of the previous int
		//await expect(dataStore.prop).toBe('');
	}, 99999);*/

	test('yesNo radial displays properly and registers right interaction', async () => {
		await filterProps({filter:"yesNo", name:"yehnay"});
		// When clicking an option, it should be registered in DataStore. If you click the other, it gets overwritten.
		await page.click('[name=yehnay][value=yes]');
		await expect(await getDataStoreVal(["widget", "BasicTextPropControl", "yehnay"])).toBe(true);

		await page.click('[name=yehnay][value=no]');
		await expect(await getDataStoreVal(["widget", "BasicTextPropControl", "yehnay"])).toBe(false);
	}, 99999);

	test('Img URL prop works properly', async () => {
		const secureUrl = 'https://cdn2.iconfinder.com/data/icons/drugs-15/48/37-128.png';
		const insecureUrl = 'http://cdn2.iconfinder.com/data/icons/drugs-15/48/37-128.png';
		const invalidUrl = 'thisIsGibberish...';

		await filterProps({filter:"image url", name:"myimg"});

		// Test using a secure url
		await enterVal("[name=myimg]", secureUrl);
		let thumbnail = await page.$eval('img.img-thumbnail[src]', img => img.getAttribute('src'));
		await expect(thumbnail).toBe(secureUrl);

		// Test using insecure url
		await enterVal("[name=myimg]", insecureUrl);
		thumbnail = await page.$eval('img.img-thumbnail[src]', img => img.getAttribute('src'));
		await expect(thumbnail).toBe(insecureUrl);

		// Test using invalid url
		await enterVal("[name=myimg]", invalidUrl);
		thumbnail = await page.$eval('img.img-thumbnail[src]', img => img.getAttribute('src'));
		await expect(thumbnail).toBe(invalidUrl);
	});

	test('Img upload prop works properly', async () => {
		const secureUrl = 'https://cdn2.iconfinder.com/data/icons/drugs-15/48/37-128.png';
		const insecureUrl = 'http://cdn2.iconfinder.com/data/icons/drugs-15/48/37-128.png';
		const invalidUrl = 'thisIsGibberish...';

		await filterProps({filter:"image upload", name:"myimgUpload"});

		// Test using a secure url
		await enterVal("[name=myimgupload]", secureUrl);
		let thumbnail = await page.$eval('img.img-thumbnail[src]', img => img.getAttribute('src'));
		await expect(thumbnail).toBe(secureUrl);

		// Test using insecure url
		await enterVal("[name=myimgupload]", insecureUrl);
		thumbnail = await page.$eval('img.img-thumbnail[src]', img => img.getAttribute('src'));
		await expect(thumbnail).toBe(insecureUrl);

		// Test using invalid url
		await enterVal("[name=myimgupload]", invalidUrl);
		thumbnail = await page.$eval('img.img-thumbnail[src]', img => img.getAttribute('src'));
		await expect(thumbnail).toBe(invalidUrl);
	});

	test('Url prop offers open link/warns about secure link', async () => {
		const secureUrl = 'https://blah.fakedomain/';
		const insecureUrl = 'http://blah.fakedomain/';

		await filterProps({filter:"url input", name:"myurl"});

		await enterVal("[name=myurl]", secureUrl);
		const link = await page.$eval('.url a', e => e.href);

		await expect(link).toBe(secureUrl);

		await enterVal("[name=myurl]", insecureUrl);
		const warning = await page.$eval('.url .help-block.text-warning', e => e.innerHTML);
		// Use generalised version of warning message
		await expect(warning.includes('https')).toBe(true);
	});

	test('Date prop should process input correctly', async () => {
		const validDate = '2354-04-22';
		const invalidDate = 'totalgibberish';
		let output;

		await filterProps({filter:"date", name:"mydate"});

		await enterVal("[name=mydate]", validDate);
		output = await page.$eval('.date .pull-right i', e => e.innerHTML);
		await expect(output).toBe('22 Apr 2354');

		await enterVal("[name=mydate]", invalidDate);
		output = await page.$eval('.date .pull-right i', e => e.innerHTML);
		await expect(output).toBe('Invalid Date');

		const helpMessage = await page.$eval('.date .help-block.text-danger', e => e.innerHTML);
		await expect(helpMessage.includes('yyy-mm-dd')).toBe(true);
	});

	test('Select normal displays/stores correctly', async () => {

		await filterProps({filter:"selection control", name:"myselect"});

		await page.select('[name=myselect]', 'fi');
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','myselect'])).toBe('fi');

		await page.select('[name=myselect]', 'fo');
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','myselect'])).toBe('fo');
	});

	test('Select default unset displays/stores correctly', async () => {

		await filterProps({filter:"selection default and unset", name:"myselect_default_unset"});
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','myselect_default_unset'])).toBe('fi');

		await page.select('[name=myselect_default_unset]', 'fo');
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','myselect_default_unset'])).toBe('fo');

		await page.select('[name=myselect_default_unset]', 'fee');
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','myselect_default_unset'])).toBe('fee');
	});

	test('Multiselect displays/stores correctly', async () => {

		await filterProps({filter:"multiselect", name:"multiselectcontrol"});

		await page.click('[name=multiselectcontrol] input[value=fee]');
		await page.click('[name=multiselectcontrol] input[value=fo]');
		await page.click('[name=multiselectcontrol] input[value=fum]');
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','mymultselect'])).toEqual(['fee', 'fo', 'fum']);
	});

	// TODO: Replace hardcoded values and update PropControlTest in order to better test different choices.
	test('Radio (passing function for labels) displays/stores correctly', async () => {

		await filterProps({filter:"radio", name:"myradio"});

		await page.click('[name=myradio][value=Apples]');
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','myradio'])).toBe("Apples");

		await page.click('[name=myradio][value=Pears]');
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','myradio'])).toBe("Pears");
	});

	test('Checkbox performs as expected', async () => {
		await filterProps({filter:"checkboxes"});
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','mycheckbox'])).toBe(null);

		await page.click('[name=mycheckbox][value=Cheque]');
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','mycheckbox'])).toBe("Cheque");

		await page.click('[name=mycheckbox][value=Cash]');
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','mycheckbox'])).toBe("Cash");
	});

	test('Arraytext performs as expected', async() => {
		const testString = 'This is a string with spaces';
		const stringArr = testString.split(' ');
		
		await filterProps({filter:"array text input"});

		await enterVal("[name=myarraytext]", testString);

		// If we compare content the arrs should be equal. Notice that other comparisons will result in a failure.
		await expect(await getDataStoreVal(["widget", "BasicTextPropControl", "myarraytext"])).toEqual(stringArr);
	});

	test('Entryset performs as expected', async () => {
		const key = 'key1';
		const value = 'value1';
		let keyValObj = {};
		keyValObj[key] = value;

		await filterProps({filter:"entry set input"});
		
		await enterVal('[name=entrysetinput] [placeholder=key]', key);
		await enterVal('[name=entrysetinput] [placeholder=value]', value);
		await page.click('[name=entrysetinput] button.btn-primary');

		await page.waitForSelector(`input[name=${key}][value=${value}]`); // If this tag gets generated, prop is storing and displaying sets as intended.
		await expect(await getDataStoreVal(["widget", "BasicTextPropControl", "myentryset"])).toEqual(keyValObj);
		
		// Make sure user can remove sets by clicking on the delete button.
		// If the .entried div is empty, then we have succeeded.
		await page.click('button.remove-entry');
		
		keyValObj[key] = false;
		const entriesArr = Array.from(await page.$$('[name=entrysetinput] .entry'));
		await expect(entriesArr.length).toBeFalsy();
		await expect(await getDataStoreVal(["widget", "BasicTextPropControl", "myentryset"])).toEqual(keyValObj);
	});

	test('Money saves data correctly based on input', async () => {
		const input = '23.41';

		await filterProps({filter: "moneycontrol"});

		await enterVal('[name=mymoney]', input);
		let money = await getDataStoreVal(["widget", "BasicMoneyPropControl", "mymoney"]);

		await expect(money['@type']).toBe('Money');
		await expect(money.currency).toEqual('GBP');
		await expect(money.value).toEqual(23.41);
		await expect(money.value100p).toBe(234100);
	});
});
