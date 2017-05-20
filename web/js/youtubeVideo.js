
YoutubeSexy.prototype.playVideo = function(videoResult, posterResult, mouseX, mouseY, thumbnail, doDelete, animation){
	
  if(this.playing === videoResult.id){
    console.log("Attempted to open video already playing!");
    return;
  }
  var smallVideoPlayerWindowWrapper = $(".smallVideoPlayerWindowWrapper");
  var bigVideoFrame = $("#bigVideoIFrame");
  var mainPage = $("#main-page");
  var contentPage = $("#content-page");

  this.ui.unloadSearchBar();
  this.playing = videoResult.id;
  $(".top-text").get(0).textContent = videoResult.snippet.title;
  bigVideoFrame.attr("src", "https://www.youtube.com/embed/" + this.playing + "?autoplay=1&enablejsapi=1&theme=light&showinfo=0");
  console.log("Preparing to play video...");
  mainPage.removeClass("blurInFrames").removeClass("blurOutFrames");
  
  if(youtubeSexy.ui.displayingSmallVideo){
		youtubeSexy.ui.displayingSmallVideo = false;
  	$("#bigVideoIFrameContainer").get(0).appendChild(bigVideoFrame.css({"height": "100%"}).get(0));
  	smallVideoPlayerWindowWrapper.removeClass("filled").css({"display": "none"});
  }

	//Handle Leave
  handleLeave = function(onDone){
      $(".text-change").removeClass("black-text").addClass("white-text");
      youtubeSexy.playing = undefined;
		var videoIFrame = bigVideoFrame.css({"height": "100%"}).get(0);
		smallVideoPlayerWindowWrapper.addClass("filled").css({"width": videoIFrame.clientWidth, "height": videoIFrame.clientHeight,
			"display": "block"}).get(0).appendChild(videoIFrame);
		$(".smallVideoPlayerTopBar").css({"background-color": this.vibrantColor});
		$(".smallVideoPlayerTopBarTitle").text(videoResult.snippet.title);

		smallVideoPlayerWindowWrapper.click(function(){
			smallVideoPlayerWindowWrapper.css({"animation": "smallVideoPlayerDisappear 0.25s"});

			setTimeout(function(){
				smallVideoPlayerWindowWrapper.removeClass("filled").css({"display": "none", "animation": ""});
				videoIFrame.src = "";
				$(".bigVideoIFrameContainer").get(0).appendChild(videoIFrame);
			}, 250);
		}).on("mouseover", function(){
			$(".smallVideoPlayerTopBar").clearQueue().stop().animate({"top": "0px"}, 100, "easeOutQuad");
		}).on("mouseleave", function(){
			$(".smallVideoPlayerTopBar").clearQueue().stop().animate({"top": "-28px"}, 100, "easeOutQuad");
		});

		youtubeSexy.ui.displayingSmallVideo = true;
		youtubeSexy.ui.animateVideoIFrameSizing();

		contentPage.animate({"opacity": 0});
		$("body").css({"overflow": ""});
		$("nav").css({"height": "64px"}).animate({"background-color": "#d40000"}, 100, "linear", function(){
				$("nav").css({"background-color": "#d40000"});
		});
		if(backgroundType === "backgroundBlur") $("#main-page").removeClass("blurInFrames").addClass("blurOutFrames").animate({"opacity": 1});
		else $("#main-page").animate({"opacity": 1});
    
    setTimeout(function(){
      var youtubePage = $("#youtubePage");
      $("#pageContent").append(youtubePage);
      if(backgroundType === "backgroundBlur") mainPage.removeClass("blurOutFrames").css({"opacity": ""});
      else mainPage.css({"opacity": ""});
      youtubePage.css({"display": "none"});
      contentPage.css({"display": "none", "opacity": 1}).empty();

      onDone();
    }, 500);

    $(".top-text").get(0).textContent = "Home";
  };

  $("body").css({"overflow": "hidden"});

  var inVideo = contentPage.children().length > 0;
  contentPage.empty().append($("#youtubePage"));

  var vibrant = new Vibrant(thumbnail);
  var swatches = vibrant.swatches();

  if(swatches.Vibrant) this.vibrantColor = swatches.Vibrant.getHex();
  else this.vibrantColor = "#d40000";

  $(".text-change").removeClass("white-text").addClass("black-text");

  $(".tab a").css({"color": this.vibrantColor});
  $(".indicator").css({"background-color": this.vibrantColor});
  $("nav").animate({"background-color": this.vibrantColor});

  var backgroundType = youtubeSexy.options.backgroundType;
	
  if(backgroundType === "thumbnailBlur"){
  	$(".thumbnailBackgroundOverlay").css({"display": ""});
	  thumbnail.id = "thumbnailBackgroundOverlayCanvasImgSrc";
	  stackBlurImage("thumbnailBackgroundOverlayCanvasImgSrc", "thumbnailBackgroundOverlayCanvasObj", 20, 255);
	  var ctx = document.getElementById("thumbnailBackgroundOverlayCanvasObj").getContext("2d");
	  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
	  ctx.fillRect(0, 0, $(window).height(), $(window).width());
	  thumbnail.id = "";
	  $("#thumbnailBackgroundOverlayCanvasObj").css({"width": "110%", "height": "110%"});
		if(doDelete) $(thumbnail).remove();
  }else if(backgroundType === "backgroundBlur"){
  	$("#main-page").removeClass("blurOutFrames");
  	$(".thumbnailBackgroundOverlay").css({"display": "none"});
  }

  //Appear animation
  if(mouseX && mouseY){
	var fullscreenRipple = this.ui.generateNewElement("div", ["animationInRipple"], undefined, document.body, {"background-color": this.vibrantColor});
	var fullscreenRippleRect = fullscreenRipple.getBoundingClientRect();

	$(fullscreenRipple).css({
		"left": (mouseX - 25) + "px",
		"top": (mouseY - $(document.body).scrollTop() - 25) + "px"
	});

	setTimeout(function() {
		$(fullscreenRipple).css({"opacity": 1}).animate({"opacity": 0}, 100, "linear", function(){
			$(fullscreenRipple).remove();
		});
		$("#content-page").css({"opacity": 0, "display": "block"}).animate({"opacity": 1});
		$("#youtubePage").css({"display": "block"});
			
		if(backgroundType === "backgroundBlur") $("#main-page").addClass("blurInFrames");
		else $("#main-page").css({"opacity": 0});
	}, 500);
	
  }

  $("#youtubeVideoTitleLabel").get(0).textContent = videoResult.snippet.title;
  $("#youtubeVideoViewsLabel").get(0).textContent = prettifyNumber(videoResult.statistics.viewCount) + " views";
  $("#channelYoutubeVideoChipPlaceholder").empty().append(this.ui.getUserIcon(videoResult.snippet.channelId, "100%"));
  bigVideoFrame.css({"height": ($(window).height() - 200) + "px"});

  //Like/Dislike
  $("#ldshadpYoutubeVideoChipPlaceholder").empty();
  var rowVideoInfo = this.ui.generateNewElement("div", ["row"], undefined, $("#ldshadpYoutubeVideoChipPlaceholder").get(0), undefined);
  var columnLike = this.ui.generateNewElement("div", ["col", "s6"], undefined, rowVideoInfo, {"padding-right": "0px"});
  var likeChip = this.ui.generateNewElement("div", ["chip", "small", "waves-effect", "waves-dark"], undefined,
    columnLike, {"margin": "0px"});
  var likeImg = this.ui.generateNewElement("img", undefined, undefined, likeChip, {"margin-right": "0px"});
  likeImg.src = "img/like.png";
  var likesText = this.ui.generateNewElement("a", ["black-text", "truncate"], prettifyNumber(videoResult.statistics.likeCount), likeChip, undefined)

  var columnDislike = this.ui.generateNewElement("div", ["col", "s4"], undefined, rowVideoInfo, {"padding": "0px"});
  var dislikeChip = this.ui.generateNewElement("div", ["chip", "small", "waves-effect", "waves-dark"], undefined,
    columnDislike, {"margin": "0px"});
  var dislikeImg  = this.ui.generateNewElement("img", undefined, undefined, dislikeChip, {"margin-right": "0px"});
  dislikeImg.src = "img/dislike.png";
  var dislikesText = this.ui.generateNewElement("a", ["black-text", "truncate"], prettifyNumber(videoResult.statistics.dislikeCount), dislikeChip, undefined)

  var authVerify = function(){
    if(youtubeSexy.ytDataAPI.authenticated) return true;
    Materialize.toast("You need to be authenticated to perform this action!", 5000);
    youtubeSexy.ytDataAPI.requestAuth();

    return false;
  };

  var likeClick = function(){
    if(!authVerify()) return;
    youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos/rate", {
      "id": video.snippet.id,
      "rating": "like"
    }, function(result){
	    Materialize.toast("Video successfully liked.", 5000);
    });
  }

  var dislikeClick = function(){
    if(!authVerify()) return;
    youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos/rate", {
      "id": video.snippet.id,
      "rating": "dislike"
    }, function(result){
    	Materialize.toast("Video successfully disliked.", 5000);
    });
  }

  $(dislikeChip).click(dislikeClick);
  $(likeChip).click(likeClick);

  //Filling tabs
  $("#tabOverlayColumn").css({"height": ($(window).height() - 50) + "px"});
  $("#commentSection").empty();
  $("#commentAmountTitle").text("Loading...");
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

	$(".commentAmountTitle").text("Amount of comments: " + prettifyNumber(commentCount));
	var commentSectionDiv = $("#commentSection").get(0);

  var authVerify = function(doLater){
    if(youtubeSexy.ytDataAPI.authenticated) return true;
    Materialize.toast("You need to be authenticated to perform this action!", 5000);
    youtubeSexy.ytDataAPI.requestAuth(doLater);

    return false;
  };

  var ui = this.ui;

	youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/commentThreads", {
		"part": "snippet,replies",
		"videoId": videoResult.id,
		"maxResults": 50,
		"textFormat": "plainText"
	}, (result) => {
		
		for(var itemIndex in result.items){
			//Basics
			var item = result.items[itemIndex];
			var commentRow = ui.generateNewElement("div", ["row"], undefined, commentSectionDiv, {"margin-bottom": "4px"});
			var commentColumn = ui.generateNewElement("div", ["col", "s12"], undefined, commentRow, undefined);

			//Commenter JSON
			var commenterData = {
				"tag": "common"
			};
			if(videoResult.snippet.channelId === item.snippet.topLevelComment.snippet.authorChannelId.value){
				commenterData.tag = "owner";
				commenterData.color = this.vibrantColor;
			}else if(verifyFeatured(posterResult, item.snippet.topLevelComment.snippet.authorChannelId.value)) commenterData.tag = "featured";

			//Comment Author
			var commenterRow = ui.generateNewElement("div", ["row"], undefined, commentColumn, {"margin-bottom": "2px"});
			var commenterColumn = ui.generateNewElement("div", ["col", "s12"], undefined, commenterRow, undefined);
			var commenterChip = ui.getUserIcon(item.snippet.topLevelComment.snippet.authorChannelId.value, "100%", commenterData);
			commenterColumn.appendChild(commenterChip);

			//Content
			var contentRow = ui.generateNewElement("div", ["row"], undefined, commentColumn, {"margin-bottom": "2px"});
			var contentColumn = ui.generateNewElement("div", ["col", "s12"], undefined, contentRow, undefined);
			appendCommentHTML(item.snippet.topLevelComment.snippet.textDisplay, contentColumn, this.vibrantColor);

			//Like & Dislike Buttons
			var rateRow = ui.generateNewElement("div", ["row"], undefined, commentColumn, {"margin-bottom": "2px"});
			var columnLike = ui.generateNewElement("div", ["col", "s6"], undefined, rateRow, {"padding-right": "0px"});
			var likeChip = ui.generateNewElement("div", ["chip", "small", "waves-effect", "waves-dark"], undefined,
				columnLike, {"margin": "0px"});
			var likeImg = ui.generateNewElement("img", undefined, undefined, likeChip, {"margin-right": "0px"});
			likeImg.src = "img/like.png";
			var likesText = ui.generateNewElement("a", ["black-text", "truncate"], item.snippet.topLevelComment.snippet.likeCount ? 
				prettifyNumber(item.snippet.topLevelComment.snippet.likeCount) : "", likeChip, undefined)

			var columnDislike = ui.generateNewElement("div", ["col", "s4"], undefined, rateRow, {"padding": "0px"});
			var dislikeChip = ui.generateNewElement("div", ["chip", "small", "waves-effect", "waves-dark"], undefined,
				columnDislike, {"margin": "0px"});
			var dislikeImg  = ui.generateNewElement("img", undefined, undefined, dislikeChip, {"margin-right": "0px"});
			dislikeImg.src = "img/dislike.png";

			//Interactables
			var likeClick = function(){
				if(!authVerify(likeClick)) return;
				youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos/rate", {
					"id": video.snippet.id,
					"rating": "like"
				}, function(result){
					Materialize.toast("Video successfully liked.", 5000);
				});
			}

			var dislikeClick = function(){
				if(!authVerify(dislikeClick)) return;
				youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos/rate", {
					"id": video.snippet.id,
					"rating": "dislike"
				}, function(result){
					Materialize.toast("Video successfully disliked.", 5000);
				});
			}

			$(dislikeChip).click(dislikeClick);
			$(likeChip).click(likeClick);

			if(item.snippet.totalReplyCount > 0 && item.replies && item.replies.comments){
				var responsesRow = ui.generateNewElement("div", ["row"], undefined, commentColumn, {"margin-top": "5px", "margin-bottom": "5px"});
				ui.generateNewElement("a", ["white-text"], item.snippet.totalReplyCount + " replies", responsesRow, undefined);
			
				var orderedItems = item.replies.comments;

				var fullReplyArea = ui.generateNewElement("div", undefined, undefined, commentColumn, undefined);
				var areaRow = ui.generateNewElement("div", ["row"], undefined, fullReplyArea, undefined);
				var area = ui.generateNewElement("div", ["replyDisplayArea"], undefined, areaRow, undefined);
				var replierRow = ui.generateNewElement("div", ["row"], undefined, fullReplyArea, undefined);
				
				switchOnce(fullReplyArea, orderedItems, item, 0, area, videoResult, posterResult, replierRow, this.vibrantColor);
			}

			//Comment separator
			var div = ui.generateNewElement("div", ["commentSeparator"], undefined, commentSectionDiv, undefined);
		}
	});

}


