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
  this.maxScroll = 0;
  this.loadingPage = true;
  this.lastPageToken = undefined;

}

YoutubeSexy.prototype.gotoHome = function(){



}

YoutubeSexy.prototype.loadMainMenuPage = function(activitiesResponse){

  console.log("Creating main page contents with videoset:");
  console.log(activitiesResponse);

  this.lastPageToken = undefined;
  if(activitiesResponse.nextPageToken) this.lastPageToken = activitiesResponse.nextPageToken;

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
    var rowVideos = document.createElement("div");
    $(rowVideos).addClass("row");
    document.getElementById("main-page").appendChild(rowVideos);

    var items = activitiesResponse.items;
    for(var itemIndex in items){
      var item = items[itemIndex];
      rowVideos.appendChild(this.ui.createFullVideoDIV(item));
    }
  }

}

window.onscroll = (event) => {

  if(channelPreview){
    var $element = $(channelPreviewElement);
    var offset = $element.offset();
    var width = $element.width();
    var height = $element.height();

    var elementCenterX = offset.left + width / 2;

    var sizeX = 300;
    var x = elementCenterX- sizeX / 2;
    var y = (channelPreviewElement.getBoundingClientRect().top + 25);

    $(channelPreview).css({"top": y, "left": x})
    $("#channelPreviewUserIMG").css({"left": (x + 118) + "px", "top": (y + 75) + "px"})
  }

  if($(document).scrollTop() >= youtubeSexy.maxScroll && !youtubeSexy.loadingPage && youtubeSexy.lastPageToken){
    youtubeSexy.loadNewMenuMenuPage();
  }

}

YoutubeSexy.prototype.playVideo = function(videoId){



}

YoutubeSexy.prototype.hideChannelPreviews = function (){

  if(channelPreview){
    console.log("Unloading channel preview.");
    $(channelPreview).remove();
    channelPreview = undefined;
    channelPreviewElement = undefined;
  }

}

var channelPreview = undefined;
var channelPreviewElement = undefined;

YoutubeSexy.prototype.showChannelPreview = function(results, element){

  console.log("Showing channel preview.");
  if(channelPreview){
    $(channelPreview).remove();
    channelPreview = undefined;
    channelPreviewElement = undefined;
  }

  var $element = $(element);
  var offset = $element.offset();
  var width = $element.width();
  var height = $element.height();

  var elementCenterX = offset.left + width / 2;

  var sizeX = 300;
  var x = elementCenterX- sizeX / 2;
  var y = (element.getBoundingClientRect().top + 25);

  var baseCSS = {"z-index": "9999", "position": "fixed", "left": x + "px", "top": y + "px", "width": sizeX + "px",
    "height": "400px", "overflow": "hidden"};

  var div = this.ui.generateNewElement("div", ["card", "z-depth-5"], undefined, document.body, baseCSS);

  var banner = this.ui.generateNewElement("img", ["channelBanner"], undefined, div, {"width": "200%"});
  banner.src = results.brandingSettings.image.bannerImageUrl;

  var userImg = this.ui.generateNewElement("img", ["circular", "z-depth-4"], undefined, div,
    {"z-index": "10000", "position": "fixed", "width": "64px", "height": "64px", "left": (x + 118) + "px", "top":
    (y + 75) + "px"});
  userImg.id = "channelPreviewUserIMG";
  userImg.src = results.snippet.thumbnails.high.url;

  var usernameRow = this.ui.generateNewElement("div", ["row"], undefined, div, undefined);
  var userNameColumn = this.ui.generateNewElement("div", ["col", "s12"], undefined, usernameRow, undefined);
  var userName = this.ui.generateNewElement("a", ["black-text", "truncate", "center-align"], results.snippet.title,
    userNameColumn, {"margin-top": "30px"});

  var subscribersRow = this.ui.generateNewElement("div", ["row"], undefined, div, {"margin-bottom": "5px"});
  var subscribersColumn = this.ui.generateNewElement("div", ["col", "s12"], undefined, subscribersRow, undefined);
  var subscribersImage = this.ui.generateNewElement("img", undefined, undefined, subscribersColumn,
    {"width": "12px", "height": "auto", "display": "inline", "margin-right": "10px"});
  subscribersImage.src = "img/yt.png";

  var subscribersLine = this.ui.generateNewElement("a", ["black-text", "truncate"],
    simplifyNumber(results.statistics.subscriberCount) + " subs", subscribersColumn, {"display": "inline"});

  var descriptionRow = this.ui.generateNewElement("div", ["row"], undefined, div, undefined);
  var descriptionColumn = this.ui.generateNewElement("div", ["col", "s12"], undefined, descriptionRow, undefined);
  var description = this.ui.generateNewElement("a", ["black-text"], results.snippet.description, descriptionColumn,
    {"word-wrap": "break-word", "font-size": "12px"});

  channelPreview = div;
  channelPreviewElement = element;

}

YoutubeSexy.prototype.showChannelPage = function(channelId){



}

YoutubeSexy.prototype.loadNewMenuMenuPage = function(){

  this.loadingPage = true;

  if(this.ytDataAPI.authenticated){
    this.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/activities", {
      "part": "snippet",
      "maxResults": 50,
      "home": true,
      "pageToken": this.lastPageToken
    }, (json) => {
      this.loadMainMenuPage(json);
      this.loadingPage = false;
    });
  }else{
    this.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos", {
      "part": "snippet",
      "chart": "mostPopular",
      "maxResults": 50,
      "pageToken": this.lastPageToken
    }, (json) => {
      this.loadMainMenuPage(json);
      this.loadingPage = false;
    });
  }

}
