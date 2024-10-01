import { useState } from "react";
import { usePrevious } from "./usePrevious";

export default function Component() {
	const [count] = useState(0);
	const prevCount = usePrevious(count);

	return <div>Hello World!</div>;
}
