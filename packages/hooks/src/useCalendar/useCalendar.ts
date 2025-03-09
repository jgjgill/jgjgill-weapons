import dayjs from "dayjs";
import { useState } from "react";

const TOTAL_CALENDAR_CELLS = 35;
const EMPTY_CELL_VALUE = 0;
const DAYS_IN_WEEK = 7;

/**
 * 달력 기능을 제공하는 커스텀 훅
 * dayjs 라이브러리를 사용하여 구현된 캘린더 관리 훅
 *
 * @returns 주 단위로 나눈 달력 배열과 날짜 관리 함수들
 * @example
 * ```tsx
 * const {
 *   weekCalendarList,
 *   currentDate,
 *   setCurrentDate,
 *   goToPreviousMonth,
 *   goToNextMonth
 * } = useCalendar();
 * ```
 */

export function useCalendar() {
	const [currentDate, setCurrentDate] = useState(() => dayjs());

	const totalMonthDays = currentDate.daysInMonth();
	const startDayOfMonth = currentDate.startOf("month").day();

	/**
	 * 현재 월의 첫 날 이전의 빈 셀 배열
	 */

	const emptyPreviousDays = Array.from({
		length: startDayOfMonth,
	}).map(() => EMPTY_CELL_VALUE);

	/**
	 * 현재 월의 날짜 배열
	 */

	const currentMonthDays = Array.from({ length: totalMonthDays }).map(
		(_, i) => i + 1,
	);

	/**
	 * 현재 월의 마지막 날 이후의 빈 셀 배열
	 */

	const emptyNextDays = Array.from({
		length:
			TOTAL_CALENDAR_CELLS - currentMonthDays.length - emptyPreviousDays.length,
	}).map(() => EMPTY_CELL_VALUE);

	/**
	 * 한 달 전체의 날짜 배열 (이전 달 빈칸 + 현재 달 날짜 + 다음 달 빈칸)
	 */

	const flatCalendarArray = emptyPreviousDays.concat(
		currentMonthDays,
		emptyNextDays,
	);

	/**
	 * 주 단위로 그룹화된 날짜 배열 (2차원 배열)
	 * 각 내부 배열은 한 주의 날짜를 나타냄 (일요일부터 토요일까지)
	 */

	const weekCalendarList = flatCalendarArray.reduce(
		(acc: number[][], cur, idx) => {
			const chunkIndex = Math.floor(idx / DAYS_IN_WEEK);
			if (!acc[chunkIndex]) {
				acc[chunkIndex] = [];
			}
			acc[chunkIndex].push(cur);
			return acc;
		},
		[],
	);

	/**
	 * 이전 달 이동 함수
	 */

	const goToPreviousMonth = () => {
		setCurrentDate(currentDate.subtract(1, "month"));
	};

	/**
	 * 다음 달 이동 함수
	 */

	const goToNextMonth = () => {
		setCurrentDate(currentDate.add(1, "month"));
	};

	return {
		weekCalendarList,
		currentDate,
		setCurrentDate,
		goToPreviousMonth,
		goToNextMonth,
	};
}
