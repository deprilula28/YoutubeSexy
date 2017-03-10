UIManager.prototype.getUserIcon = function(channelId, widthShow){

  var chip = this.generateNewElement("div", ["chip", "waves-effect"], undefined, undefined, undefined);
  chip.onClick = () => {
    youtubeSexy.showChannelPage(channelId);
  };
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

      chip.onmouseover = () => {
        youtubeSexy.showChannelPreview(channel, chip);
      };
      chip.onmouseout = () => {
        youtubeSexy.hideChannelPreviews();
      }
      return;
    }

    textNode.textContent = "Invalid channel.";
  });

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

UIManager.prototype.createFullVideoDIV = function(video){

  var column = this.generateNewElement("div", ["col", "s6", "l3"], undefined, undefined, {"height": "240px", "max-height": "240px", "width": "214px", "max-width": "214px", "overflow": "none",
    "margin-right": "20px"});

  var imgDiv = this.generateNewElement("div", ["waves-effect", "waves-light"], undefined, column, {"width": "214px", "height": "120px"});
  var img = this.generateNewElement("img", ["waves-effect", "waves-light", "center-align"], undefined, imgDiv,
    {"width": "100%", "height": "100%"});
  img.src = video.snippet.thumbnails.high.url;
  img.onClick = (event) => {
    youtubeSexy.playVideo(video);
  };

  var rowVideoName = this.generateNewElement("div", ["row"], undefined, column, {"margin-bottom": "0px"});
  var columnVideoName = this.generateNewElement("div", ["col", "s12"], undefined, rowVideoName, undefined);
  var videoNameTextComp = this.generateNewElement("a", ["videoNameTextComponent", "truncate", this.darkThemed ? "white-text"
    : "black-text"], "Loading...", columnVideoName, undefined);
  videoNameTextComp.onclick = (event) => {
    youtubeSexy.playVideo(video);
  };

  //Views
  var rowVideoViews = this.generateNewElement("div", ["row"], undefined, column, {"margin-bottom": "0px"});
  var columnViews = this.generateNewElement("div", ["col", "s6"], undefined, rowVideoViews, {"padding-right": "0px"});
  var viewsTextComp = this.generateNewElement("a", ["videoNameTextComponent", "truncate", this.darkThemed ? "white-text"
  : "black-text"], "Loading...", columnViews, {"font-size": "10px"});

  //Like/Dislike
  var rowVideoInfo = this.generateNewElement("div", ["row"], undefined, column, {"margin-bottom": "10px"});
  var columnLike = this.generateNewElement("div", ["col", "s6"], undefined, rowVideoInfo, {"padding-right": "0px"});
  var likeChip = this.generateNewElement("div", ["chip", "small", "waves-effect", "waves-teal"], undefined,
    columnLike, {"margin": "0px"});
  var likeImg = this.generateNewElement("img", undefined, undefined, likeChip, {"margin-right": "0px"});
  likeImg.src = "img/like.png";
  var likesText = this.generateNewElement("a", ["black-text", "truncate"], "0", likeChip, undefined)

  var columnDislike = this.generateNewElement("div", ["col", "s4"], undefined, rowVideoInfo, {"padding": "0px"});
  var dislikeChip = this.generateNewElement("div", ["chip", "small", "waves-effect", "waves-red"], undefined,
    columnDislike, {"margin": "0px"});
  var dislikeImg = this.generateNewElement("img", undefined, undefined, dislikeChip, {"margin-right": "0px"});
  dislikeImg.src = "img/dislike.png";
  var dislikesText = this.generateNewElement("a", ["black-text", "truncate"], "0", dislikeChip, undefined)

  //User Icon
  var rowUserIcon = this.generateNewElement("div", ["row"], undefined, column, {"margin-bottom": "20px"});
  var columnUserIcon = this.generateNewElement("div", ["col", "s12"], undefined, rowUserIcon, undefined);

  var userIcon = this.getUserIcon(video.snippet.channelId, "214px");
  columnUserIcon.appendChild(userIcon);

  youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos", {
    "part": "snippet,statistics",
    "id": video.id
  }, (result) => {
    for(var videoIndex in result.items){
      var vid = result.items[videoIndex];

      videoNameTextComp.textContent = vid.snippet.title;

      viewsTextComp.textContent = simplifyNumber(vid.statistics.viewCount) + " views";
      if(vid.statistics.likeCount) likesText.textContent = simplifyNumber(vid.statistics.likeCount);
      else likesText.textContent = "";
      if(vid.statistics.dislikeCount) dislikesText.textContent = simplifyNumber(vid.statistics.dislikeCount);
      else dislikesText.textContent = "";
      return;
    }

    videoNameTextComp.textContent = "Invalid video.";
    videoNameTextComp.textContent = "Invalid video.";
  });

  return column;

}
