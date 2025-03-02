setTimeout(() => {
	console.log("setTimeout 콜백");
}, 0);

setImmediate(() => {
	console.log("setImmediate 콜백");
});

process.nextTick(() => {
	console.log("nextTick 콜백");
});

console.log("동기 코드");
