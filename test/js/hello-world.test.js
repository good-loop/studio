
let test = require('ava');
// import test from 'ava';

test('smoketest ava - Hello World', t => {
	t.pass();
});

test('smoketest ava - await Hello World', async t => {
	const bar = Promise.resolve('Hello World');
	t.is(await bar, 'Hello World');
});
