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
	
	var page = undefined;
	
	if(this.channel){
		if(this.video){
			page = this.pageLoadHandler(this.channel, this.video, this.innerPage);
		}else if(this.playlist){
			page = this.pageLoadHandler(this.channel, this.playlist, this.playlistTrack, this.playlistShuffle, this.innerPage);
		}else{
			page = this.pageLoadHandler(this.channel, this.innerPage);
		}
	}else{
		page = this.pageLoadHandler(this.innerPage);
	}

	getScript('cssAnimation', 'cssAnimations', function(){
		addCSSAnimation("fadeInScale", function(){
			var anim = new CSSAnimation();
			
			anim.setAnimationPercentValue("0%", "-webkit-transform", 'scale(0.95, 0.95)');
			anim.setAnimationPercentValue("0%", "-moz-transform", 'scale(0.95, 0.95)');
			anim.setAnimationPercentValue("0%", "transform", 'scale(0.95, 0.95)');
			anim.setAnimationPercentValue("0%", "opacity", '0.0');
			anim.setAnimationPercentValue("100%", "-webkit-transform", 'scale(1, 1)');
			anim.setAnimationPercentValue("100%", "-moz-transform", 'scale(1, 1)');
			anim.setAnimationPercentValue("100%", "transform", 'scale(1, 1)');
			anim.setAnimationPercentValue("100%", "opacity", '1.0');
		});
		
		document.body.appendChild(page);
		$(page).css({'-webkit-transform': 'scale(1, 1)', '-moz-transform': 'scale(1, 1)', 'transform': 'scale(1, 1)', 'opacity': '1.0'});
		$(page).css({'-webkit-animation-name': 'fadeInScale', '-webkit-animation-duration': '0.5s'});
		$(page).css({'-moz-animation-name': 'fadeInScale', '-moz-animation-duration': '0.5s'});
		$(page).css({'animation-name': 'fadeInScale', 'animation-duration': '0.5s'});
	});
	
}

function pageLoadHandleChannel(channel, innerPage){
	
	
	
}

function pageLoadHandleVideo(video, innerPage){

	
	
}

function pageLoadHandlePlaylist(playlist, playlistTrack, playlistShuffle, innerPage){
	
	
	
}

function pageLoadHandle(innerPage){
	
	
	
}