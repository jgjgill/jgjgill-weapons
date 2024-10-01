import { usePrevious } from "../usePrevious";

/**
 * 값이 변경되었는지 확인하는 함수
 * @param {unknown} value - 확인할 값
 * @example
 * ```tsx
 * const isCountChanged = useIsChanged(count);
 * ```
 */

export function useIsChanged(value: unknown) {
	return usePrevious(value) !== value;
}
