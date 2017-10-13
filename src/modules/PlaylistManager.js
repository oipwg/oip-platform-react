let PlaylistManager = (function(){
	let PlaylistMan = {};

	PlaylistMan.playlist = [];

	PlaylistMan.addArtifact = function(newArtifact){
		PlaylistMan.playlist.push(newArtifact);
	}

	return PlaylistMan;
})();

export default PlaylistManager;