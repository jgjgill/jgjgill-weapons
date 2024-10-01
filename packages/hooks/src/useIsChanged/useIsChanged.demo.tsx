import { useState } from "react";
import { useIsChanged } from "./useIsChanged";

export default function Component() {
	const [count] = useState(0);
	const isCountChanged = useIsChanged(count);

	return <div>Hello World!</div>;
}
