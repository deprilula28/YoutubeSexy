
YoutubeSexy.prototype.playVideo = function(videoResult, posterResult, mouseX, mouseY, thumbnail){

  if(this.playing == videoResult.id){
    console.log("Attempted to open video already playing!");
    return;
  }

  if(handleLeave) handleLeave(true);
  this.playing = videoResult.id;
  $(".top-text").get(0).textContent = videoResult.snippet.title;
  $("#bigVideoIFrame").get(0).src = "https://www.youtube.com/embed/" + this.playing + "?autoplay=1&enablejsapi=1&theme=light&showinfo=0";
  console.log("Preparing to play video...");
  $("#main-page").removeClass("blurInFrames").removeClass("blurOutFrames");

  $("body").css({"overflow": "hidden"});
  
  var inVideo = $('#content-page').children().length > 0;
  $("#content-page").empty();
	$("#content-page").get(0).appendChild($("#youtubePage").get(0));

  handleLeave = (toVideo) => {
  	console.log("Handle leave called.");
  	this.playing = undefined;
    $("#content-page").animate({"opacity": 0});
    $("body").css({"overflow": ""});
    $("nav").css({"height": "64px"}).animate({"background-color": "#3f51b5"});
    $("#main-page").removeClass("blurInFrames").addClass("blurOutFrames").animate({"opacity": 1});

    setTimeout(() => {
    	$(".content").get(0).appendChild($("#youtubePage").get(0));
      $("#main-page").removeClass("blurOutFrames").css({"opacity": ""});
      $("#content-page").css({"display": "none", "opacity": 1}).empty();
    }, 500);
    $(".top-text").get(0).textContent = "Home";
    
    handleLeave = undefined;
    
    if(!toVideo){
    	//Put video in small window view
    }
  };

  //Appear animation
  if(mouseX && mouseY){
    $("#content-page").css({"opacity": 0, "display": "block"}).animate({"opacity": 1});
    $("#youtubePage").css({"display": "block"});
    $("#main-page").addClass("blurInFrames").animate({"opacity": 0});
  }

  //Content page filing
  $("#youtubeVideoTabs").tabs();
  $("#youtubeVideoTitleLabel").get(0).textContent = videoResult.snippet.title;
  $("#youtubeVideoViewsLabel").get(0).textContent = prettifyNumber(videoResult.statistics.viewCount) + " views";
  $("#channelYoutubeVideoChipPlaceholder").empty();
  $("#channelYoutubeVideoChipPlaceholder").get(0).appendChild(this.ui.getUserIcon(videoResult.snippet.channelId, "100%"));

  //Like/Dislike
  $("#ldshadpYoutubeVideoChipPlaceholder").empty();
  var rowVideoInfo = this.ui.generateNewElement("div", ["row"], undefined, $("#ldshadpYoutubeVideoChipPlaceholder").get(0), undefined);
  var columnLike = this.ui.generateNewElement("div", ["col", "s6"], undefined, rowVideoInfo, {"padding-right": "0px"});
  var likeChip = this.ui.generateNewElement("div", ["chip", "small", "waves-effect", "waves-dark"], undefined,
    columnLike, {"margin": "0px"});
  var likeImg = this.ui.generateNewElement("img", undefined, undefined, likeChip, {"margin-right": "0px"});
  likeImg.src = "img/like.png";
  var likesText = this.ui.generateNewElement("a", ["black-text", "truncate"], "0", likeChip, undefined)

  var columnDislike = this.ui.generateNewElement("div", ["col", "s4"], undefined, rowVideoInfo, {"padding": "0px"});
  var dislikeChip = this.ui.generateNewElement("div", ["chip", "small", "waves-effect", "waves-dark"], undefined,
    columnDislike, {"margin": "0px"});
  var dislikeImg  = this.ui.generateNewElement("img", undefined, undefined, dislikeChip, {"margin-right": "0px"});
  dislikeImg.src = "img/dislike.png";
  var dislikesText = this.ui.generateNewElement("a", ["black-text", "truncate"], "0", dislikeChip, undefined)

  //Filling tabs
  $("#comments").empty();
  $("#recommended").empty();
  $("#statistics").empty();

  //Comments
  this.loadCommentSection(this.playing, videoResult, posterResult, videoResult.statistics.commentCount);
  this.loadRecommendedSection(this.playing);
  this.loadSocialbladeStatisticsSection(this.playing);
  
  //Initialize
  $("#youtubeVideoTabs").tabs();

}

