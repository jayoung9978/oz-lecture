const promise = new Promise((resolve, reject) => {
	console.log("Promise started");
}); //constructor
promise.then((result) => console.log(result));
