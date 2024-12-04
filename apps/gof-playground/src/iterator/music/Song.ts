class Song {
	constructor(
		private _name: string,
		private _artist: string,
	) {}

	get name() {
		return this._name;
	}

	get artist() {
		return this._artist;
	}
}

export default Song;
