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

describe('PropControlTest tests', () => {

	const loadPage = async () => {
		await page.goto(APIBASE);
		await expect(page.title()).resolves.toMatch('Good-Loop Design Studio');
	};

	// This failing test is for testing CI
	// it('should Fail', async () => {
	// 	await page.goto(baseSite);
	// 	await expect(page).toMatch(XXXIMPOSSIBLEWILLFAIL');
	// });

	// THIS TEST MUST BE FIRST SO THE PAGE IS LOADED
	// Loading the page every test causes timeouts
	test('Can open PropControlTest and login', async () => {
		await loadPage();
		//await login({ page, username, password, service: 'email' });
		//await page.reload(); // Reload to see content
	});

	test('Can filter props through text input', async () => {
		await filterProps({filter:"money", name:"mymoney"});
		await expect(await getValue(CommonSelectors.Filter)).toBe("money");
		await expect(await countElement(".Money.form-group")).toBe(6);
	});

	test("Basic text input displays/stores correctly", async () => {
		await filterProps({filter:'text', name:"mybasictext"});
		
		// type in text
		/*await enterVal("[name=mybasictext]", "Hello World");
		// check datastore updated 
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','mybasictext'])).toBe("Hello World");*/
	});

	test("Text area input displays/stores correctly", async () => {
		await filterProps({filter:'textarea input'});
		
		// type in text
		await enterVal("[name=mytextarea]", "Hello World");
		// check datastore updated 
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','mytextarea'])).toBe("Hello World");
	});

	// TODO: Add in auto-correcting test when functionality is working again
	test("Autocomplete displays/stores correctly", async () => {
		// Expected options for autocomplete, copied from PropControlWidgets.jsx
		const autocompleteOptions = ['Able', 'Alpha', 'Baker', 'Bravo', 'Charlie', 'Delta', 'Dog', 'Easy', 'Echo',
			'Fox', 'Foxtrot', 'George', 'Golf', 'Hotel', 'How', 'India', 'Item', 'Jig', 'Juliet', 'Kilo', 'King',
			'Lima', 'Love', 'Mike', 'Nan', 'November', 'Oboe', 'Oscar', 'Papa', 'Peter', 'Quebec', 'Queen', 'Roger',
			'Romeo', 'Sierra', 'Sugar', 'Tango', 'Tare', 'Uncle', 'Uniform', 'Victor', 'Whiskey', 'William', 'X-ray',
			'Yankee', 'Yoke', 'Zebra', 'Zulu'];
		
		await filterProps({filter: "autocomplete simple"});
		
		// Check options show up on initial click
		await page.click('.autocomplete input.form-control');
		await expect(await countElement('.autocomplete .dropdown-item')).toBe(autocompleteOptions.length);

		let htmlTests = [];
		for (let i = 0; i < autocompleteOptions.length; i++) {
			htmlTests.push(expectInnerHTML(".autocomplete .dropdown-item", autocompleteOptions[i]));
		}
		await Promise.all(htmlTests);
		
		// Check autocomplete filter works
		const expectedEValues = ['Easy', 'Echo'];
		// type in text
		await enterVal('.autocomplete input.form-control', "E");
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','myautocomp'])).toBe("E");
		await expect(await countElement('.autocomplete .dropdown-item')).toBe(expectedEValues.length);

		htmlTests = [];
		for (let i = 0; i < expectedEValues.length; i++) {
			htmlTests.push(expectInnerHTML(".autocomplete .dropdown-item", expectedEValues[i]));
		}
		await Promise.all(htmlTests);

		// Click first autcomplete option: 'Easy'
		await page.click('.autocomplete .dropdown-item');
		await expect(await getValue('.autocomplete input.form-control')).toBe(expectedEValues[0]);
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','myautocomp'])).toBe(expectedEValues[0]);
		await expect(await elementExists(".autocomplete .dropdown-item")).toBeFalsy();
	});

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
	});*/

	test('yesNo radial displays properly and registers right interaction', async () => {
		await filterProps({filter:"yesNo", name:"yehnay"});
		// When clicking an option, it should be registered in DataStore. If you click the other, it gets overwritten.
		//await page.click('[name=yehnay][value=yes]');
		//await expect(await getDataStoreVal(["widget", "BasicTextPropControl", "yehnay"])).toBe(true);

		//await page.click('[name=yehnay][value=no]');
		//await expect(await getDataStoreVal(["widget", "BasicTextPropControl", "yehnay"])).toBe(false);
	});

	test('Img URL prop works properly', async () => {
		const secureUrl = 'https://cdn2.iconfinder.com/data/icons/drugs-15/48/37-128.png';
		const insecureUrl = 'http://cdn2.iconfinder.com/data/icons/drugs-15/48/37-128.png';
		const invalidUrl = 'thisIsGibberish...';

		await filterProps({filter:"image url", name:"myimg"});

		// Test using a secure url
		await enterVal("[name=myimg]", secureUrl);
		let thumbnail = await getAttr('img.img-thumbnail[src]', 'src');
		await expect(thumbnail).toBe(secureUrl);

		// Test using insecure url
		await enterVal("[name=myimg]", insecureUrl);
		thumbnail = await getAttr('img.img-thumbnail[src]', 'src');
		await expect(thumbnail).toBe(insecureUrl);

		// Test using invalid url
		await enterVal("[name=myimg]", invalidUrl);
		thumbnail = await getAttr('img.img-thumbnail[src]', 'src');
		await expect(thumbnail).toBe(invalidUrl);
	});

	test('Img upload prop works properly', async () => {
		const secureUrl = 'https://cdn2.iconfinder.com/data/icons/drugs-15/48/37-128.png';
		const insecureUrl = 'http://cdn2.iconfinder.com/data/icons/drugs-15/48/37-128.png';
		const invalidUrl = 'thisIsGibberish...';

		await filterProps({filter:"image upload", name:"myimgUpload"});

		// Test using a secure url
		await enterVal("[name=myimgupload]", secureUrl);
		let thumbnail = await getAttr('img.img-thumbnail[src]', 'src');
		await expect(thumbnail).toBe(secureUrl);

		// Test using insecure url
		await enterVal("[name=myimgupload]", insecureUrl);
		thumbnail = await getAttr('img.img-thumbnail[src]', 'src');
		await expect(thumbnail).toBe(insecureUrl);

		// Test using invalid url
		await enterVal("[name=myimgupload]", invalidUrl);
		thumbnail = await getAttr('img.img-thumbnail[src]', 'src');
		await expect(thumbnail).toBe(invalidUrl);
	});

	test('Url prop offers open link/warns about secure link', async () => {
		const secureUrl = 'https://blah.fakedomain/';
		const insecureUrl = 'http://blah.fakedomain/';

		await filterProps({filter:"url input", name:"myurl"});

		await enterVal("[name=myurl]", secureUrl);
		const link = await getAttr('.url a', 'href');

		await expect(link).toBe(secureUrl);

		await enterVal("[name=myurl]", insecureUrl);
		const warning = await getInnerHTML('.url .help-block.text-warning');
		// Use generalised version of warning message
		await expect(warning.includes('https')).toBe(true);
	});

	test('Date prop should process input correctly', async () => {
		const validDate = '2354-04-22';
		const invalidDate = 'totalgibberish';
		let output;

		await filterProps({filter:"date", name:"mydate"});

		await enterVal("[name=mydate]", validDate);
		output = await getInnerHTML('.date .pull-right i');
		await expect(output).toBe('22 Apr 2354');

		await enterVal("[name=mydate]", invalidDate);
		output = await getInnerHTML('.date .pull-right i');
		await expect(output).toBe('Invalid Date');

		const helpMessage = await getInnerHTML('.date .help-block.text-danger');
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
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','mycheckboxes'])).toBe(null);

		await page.click('[name=mycheckboxes][value=Cheque]');
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','mycheckboxes'])).toEqual(["Cheque"]);

		await page.click('[name=mycheckboxes][value=Cash]');
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','mycheckboxes'])).toEqual(["Cheque", "Cash"]);
	});

	test('Arraytext performs as expected', async() => {
		const testString = 'This is a string with spaces';
		const stringArr = testString.split(' ');
		
		await filterProps({filter:"array text input"});

		await enterVal("[name=myarraytext]", testString);

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
		await expect(await elementExists('[name=entrysetinput] .entry')).toBeFalsy();
		await expect(await getDataStoreVal(["widget", "BasicTextPropControl", "myentryset"])).toEqual(keyValObj);
	});

	test('Money saves data correctly based on input', async () => {
		const input = 23.41;

		await filterProps({filter: "moneycontrol"});

		await enterVal('[name=mymoney]', input);

		await expectMoneyVal(['widget','BasicMoneyPropControl','mymoney'], input);
	});

	test("PropControl: MoneyControl min-max", async () => {
		await filterProps({filter:"Money with min:5 max:100"});

		let littleMoney = 2.5;
		let goodMoney = 65.4;
		let bigMoney = 132.85;

		// ERROR CHECK - min value

		await enterVal('[name=minmaxmoney]', littleMoney);	
		await expectMoneyVal(['widget','MoneyControl','minmaxmoney'], littleMoney);
		// check error is generated
		await expect(await elementExists('[name=moneywithmin5max100] .help-block.text-danger')).toBeTruthy();
		let ev = await getInnerHTML('[name=moneywithmin5max100] .help-block.text-danger');
		await expect(ev.includes("minimum")).toBeTruthy();

		// ERROR CHECK - max value

		await enterVal('[name=minmaxmoney]', bigMoney);	
		await expectMoneyVal(['widget','MoneyControl','minmaxmoney'], bigMoney);
		// check error is generated
		await expect(await elementExists('[name=moneywithmin5max100] .help-block.text-danger')).toBeTruthy();
		ev = await getInnerHTML('[name=moneywithmin5max100] .help-block.text-danger');
		await expect(ev.includes("maximum")).toBeTruthy();

		// PASS CHECK - good value

		await enterVal('[name=minmaxmoney]', goodMoney);	
		await expectMoneyVal(['widget','MoneyControl','minmaxmoney'], goodMoney);
		await expect(await elementExists('[name=moneywithmin5max100] .help-block.text-danger')).toBeFalsy();
	});

	test("PropControl: Country input", async () => {
		await filterProps({filter:"Country input"});
		
		// make selection
		await page.select('[name=mycountry]', 'GB');
		// check screen updated
		const iv = await page.$eval('[name=mycountry]', e => e.options[e.selectedIndex].text);
		await expect(iv).toBe("United Kingdom (UK)");		

		// check datastore updated
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','mycountry'])).toBe("GB");
	});

	test("PropControl: XId input", async () => {
		await filterProps({filter:"xid input"});
		
		const text = "External ID Test";

		await enterVal('[name=myxid]', text);	
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','myxid'])).toBe(text + '@service');				
	});

	test("!! BROKEN !! - PropControl: Key set", async () => {
		if (true) return;

		await filterProps({filter:"key set input"});

		// Check you cannot add empty values
		await page.click("[name=keysetinput] button.btn");
		await expect(await elementExists("[name=keysetinput] .key")).toBeFalsy();
		
		const testText = "test";

		await enterVal("[name=keysetinput] input.form-control", testText);
		await page.click("[name=keysetinput] button.btn");

		const removeBtnHTML = '<span class="remove-key">×</span>';

		await expectInnerHTML("[name=keysetinput] .key", testText + " " + removeBtnHTML);
		let keys = await getDataStoreVal(['widget','BasicTextPropControl','mykeyset']);
		await expect(keys[testText]).toBeTruthy();

		await page.click("[name=keysetinput] .key .remove-key");

		await expect(await elementExists("[name=keysetinput] .key")).toBeFalsy();
		keys = await getDataStoreVal(['widget','BasicTextPropControl','mykeyset']);
		await expect(keys[testText]).toBeFalsy();
	});

	test("!! BROKEN !! - PropControl: JSON input", async () => {
		if (true) return;
		/*await filterProps({filter:"json input"});
		
		let text = "Hello World!";
		
		// type in text
		await enterVal("[name=myjson]", text);
		// check datastore updated
		const dv = await getDataStoreVal(['widget','BasicTextPropControl','myjson']);
		expect(JSON.stringify(dv)).toEqual(JSON.stringify({Hello:"World!"}));

		// check input works when replacing JSON

		const text2 = "{\"foo\":\"bar\"}";

		// type in text
		await enterVal('[name=myjson]', text2);	
		// check datastore updated
		const dv2 = await getDataStoreVal(['widget','BasicTextPropControl','myjson']);
		expect(JSON.stringify(dv2)).toBe(JSON.stringify({foo:"bar"}));*/
	});

	// TODO: Fill in when HTML is working
	test("!! Broken !! - Prop Control: HTML", async () => {
		await filterProps({filter:"html input"});
		return;

		const plainText = "testytest";
		const htmlText = "<b>testy<br/>test</b>";
		await page.type("[name=myhtml]", plainText, {delay:5});
		await expect(await getInnerHTML("[name=myhtml]")).toBe(plainText);
		await expect(await getDataStoreVal(['widget','BasicTextPropControl','myhtml'])).toBe(plainText);		
	});
});
