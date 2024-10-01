import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePrevious } from "./usePrevious";

describe("usePrevious", () => {
	it("초기값을 반환합니다.", () => {
		const { result } = renderHook(() => usePrevious(0));

		expect(result.current).toBe(0);
	});

	it("변경되기 전의 값을 반환합니다.", () => {
		const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
			initialProps: { value: 0 },
		});

		rerender({ value: 1 });

		expect(result.current).toBe(0);

		rerender({ value: 2 });

		expect(result.current).toBe(1);
	});
});
