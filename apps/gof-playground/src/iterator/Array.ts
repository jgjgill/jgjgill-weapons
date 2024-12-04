import type Aggregator from "./Aggregator";
import ArrayIterator from "./ArrayIterator";
import type Item from "./Item";
import type Iterator from "./Iterator";

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
class Array implements Aggregator<Item> {
	constructor(private _items: Item[]) {}

	public getItem(index: number) {
		return this._items[index];
	}

	public get count() {
		return this._items.length;
	}

	iterator(): Iterator<Item> {
		return new ArrayIterator(this);
	}
}

export default Array;
