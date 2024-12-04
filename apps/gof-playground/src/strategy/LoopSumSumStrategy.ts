import type SumStrategy from "./SumStrategy";

class LoopSumSumStrategy implements SumStrategy {
	get(N: number): number {
		let sum = 0;

		for (let i = 0; i <= N; i++) {
			sum += i;
		}

		return sum;
	}
}

export default LoopSumSumStrategy;
