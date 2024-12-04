import type SumStrategy from "./SumStrategy";

class SumPrinter {
	print(strategy: SumStrategy, N: number, domOutput: Element) {
		const value = strategy.get(N);
		domOutput.innerHTML = `1~${N}까지의 총합 = ${value}`;
	}
}

export default SumPrinter;