function switchLogic(replyItem, area, videoResult, posterResult, replierRow, vibrantColor){

	$(area).empty();
	$(replierRow).empty();

	//Content
	var replyContentRow = youtubeSexy.ui.generateNewElement("div", ["row"], undefined, area, {"margin-bottom": "2px"});
	var replyContentColumn = youtubeSexy.ui.generateNewElement("div", ["col", "s12"], undefined, replyContentRow, undefined);
	appendCommentHTML(replyItem.snippet.textOriginal, replyContentColumn, vibrantColor);
	
	//Replier
	var replierData = {
		"tag": "common"
	};
	if(videoResult.snippet.channelId === replyItem.snippet.authorChannelId.value) replierData.tag = "owner";
	else if(verifyFeatured(posterResult, replyItem.snippet.authorChannelId.value)) replierData.tag = "featured";

	var replierColumn = youtubeSexy.ui.generateNewElement("div", ["col", "s12"], undefined, replierRow, undefined);
	var replierChip = youtubeSexy.ui.getUserIcon(replyItem.snippet.authorChannelId.value, "100%", replierData);
	replierColumn.appendChild(replierChip);

}

function switchOnce(fullReplyArea, orderedItems, item, currentIndex, area, videoResult, posterResult, replierRow, vibrantColor){

	var replyItem = orderedItems[currentIndex];

	if(currentIndex > 0){
		$(fullReplyArea).css({"opacity": 1}).animate({"opacity": 0}, 300, "linear", function(){
			switchLogic(replyItem, area, videoResult, posterResult, replierRow, vibrantColor);
			$(fullReplyArea).animate({"opacity": 1}, 300, "linear", function(){
				$(fullReplyArea).css({"opacity": ""});
			})
		});
	}else switchLogic(replyItem, area, videoResult, posterResult, replierRow, vibrantColor);

	if(item.snippet.totalReplyCount > 1){
		currentIndex ++;
		if(currentIndex >= orderedItems.length) currentIndex = 0;
		setTimeout(function(){
			switchOnce(fullReplyArea, orderedItems, item, currentIndex, area, videoResult, posterResult, replierRow, vibrantColor);
		}, 5000);
	} 

}

