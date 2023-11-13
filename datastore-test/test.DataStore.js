
SJTest.run({
	'DataStore: getValue setValue': () => {
		let a = DataStore.getValue("test","myvalnope");		
		assert( ! a, a);
		DataStore.setValue(["test","myval"], "Hello");		
		let a2 = DataStore.getValue("test","myval");		
		assert(a2==="Hello");
		return a2;
	}
});

