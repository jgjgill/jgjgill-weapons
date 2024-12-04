import type Iterator from "../Iterator";
import type Playlist from "./Playlist";
import type Song from "./Song";

class PlaylistIterator implements Iterator<Song> {
	private _index: number;

	constructor(private _playlist: Playlist) {
		this._index = -1;
	}

	next(): boolean {
		this._index++;
		return this._index < this._playlist.count;
	}

	current(): Song {
		return this._playlist.getSong(this._index);
	}
}

export default PlaylistIterator;
