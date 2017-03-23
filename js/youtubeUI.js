UIManager.prototype.loadFeaturedPage = function(){

  youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos", {
    "part": "snippet,statistics",
    "chart": "mostPopular",
    "maxResults": 25
  }, (json) => {
    var div = document.createElement("div");
    document.getElementById("main-page").appendChild(div);

    var rowTitle = document.createElement("div");
    $(rowTitle).addClass("row");
    $(rowTitle).css({"margin-bottom": "0px"});
    div.appendChild(rowTitle);

    var columnTitle = document.createElement("div");
    $(columnTitle).addClass("col").addClass("s12");
    rowTitle.appendChild(columnTitle);

    var h4 = document.createElement("h4");
    $(h4).addClass("videoNameTextComponent").addClass(youtubeSexy.ui.darkThemed ? "white-text" : "black-text");
    $(h4).css({"margin-bottom": "0px"});
    h4.textContent = "Trending Videos";
    columnTitle.appendChild(h4);

    var a = document.createElement("a");
    $(a).addClass("videoNameTextComponent").addClass(youtubeSexy.ui.darkThemed ? "white-text" : "black-text");
    a.textContent = "Authenticate to view videos recommended for you.";
    div.appendChild(a);

    youtubeSexy.loadMainMenuPage(json);
    youtubeSexy.loadingPage = false;
  });

}

UIManager.prototype.getUserIcon = function(channelId, widthShow, commenterData){

  var chip = this.generateNewElement("div", ["chip", "waves-effect"], undefined, undefined, undefined);
  var img = this.generateNewElement("img", undefined, undefined, chip, {"margin-right": "0px"});

  var row = this.generateNewElement("div", ["row"], undefined, chip, widthShow ? {"width": widthShow, "max-width": widthShow}
    : undefined);

  //Channel Name
  var columnName = this.generateNewElement("div", ["col", "s6"], undefined, row, undefined);
  var textNodeName = this.generateNewElement("a", ["black-text", "truncate"], "Loading...", columnName, {"padding-left":
    "2px", "padding-right": "0px"});

  //Channel Subscription
  var columnSubs = this.generateNewElement("div", ["col", "s4"], undefined, row, undefined);
  var textNodeSubs = this.generateNewElement("a", ["black-text", "truncate"], "Loading...", columnSubs, undefined);

  youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/channels", {
    "part": "snippet,brandingSettings,statistics",
    "id": channelId
  }, (result) => {
    for(var channelIndex in result.items){
      var channel = result.items[channelIndex];

      textNodeName.textContent = channel.snippet.title;
      textNodeSubs.textContent = simplifyNumber(channel.statistics.subscriberCount);
      img.src = channel.snippet.thumbnails.high.url;

      $(chip).hover((event) => {
        youtubeSexy.showChannelPreview(channel, chip);
      }, (event) => {
        youtubeSexy.hideChannelPreviews();
      });

      chip.onclick = (event) => {
        youtubeSexy.showChannelPage(channelId);
      };
      return;
    }
  });

  if(commenterData){
  	var tag = commenterData.tag;

  	if(tag === "owner") $(chip).css({"background-color": "#00C0AD"});
  	else if(tag === "featured") $(chip).css({"background-color": "#EC4646"});
  }

  return chip;

}

UIManager.prototype.createVideoListDIV = function(title, items){

  var curi = 0;
  var mainPage = document.getElementById("main-page");
  var div = document.createElement("div");
  mainPage.appendChild(div);

  $(div).addClass("mainPageSection");

  var rowTitle = document.createElement("div");
  $(rowTitle).addClass("row");
  $(rowTitle).css({"margin-bottom": "0px"});
  div.appendChild(rowTitle);

  var columnTitle = document.createElement("div");
  $(columnTitle).addClass("col").addClass("s12");
  rowTitle.appendChild(columnTitle);

  var h4 = document.createElement("h4");
  $(h4).addClass("videoNameTextComponent").addClass(this.darkThemed ? "white-text" : "black-text");
  $(h4).css({"margin-bottom": "0px"});
  h4.textContent = title;
  columnTitle.appendChild(h4);

  var rowVideos = document.createElement("div");
  $(rowVideos).addClass("row");
  div.appendChild(rowVideos);

  for(var itemIndex in items){
    var item = items[itemIndex];

    if(curi > 6){
        //TODO add thingy
        break;
    }

    rowVideos.appendChild(this.createFullVideoDIV(item));

    curi ++;
  }

}

