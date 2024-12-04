import type Aggregator from "../Aggregator";
import type Iterator from "../Iterator";
import PlaylistIterator from "./PlaylistIterator";
import type Song from "./Song";

class Playlist implements Aggregator<Song> {
	constructor(private _songs: Song[]) {}

	public getSong(index: number) {
		return this._songs[index];
	}

	public get count() {
		return this._songs.length;
	}

	iterator(): Iterator<Song> {
		return new PlaylistIterator(this);
	}
}

export default Playlist;
