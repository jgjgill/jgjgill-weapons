import { useCalendar } from "./useCalendar";

export default function Component() {
	const {
		weekCalendarList,
		currentDate,
		setCurrentDate,
		goToPreviousMonth,
		goToNextMonth,
	} = useCalendar();

	return <div>Hello World!</div>;
}
