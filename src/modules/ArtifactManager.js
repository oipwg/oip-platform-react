let ArtifactManager = (function(){
	let ArtManager = {};

	ArtManager.currentArtifact = {};
	ArtManager.currentFile = {};

	ArtManager.setCurrentFile = function(newFile){
		ArtManager.currentFile = newFile;
	}

	ArtManager.setCurrentArtifact = function(newArtifact){
		ArtManager.currentArtifact = newArtifact;
	}

	return ArtManager;
})();

export default ArtifactManager;