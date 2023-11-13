
// Usage: open the html file in a browser

// ava doesn't work (yet?) due to dependencies
// let test = require('ava');
// let DataStore = require('DataStore');

SJTest.run({
	'DataStore: getValue setValue': () => {
		let a = DataStore.getValue("misc","myvalnope");		
		assert( ! a, a);
		DataStore.setValue(["misc","myval"], "Hello");		
		let a2 = DataStore.getValue("misc","myval");		
		assert(a2==="Hello");
		return a2;
	}
});


SJTest.run({
	'DataStore: setValue ...fetch': () => {
		let path = ["misc","myval-sf"];
		DataStore.setValue(path, {"name":"set-by-setValue"});
		let pv = DataStore.fetch(path, () => {
			return {"name":"set-by-fetch"};
		});
		// await pv.promise;
		console.log(pv, pv.value);
		let v = DataStore.getValue(path);
		assert(v.name==="set-by-setValue");
		return v;
	}
});

SJTest.run({
	'DataStore: fetch': () => {
		let path = ["misc","myval-f"];
		let pv = DataStore.fetch(path, () => {
			return {"name":"set-by-fetch"};
		});
		// await pv.promise;
		pv.promise.then(v => {
			console.log('DataStore: fetch', pv, pv.value, v);
			assert(v.name==="set-by-fetch");
			let v2 = DataStore.getValue(path);
			assert(v2.name==="set-by-fetch");
		});
		return pv;
	}
});

