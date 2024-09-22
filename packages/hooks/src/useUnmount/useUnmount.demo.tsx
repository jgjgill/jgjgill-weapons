import { useUnmount } from "./useUnmount";

export default function Component() {
	useUnmount(() => {
		// cleanup 로직
	});

	return <div>Hello World!</div>;
}
