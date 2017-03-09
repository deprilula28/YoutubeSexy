String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {

    return this.split(needle).join(replacement);

};

var youtubeSexy;

window.onload = () => {
  $(".button-collapse").sideNav();

  youtubeSexy = new YoutubeSexy();
  youtubeSexy.ytDataAPI.startAPILib();
}

function YoutubeSexy(){

  this.ui = new UIManager();
  this.ytDataAPI = new YTDataAPI();
  this.video = undefined;

}

YoutubeSexy.prototype.gotoHome = function(){



}

YoutubeSexy.prototype.loadMainMenuPage = function(activitiesResponse){

  console.log("Creating main page contents with videoset:");
  console.log(activitiesResponse);

  if(this.ytDataAPI.authenticated){
    var interpreterJSON = {};

    var items = activitiesResponse.items;
    for(var itemIndex in items){
      var item = items[itemIndex];
      var channelTitle = item.snippet.channelTitle;

      if(!interpreterJSON.hasOwnProperty(channelTitle)) interpreterJSON[channelTitle] = [];
      interpreterJSON[channelTitle].push(item);
    }

    jQuery.each(interpreterJSON, (title, itemList) => {
      this.ui.createVideoListDIV(title, itemList);
    });
  }else{
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
    $(h4).addClass("videoNameTextComponent").addClass(this.ui.darkThemed ? "white-text" : "black-text");
    $(h4).css({"margin-bottom": "0px"});
    h4.textContent = "Trending Videos";
    columnTitle.appendChild(h4);

    var a = document.createElement("a");
    $(a).addClass("videoNameTextComponent").addClass(this.ui.darkThemed ? "white-text" : "black-text");
    a.textContent = "Authenticate to view videos recommended for you.";
    div.appendChild(a);

    var rowVideos = document.createElement("div");
    $(rowVideos).addClass("row");
    div.appendChild(rowVideos);

    var items = activitiesResponse.items;
    for(var itemIndex in items){
      var item = items[itemIndex];
      rowVideos.appendChild(this.ui.createFullVideoDIV(item));
    }
  }

}

YoutubeSexy.prototype.playVideo = function(videoId){



}

YoutubeSexy.prototype.showChannelPreview = function(channelId){



}

YoutubeSexy.prototype.showChannelPage = function(channelId){



}

YoutubeSexy.prototype.loadNewMenuMenuPage = function(){

  if(this.ytDataAPI.authenticated){
    this.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/activities", {
      "part": "snippet",
      "maxResults": 50,
      "home": true,
      "pageToken": "nextPageToken"
    }, (json) => this.loadMainMenuPage(json));
  }else{
    this.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos", {
      "part": "snippet",
      "chart": "mostPopular",
      "maxResults": 50,
      "pageToken": "nextPageToken"
    }, (json) => this.loadMainMenuPage(json))
  }

}
