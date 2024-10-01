import { useEffect, useRef } from "react";

/**
 * 이전 값을 저장하고 반환하는 함수
 * @param {Value}value - 현재 값
 * @example
 * ```tsx
 * const prevCount = usePrevious(count);
 * ```
 */

export function usePrevious<Value>(value: Value) {
	const ref = useRef(value);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}