UIManager.prototype.createFullVideoDIV = function(video, doNotPutChannelChip, channelResult){

  var column = this.generateNewElement("div", ["col", "s12", "m6", "l4"], undefined, undefined, {"height": "240px", "max-height": "240px", "width": "214px", "max-width": "214px", "overflow": "none",
    "margin-right": "20px"});

  var imgDiv = this.generateNewElement("div", undefined, undefined, column, {"width": "214px", "height": "120px"});
  var img = this.generateNewElement("img", ["center-align"], undefined, imgDiv,
    {"width": "100%", "height": "100%", "cursor": "pointer"});

  var rowVideoName = this.generateNewElement("div", ["row"], undefined, column, {"margin-bottom": "0px"});
  var columnVideoName = this.generateNewElement("div", ["col", "s12"], undefined, rowVideoName, undefined);
  var videoNameTextComp = this.generateNewElement("a", ["videoNameTextComponent", "truncate", this.darkThemed ? "white-text"
    : "black-text"], "Loading...", columnVideoName, undefined);

  //Views
  var rowVideoViews = this.generateNewElement("div", ["row"], undefined, column, {"margin-bottom": "0px"});
  var columnViews = this.generateNewElement("div", ["col", "s6"], undefined, rowVideoViews, {"padding-right": "0px"});
  var viewsTextComp = this.generateNewElement("a", ["videoNameTextComponent", "truncate", this.darkThemed ? "white-text"
  : "black-text"], "Loading...", columnViews, {"font-size": "10px"});

  //Like/Dislike
  var rowVideoInfo = this.generateNewElement("div", ["row"], undefined, column, {"margin-bottom": "10px"});
  var columnLike = this.generateNewElement("div", ["col", "s6"], undefined, rowVideoInfo, {"padding-right": "0px"});
  var likeChip = this.generateNewElement("div", ["chip", "small", "waves-effect", "waves-dark"], undefined,
    columnLike, {"margin": "0px"});
  var likeImg = this.generateNewElement("img", undefined, undefined, likeChip, {"margin-right": "0px"});
  likeImg.src = "img/like.png";
  var likesText = this.generateNewElement("a", ["black-text", "truncate"], "0", likeChip, undefined)

  var columnDislike = this.generateNewElement("div", ["col", "s4"], undefined, rowVideoInfo, {"padding": "0px"});
  var dislikeChip = this.generateNewElement("div", ["chip", "small", "waves-effect", "waves-dark"], undefined,
    columnDislike, {"margin": "0px"});
  var dislikeImg  = this.generateNewElement("img", undefined, undefined, dislikeChip, {"margin-right": "0px"});
  dislikeImg.src = "img/dislike.png";
  var dislikesText = this.generateNewElement("a", ["black-text", "truncate"], "0", dislikeChip, undefined)

  //User Icon
  var rowUserIcon = this.generateNewElement("div", ["row"], undefined, column, {"margin-bottom": "20px"});
  var columnUserIcon = this.generateNewElement("div", ["col", "s12"], undefined, rowUserIcon, undefined);

  if(!doNotPutChannelChip){
    var userIcon = this.getUserIcon(video.snippet.channelId, "214px");
    columnUserIcon.appendChild(userIcon);
  }

  img.crossOrigin = "Anonymous";
  img.src = "https://crossorigin.me/" + video.snippet.thumbnails.high.url;

  videoNameTextComp.textContent = video.snippet.title;

  viewsTextComp.textContent = simplifyNumber(video.statistics.viewCount) + " views";
  if(video.statistics.likeCount) likesText.textContent = simplifyNumber(video.statistics.likeCount);
  else likesText.textContent = "";
  if(video.statistics.dislikeCount) dislikesText.textContent = simplifyNumber(video.statistics.dislikeCount);
  else dislikesText.textContent = "";

  var finalVidClick = (e, doDelete) => {
    if(channelResult) youtubeSexy.playVideo(video, channelResult, e.pageX, e.pageY, img);
  	else{
      youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/channels", {
      	"part": "brandingSettings",
      	"id": video.snippet.channelId
      }, (result) => {
      	for(var itemIndex in result.items){
      		var item = result.items[itemIndex];
        	youtubeSexy.playVideo(video, item, e.pageX, e.pageY, img, doDelete);

      		break;
      	}
      });
  	}
  }

  var vidClick = (e) => {

    if(handleLeave){
      $(".content").get(0).appendChild(img);
      $(img).css({"display": "none"});

      handleLeave(() => {
        finalVidClick(e, true);
      });
      handleLeave = undefined;
    }else finalVidClick(e, false);
  	
  }

  $(imgDiv).click(vidClick);
  $(videoNameTextComp).click(vidClick);

  var authVerify = () => {
    if(youtubeSexy.ytDataAPI.authenticated) return true;
    Materialize.toast("You need to be authenticated to perform this action!", 5000);
    youtubeSexy.ytDataAPI.requestAuth();

    return false;
  };

  var likeClick = () => {
    if(!authVerify()) return;
    youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos/rate", {
      "id": video.snippet.id,
      "rating": "like"
    }, (result) => {
	    Materialize.toast("Video successfully liked.", 5000);
    });
  }

  var dislikeClick = () => {
    if(!authVerify()) return;
    youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos/rate", {
      "id": video.snippet.id,
      "rating": "dislike"
    }, (result) => {
    	Materialize.toast("Video successfully disliked.", 5000);
    });
  }
	
  $(dislikeChip).click(dislikeClick);
  $(likeChip).click(likeClick);

  return column;

}