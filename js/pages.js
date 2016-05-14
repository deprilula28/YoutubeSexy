function Page(pageLoadHandler, innerPage, channel, video, playlist, playlistTrack, playlistShuffle){
	
	this.pageLoadHandler = pageLoadHandler;
	this.channel = channel;
	this.innerPage = innerPage;
	this.video = video;
	this.playlist = playlist;
	this.playlistTrack = playlistTrack;
	this.playlistShuffle = playlistShuffle;
	
}

Page.prototype.pageLoad = function(){
	
	var page 
	
	if(this.channel){
		if(this.video){
			this.pageLoadHandler(this.channel, this.video, this.innerPage);
		}else if(this.playlist){
			this.pageLoadHandler(this.channel, this.playlist, this.playlistTrack, this.playlistShuffle, this.innerPage);
		}else{
			this.pageLoadHandler(this.channel, this.innerPage);
		}
	}else{
		this.pageLoadHandler(this.innerPage);
	}
	
}

function pageLoadHandleChannel(channel, innerPage){
	
	
	
}

function pageLoadHandleVideo(video, innerPage){

	
	
}

function pageLoadHandlePlaylist(playlist, playlistTrack, playlistShuffle, innerPage){
	
	
	
}

function pageLoadHandle(innerPage){
	
	
	
}