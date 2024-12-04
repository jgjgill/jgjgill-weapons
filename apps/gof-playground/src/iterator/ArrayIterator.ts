// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import type Array from "./Array";
import type Item from "./Item";
import type Iterator from "./Iterator";

class ArrayIterator implements Iterator<Item> {
	private _index: number;

	constructor(private _array: Array) {
		this._index = -1;
	}

	next(): boolean {
		this._index++;
		return this._index < this._array.count;
	}

	current(): Item {
		return this._array.getItem(this._index);
	}
}

export default ArrayIterator;
