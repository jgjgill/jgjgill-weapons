import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useUnmount } from "./useUnmount";

describe("useUnmount", () => {
	it("unmount시 cleanup 함수를 호출합니다.", () => {
		const cleanupMock = vi.fn();

		const { unmount } = renderHook(() => {
			useUnmount(cleanupMock);
		});

		expect(cleanupMock).not.toHaveBeenCalled();

		act(() => {
			unmount();
		});

		expect(cleanupMock).toHaveBeenCalled();
	});
});
