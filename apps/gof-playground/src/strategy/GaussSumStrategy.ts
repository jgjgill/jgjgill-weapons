import type SumStrategy from "./SumStrategy";

class GaussSumStrategy implements SumStrategy {
	get(N: number): number {
		return (N * (N + 1)) / 2;
	}
}

export default GaussSumStrategy;
