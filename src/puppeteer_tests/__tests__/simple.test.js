
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
});
