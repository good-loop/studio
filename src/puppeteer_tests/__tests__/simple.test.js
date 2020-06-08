
// TODO for help on this see <doc??>

const config = JSON.parse(process.env.__CONFIGURATION);
const { ourServers} = require('../utils/testConfig');

const baseSite = ourServers[config.site];

describe('Studio - smoke test', () => {
	it('should load a page', async () => {
		console.log("goto "+baseSite+"...");
		await page.goto(baseSite);
		await expect(page).toMatch('Studio');
	});

	it("PropControl: Basic text input", async () => {
		await page.goto(baseSite+'?f=basic');
		await expect(page).toMatch('Basic');
		
		// type in text
		await page.type('[name=mybasictext]', "Hello World");

		// check screen updated
		const iv = await page.$eval('[name=mybasictext]', e => e.value);
		expect(iv).toBe("Hello World");		
		// check datastore updated
		const dv = await page.$eval('body', 
			e => window.DataStore.getValue(['widget','BasicTextPropControl','mybasictext'])
		);
		expect(dv).toBe("Hello World");				

	});

	// TODO: Find proper selector to identify input with
	it("PropControl: Autocomplete", async () => {
		await page.goto(baseSite+'?f=auto');
		await expect(page).toMatch('Auto');
		
		// type in text
		await page.type('[name=myautocomp]', "Hello World");

		// check screen updated
		const iv = await page.$eval('[name=myautocomp]', e => e.value);
		expect(iv).toBe("Hello World");		
		// check datastore updated
		const dv = await page.$eval('body', 
			e => window.DataStore.getValue(['widget','BasicTextPropControl','myautocomp'])
		);
		expect(dv).toBe("Hello World");				

	});

	it("PropControl: URL", async () => {
		await page.goto(baseSite+'?f=url');
		await expect(page).toMatch('URL');
		
		// type in text
		await page.type('[name=myurl]', "https://www.good-loop.com");

		// check screen updated
		const iv = await page.$eval('[name=myurl]', e => e.value);
		expect(iv).toBe("https://www.good-loop.com");		
		// check datastore updated
		const dv = await page.$eval('body', 
			e => window.DataStore.getValue(['widget','BasicTextPropControl','myurl'])
		);
		expect(dv).toBe("https://www.good-loop.com");	

		// Clear field
		for (let i = 0; i < iv.length; i++) {
			await page.keyboard.press('Backspace');
		}

		// ERROR CHECK

		// type in text
		await page.type('[name=myurl]', "good loop");

		// check screen updated
		const iv2 = await page.$eval('[name=myurl]', e => e.value);
		expect(iv2).toBe("good loop");		
		// check datastore updated
		const dv2 = await page.$eval('body', 
			e => window.DataStore.getValue(['widget','BasicTextPropControl','myurl'])
		);
		expect(dv2).toBe("good loop");
		// check error is generated
		const ev = await page.$eval('.help-block.text-danger', e => e.innerHTML);
		expect(ev).toBe("This is not a valid URL");

	});

	it("PropControl: MoneyControl", async () => {
		await page.goto(baseSite+'?f=money');
		await expect(page).toMatch('Money');
		
		// type in text
		await page.type('[name=mymoney]', "50");

		// check screen updated
		const iv = await page.$eval('[name=mymoney]', e => e.value);
		expect(iv).toBe("50");		
		// check datastore updated
		const dv = await page.$eval('body', 
			e => window.DataStore.getValue(['widget','BasicTextPropControl','mymoney'])
		);
		expect(dv.value).toBe(50);
		expect(dv.currency).toBe("GBP");

		// Clear field
		for (let i = 0; i < iv.length; i++) {
			await page.keyboard.press('Backspace');
		}

		// ERROR CHECK

		// type in text
		await page.type('[name=mymoney]', "2.5");

		// check screen updated
		const iv2 = await page.$eval('[name=mymoney]', e => e.value);
		expect(iv2).toBe("2.5");		
		// check datastore updated
		const dv2 = await page.$eval('body', 
			e => window.DataStore.getValue(['widget','BasicTextPropControl','mymoney'])
		);
		expect(dv2.value).toBe(2.5);
		expect(dv2.currency).toBe("GBP");
		// check error is generated
		const ev = await page.$eval('.help-block.text-danger', e => e.innerHTML);
		expect(ev).toBe("Value is below the minimum £5");

	});
});
