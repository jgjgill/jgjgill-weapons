import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useIsChanged } from "./useIsChanged";

describe("useIsChanged", () => {
	it("초기값으로 false를 반환합니다.", () => {
		const { result } = renderHook(() => useIsChanged(0));

		expect(result.current).toBe(false);
	});

	it("값이 변경되면 true를 반환합니다.", () => {
		const { result, rerender } = renderHook(
			({ value }) => useIsChanged(value),
			{
				initialProps: { value: 0 },
			},
		);

		rerender({ value: 1 });
		expect(result.current).toBe(true);

		rerender({ value: 1 });
		expect(result.current).toBe(false);

		rerender({ value: 2 });
		expect(result.current).toBe(true);
	});
});
