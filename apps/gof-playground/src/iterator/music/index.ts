import Playlist from "./Playlist";
import Song from "./Song";

const songs = [
	new Song("Shape of You", "Ed Sheeran"),
	new Song("Blinding Lights", "The Weeknd"),
];

const playlist = new Playlist(songs);
const playlistIter = playlist.iterator();

while (playlistIter.next()) {
	const song = playlistIter.current();
	console.log(`Now playing: ${song.name} by ${song.artist}`);
}
