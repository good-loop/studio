
## `tests` directory

To run:

	npm test

This should:

 - Use playwright, as specified in package.json scripts.test
    - Using the playwright.config.ts
	- which will start http-server on the tests directory, so that the playwright tests can hit up a local web-server to read local html files (this seems to be needed - relative file urls don't seem to work)
 - Run the example.spec.ts file in this tests folder
 - ...Which will open eg. DataStore.test.html
 - ...Which will run DataStore,SJT.js as tests in the browser
 - ...And the playwright level test will check for pass / fail

Note: this was written after more vanilla approaches failed, running into js build/dependency issues (e.g. you need `import` but can't use it). 
There must be a better way to do this!