function appendCommentHTML(comment, master, vibrantColor){

	var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig; //Credit: http://stackoverflow.com/a/8943487
	var attachments = [];

	comment = comment.replaceAll("<", "&lt;");
	comment = comment.replaceAll(">", "&gt;");

	var boldRegex = /\*(.|\n)*?\*/ig;
	var italicRegex = /_(.|\n)*?_/ig;
	comment = comment.replace(boldRegex, function(text){return "<a class=\"white-text\" style=\"font-style: bold;\">" + text + "</a>"});
	comment = comment.replace(italicRegex, function(text){return "<a class=\"white-text\" style=\"font-style: oblique;\">" + text + "</a>"});

	comment = comment.replace(urlRegex, function(url){
		try{
			if(url.startsWith("http://www.youtube.com") || url.startsWith("https://www.youtube.com") || url.startsWith("www.youtube.com")){
				var videoLink = url.split("v=")[1];
				attachments.push(videoLink);
			}else if(url.startsWith("http://youtu.be") || url.startsWith("https://youtu.be") || url.startsWith("youtu.be")){
				var videoLink = url.split("youtu.be/")[1];
				attachments.push(videoLink);
			}
		}catch(e){}
		return "<a style=\"color: " + vibrantColor + "\" target=\"_blank\" href=\"" + url + "\">" + url + "</a>";
	});
	comment = comment.replaceAll("\n", "<br>");

	for(var attachmentIndex in attachments){

	}

	var commentAnchor = youtubeSexy.ui.generateNewElement("a", ["white-text"], undefined, master, {"word-wrap": "break-word"});
	commentAnchor.innerHTML = comment;

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
