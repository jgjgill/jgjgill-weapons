import { act, renderHook } from "@testing-library/react";
import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import { useCalendar } from "./useCalendar";

describe("useCalendar", () => {
	it("초기 currentDate가 현재 날짜로 설정됩니다", () => {
		const { result } = renderHook(() => useCalendar());

		const today = dayjs();

		expect(result.current.currentDate.format("YYYY-MM-DD")).toBe(
			today.format("YYYY-MM-DD"),
		);
	});

	it("첫번째 주의 시작은 해당 월의 시작 요일에 맞게 배치됩니다", () => {
		const testDate = dayjs("2025-03-01"); // 2023년 1월 1일은 토요일
		const { result } = renderHook(() => useCalendar());

		act(() => {
			result.current.setCurrentDate(testDate);
		});

		// 첫번째 주의 첫번째~다섯번째 날은 0, 여섯번째 날이 1
		expect(result.current.weekCalendarList[0]?.[0]).toBe(0); // 일요일 - 빈 셀
		expect(result.current.weekCalendarList[0]?.[1]).toBe(0); // 월요일 - 빈 셀
		expect(result.current.weekCalendarList[0]?.[2]).toBe(0); // 화요일 - 빈 셀
		expect(result.current.weekCalendarList[0]?.[3]).toBe(0); // 수요일 - 빈 셀
		expect(result.current.weekCalendarList[0]?.[4]).toBe(0); // 목요일 - 빈 셀
		expect(result.current.weekCalendarList[0]?.[5]).toBe(0); // 금요일 - 빈 셀
		expect(result.current.weekCalendarList[0]?.[6]).toBe(1); // 토요일 - 3월 1일
	});
});
