import styles from "./App.module.css";
import { useHorizontalScroll } from "./useHorizontalScroll";

function App() {
	const { scrollContainerRef, scrollHandlers } = useHorizontalScroll();

	return (
		<div>
			<div
				ref={scrollContainerRef}
				className={styles.scrollContainer}
				{...scrollHandlers}
			>
				{Array.from({ length: 10 }, (_, i) => (
					<div key={`temp-${i + 1}`} className={styles.scrollItem}>
						<div>
							<div>카드 {i + 1}</div>
							<div>클릭!</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
