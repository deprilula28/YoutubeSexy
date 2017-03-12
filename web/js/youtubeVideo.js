

YoutubeSexy.prototype.playVideo = function(videoId){

  this.playing = videoId;
  console.log("Preparing to play video " + videoId);

}

YoutubeSexy.prototype.usePlaylist = function(playlistId){

  this.playlist = playlistId;

}
