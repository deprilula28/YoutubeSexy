UIManager.prototype.getUserIcon = function(channelId){

  var chip = this.generateNewElement("div", ["chip"], undefined, undefined, undefined);
  var img = this.generateNewElement("img", undefined, undefined, chip, undefined);
  var textNode = this.generateNewElement("a", ["black-text", "truncate"], "Loading...", chip, undefined);

  youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/channels", {
    "part": "snippet",
    "id": channelId
  }, (result) => {
    for(var channelIndex in result.items){
      var channel = result.items[channelIndex];

      textNode.textContent = channel.snippet.title;
      img.src = channel.snippet.thumbnails.high.url;
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

  var img = this.generateNewElement("img", undefined, undefined, column, {"width": "214px", "height": "120px"});
  img.src = video.snippet.thumbnails.high.url;
  img.onClick = (event) => {
    playVideo(video);
  };

  var rowVideoName = this.generateNewElement("div", ["row"], undefined, column, {"margin-bottom": "0px"});
  var columnVideoName = this.generateNewElement("div", ["col", "s12"], undefined, rowVideoName, undefined);
  var videoNameTextComp = this.generateNewElement("a", ["videoNameTextComponent", "truncate", this.darkThemed ? "white-text"
    : "black-text"], "Loading...", columnVideoName, undefined);

  //Video Info
  var rowVideoInfo = this.generateNewElement("div", ["row"], undefined, column, undefined);

  //Views
  var columnViews = this.generateNewElement("div", ["col", "s4"], undefined, rowVideoInfo, undefined);
  var viewsTextComp = this.generateNewElement("a", ["videoNameTextComponent", "truncate", this.darkThemed ? "white-text"
  : "black-text"], "Loading...", columnViews, {"font-size": "10px"});

  var rowUserIcon = this.generateNewElement("div", ["row"], undefined, column, undefined);
  var columnUserIcon = this.generateNewElement("div", ["col", "s12"], undefined, rowUserIcon, undefined);

  var userIcon = this.getUserIcon(video.snippet.channelId);
  columnUserIcon.appendChild(userIcon);

  youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos", {
    "part": "snippet,statistics",
    "id": video.id
  }, (result) => {
    for(var videoIndex in result.items){
      var vid = result.items[videoIndex];

      videoNameTextComp.textContent = vid.snippet.title;

      var viewCount = vid.statistics.viewCount;
      var viewCountString = viewCount + "";
      if(viewCount > 1000 && viewCount < 999999) viewCountString = Math.round(viewCount / 1000) + "K";
      else if(viewCount > 1000000 && viewCount < 999999999) viewCountString = Math.round(viewCount / 1000000) + "M";
      else if(viewCount > 1000000000) viewCountString = Math.round(viewCount / 1000000000) + "Bil";

      viewsTextComp.textContent = viewCountString + " views";
      return;
    }

    videoNameTextComp.textContent = "Invalid video.";
    videoNameTextComp.textContent = "Invalid video.";
  });

  return column;

}
