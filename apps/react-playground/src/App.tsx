import { useIsChanged, usePrevious, useUnmount } from "@jgjgill/hooks";
import { useState } from "react";

function App() {
	const [count, setCount] = useState(0);

	useUnmount(() => {
		console.log("unmount");
	});

	const prevCount = usePrevious(count);
	const isChanged = useIsChanged(count);

	return (
		<div>
			<p>Current Count: {count}</p>
			<p>Previous Count: {prevCount}</p>
			<p>Has Count Changed?: {isChanged ? "Yes" : "No"}</p>
			<button type="button" onClick={() => setCount(count + 1)}>
				Increment
			</button>
		</div>
	);
}

export default App;
