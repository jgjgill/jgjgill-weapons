import type Iterator from "./Iterator";

interface Aggregator<T> {
	iterator(): Iterator<T>;
}

export default Aggregator;