YoutubeSexy.prototype.loadCommentSection = function(videoId, videoResult, posterResult, commentCount){

	$(".commentAmountTitle").text("Amount of comments: " + commentCount);
	var commentSectionDiv = $("#commentSection").get(0);

	youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/commentThreads", {
		"part": "snippet",
		"videoId": videoResult.id,
		"maxResults": 50,
		"textFormat": "plainText"
	}, (result) => {
		for(var itemIndex in result.items){
			//Basics
			var item = result.items[itemIndex];
			
			var commentRow = this.ui.generateNewElement("div", ["row"], undefined, commentSectionDiv, undefined);
			var commentColumn = this.ui.generateNewElement("div", ["col", "s12"], undefined, commentRow, undefined);
			
			//Commenter JSON
			var commenterData = {
				"tag": "common"
			};
			if(videoResult.snippet.channelId === item.snippet.topLevelComment.snippet.authorChannelId.value) commenterData.tag = "owner";
			else if(verifyFeatured(posterResult, item.snippet.topLevelComment.snippet.authorChannelId.value)) commenterData.tag = "featured";
			
			//Comment Author
			var commenterRow = this.ui.generateNewElement("div", ["row"], undefined, commentColumn, undefined);
			var commenterColumn = this.ui.generateNewElement("div", ["col", "s12"], undefined, commenterRow, undefined);
			var commenterChip = this.ui.getUserIcon(item.snippet.topLevelComment.snippet.authorChannelId.value, "100%");
			commenterColumn.appendChild(commenterChip);
			
			//Content
			var contentRow = this.ui.generateNewElement("div", ["row"], undefined, commentColumn, undefined);
			var contentColumn = this.ui.generateNewElement("div", ["col", "s12"], undefined, contentRow, undefined);
			appendCommentHTML(item.snippet.topLevelComment.snippet.textDisplay, contentColumn);
		}
	});

}

function appendCommentHTML(comment, master){
	
	var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig; //Credit: http://stackoverflow.com/a/8943487
	var attachments = [];
	
	comment = comment.replace(urlRegex, (url) => {
		try{
			if(url.startsWith("http://www.youtube.com") || url.startsWith("https://www.youtube.com") || url.startsWith("www.youtube.com")){
				var videoLink = url.split("v=")[1];
				attachments.push(videoLink);
			}else if(url.startsWith("http://youtu.be") || url.startsWith("https://youtu.be") || url.startsWith("youtu.be")){
				var videoLink = url.split("youtu.be/")[1];
				attachments.push(videoLink);
			}
		}catch(e){}
		return "<a class=\"indigo-text\" target=\"_blank\" href=" + url + ">" + url + "</a>";
	});
	comment = comment.replaceAll("\n", "<br>");

	var boldRegex = /\*(.|\n)*?\*/ig;
	var italicRegex = /_(.|\n)*?_/ig;
	var strikethroughRegex = /-(.|\n)*?-/ig;

	comment = comment.replace(boldRegex, (text) => {return "<a style=\"font-style: bold;\">" + text + "</a>"});
	comment = comment.replace(italicRegex, (text) => {return "<a style=\"font-style: oblique;\">" + text + "</a>"});
	comment = comment.replace(strikethroughRegex, (text) => {return "<a style=\"text-decoration: overline;\">" + text + "</a>"});
	
	for(var attachmentIndex in attachments){
		
	}
	
	var commentAnchor = youtubeSexy.ui.generateNewElement("a", ["white-text"], comment, master, {"word-wrap": "break-word", "font-size": "12px"});
	return commentAnchor;
	
}

function verifyFeatured(channelResult, poster){
	
	if(channelResult.brandingSettings.channel.featuredChannelsUrls){
		var featuredUrls = channelResult.brandingSettings.channel.featuredChannelsUrls;
		for(var urlIndex in featuredUrls){
			var url = featuredUrls[urlIndex];
			if(url === poster) return true;
		}
	}
	
	return false;
	
}

YoutubeSexy.prototype.loadRecommendedSection = function(videoId){



}

YoutubeSexy.prototype.loadSocialbladeStatisticsSection = function(videoId){

	//TODO

}



YoutubeSexy.prototype.usePlaylist = function(playlistId){

  this.playlist = playlistId;

}
