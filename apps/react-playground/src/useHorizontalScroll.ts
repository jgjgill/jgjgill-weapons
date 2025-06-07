import { useRef, useState } from "react";

interface UseHorizontalScrollProps {
	scrollSpeed?: number;
	dragThreshold?: number;
}

export function useHorizontalScroll(options: UseHorizontalScrollProps = {}) {
	const { scrollSpeed = 1, dragThreshold = 5 } = options;

	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [hasDragged, setHasDragged] = useState(false);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!scrollContainerRef.current) {
			return;
		}

		setIsDragging(true);
		setHasDragged(false);
		setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
		setScrollLeft(scrollContainerRef.current.scrollLeft);

		e.preventDefault();
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !scrollContainerRef.current) {
			return;
		}

		const x = e.pageX - scrollContainerRef.current.offsetLeft;
		const deltaX = Math.abs(x - startX);

		if (deltaX > dragThreshold) {
			setHasDragged(true);
		}

		const walk = (x - startX) * scrollSpeed;
		scrollContainerRef.current.scrollLeft = scrollLeft - walk;

		e.preventDefault();
	};

	const handleMouseUp = () => {
		setHasDragged(false);
		setIsDragging(false);
	};

	const handleMouseLeave = () => {
		setHasDragged(false);
		setIsDragging(false);
	};

	const scrollHandlers = {
		onMouseDown: handleMouseDown,
		onMouseMove: handleMouseMove,
		onMouseUp: handleMouseUp,
		onMouseLeave: handleMouseLeave,
	};

	return { scrollContainerRef, isDragging, hasDragged, scrollHandlers };
}
