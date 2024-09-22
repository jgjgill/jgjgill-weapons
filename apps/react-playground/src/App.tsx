import { useUnmount } from "@jgjgill/hooks";
import { useEffect } from "react";

function App() {
	useUnmount(() => {
		console.log("unmount");
	});

	const a = 123;
	useEffect(() => {});

	return (
		<div>
			{[1, 2, 3, 4].map((item) => (
				<div>123</div>
			))}
			<h2>hello world jgjgill</h2>
		</div>
	);
}

export default App;
