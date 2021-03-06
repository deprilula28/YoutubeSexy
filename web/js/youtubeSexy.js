String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {

    return this.split(needle).join(replacement);

};

var youtubeSexy;

window.onload = function(){
  
  $(".button-collapse").sideNav();

  youtubeSexy = new YoutubeSexy();
  youtubeSexy.ytDataAPI.startAPILib();
  
  try{
   youtubeSexy.options.load();
  }catch(e){
  	console.log(e.stack);
  }
  
  $(".customScrollBarWrapper").css({"left": ($(window).width() - 10) + "px", "height": ($(window).height() - 85) + "px"})

  $("body").resize(function(event){
    $(".customScrollBarWrapper").css({"left": ($(window).width() - 10) + "px", "height": ($(window).height() - 85) + "px"});
  });

  $("#loadingcircle").on('appear', function(){
  	if(!youtubeSexy.loadingPage) youtubeSexy.loadNewMenuMenuPage();
  });

  $("#loadingcircle").initAppear();
  youtubeSexy.ui.loadSearchButton();

}

function YoutubeSexy(){

  this.ui = new UIManager();
  this.cookies = new Cookies();
  this.options = new OptionManager();
  this.ytDataAPI = new YTDataAPI();
  this.gl = new WebGL();
  this.video = undefined;
  this.loadingPage = true;
  this.lastPageToken = undefined;
 

  this.playing = undefined;
  this.playlist = undefined;

  this.activeChannelPage = undefined;

}

YoutubeSexy.prototype.gotoHome = function(){

  this.lastPageToken = undefined;
  $("#loadingcircle").css({"display": "block"});

  if(this.ytDataAPI.authenticated){
    this.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/activities", {
      "part": "snippet",
      "maxResults": 15,
      "home": true
    }, function(json){
      this.loadMainMenuPage(json);
      this.loadingPage = false;
    });
  }else this.ui.loadFeaturedPage();

}

YoutubeSexy.prototype.loadMainMenuPage = function(activitiesResponse){

  console.log("Creating main page contents with videoset:", activitiesResponse);

  this.lastPageToken = undefined;
  if(activitiesResponse.nextPageToken) this.lastPageToken = activitiesResponse.nextPageToken;
  else $("#loadingcircle").css({"display": "none"});

  if(this.ytDataAPI.authenticated){
    var interpreterJSON = {};

    var items = activitiesResponse.items;
    var itemIDs = [];
    var itemIdInputString = "";
    var first = true;

    for(var itemIndex in items){
      var item = items[itemIndex];

      if(first) first = false;
      else itemIdInputString = itemIdInputString + ",";

      itemIdInputString = itemIdInputString + item.id;
    }

    youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos", {
      "part": "snippet,statistics",
      "id": itemIdInputString
    }, function(result){
      for(var itemIndex in result.items){
        var item = result.items[itemIndex];
        var channelTitle = item.snippet.channelTitle;

        if(!interpreterJSON.hasOwnProperty(channelTitle)) interpreterJSON[channelTitle] = [];
        interpreterJSON[channelTitle].push(item);
      }

      jQuery.each(interpreterJSON, function(title, itemList){
        for(var itemIndex in itemList){
          var item = itemList[itemIndex];

        }
        youtubeSexy.ui.createVideoListDIV(title, itemList);
      });
    });

  }else{
    var rowVideos = document.createElement("div");
    $(rowVideos).addClass("row");
    document.getElementById("main-page").appendChild(rowVideos);

    var delay = 0.0;
    var items = activitiesResponse.items;
    for(var itemIndex in items){
      var item = items[itemIndex];
      rowVideos.appendChild(this.ui.createFullVideoDIV(item, false, undefined, delay));
      delay += 0.05;
    }

    return delay;
  }

}

var navShown = false;

$(window).scroll(function(event){
  
  if(channelPreview) youtubeSexy.hideChannelPreviews();

  var scrollTop = $(window).scrollTop();
  if(scrollTop > 168 && !navShown){
    navShown = true;
    $("nav").clearQueue().stop().css({"box-shadow": ""}).animate({"background-color": "#d40000"});
    $(".top-text").text("Home");
  }else if(scrollTop <= 168 && navShown){
    navShown = false;
    $("nav").clearQueue().stop().css({"box-shadow": "0px 0px 0px 0px rgba(0,0,0,0)"}).animate({"background-color": "rgba(212, 0, 0, 0)"});
    $(".top-text").text("");
  }

});

$(window).resize(function(event){

  $("#tabOverlayColumn").css({"height": ($(window).height() - 50) + "px"});
  $("#bigVideoIFrameContainer").css({"height": ($(window).height() - 200) + "px"});
  
});

YoutubeSexy.prototype.hideChannelPreviews = function (){

  if(channelPreview){
    var prev = $(channelPreview);
    $(channelPreview).animate({"opacity": 0}, 100, "linear", function(){
      prev.remove();
    });
    channelPreview = undefined;
    channelPreviewElement = undefined;
  }

}

var channelPreview = undefined;
var channelPreviewElement = undefined;

YoutubeSexy.prototype.showChannelPreview = function(results, element){

  if(channelPreview){
    var prev = $(channelPreview);
    $(channelPreview).animate({"opacity": 0}, 100, "linear", function(){
      prev.remove();
    });
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
  var appersOnTop = false;

  if(x < 0) x = 0;
  if(x + 300 > $(window).width()) x = $(window).width() - 300;

  if(y > $(window).height() / 2){
    y = y - 440;
    appersOnTop = true;
  }

  var baseCSS = {"left": x + "px", "top": y + "px", "width": sizeX + "px"};
  var animationCSS = {};
  if(appersOnTop){
    baseCSS.height = "0px";
    baseCSS.top = (y + 400) + "px";
    animationCSS.top = y + "px";
    animationCSS.height = "400px";
  }else{
    baseCSS.height = "0px";
    animationCSS.height = "400px";
  }; 

  var div = this.ui.generateNewElement("div", ["card", "z-depth-5", "channelPreviewPopup"], undefined, document.body,
    baseCSS);
  $(div).animate(animationCSS, 150, "linear");

  var bannerDIV = this.ui.generateNewElement("div", undefined, undefined, div, {"height": "99.05px", "max-height": "99.05px", "min-height": "99.05px"})

  if(results.brandingSettings.image){
    var banner = this.ui.generateNewElement("img", ["channelBanner"], undefined, bannerDIV, {"width": "200%"});
    banner.src = results.brandingSettings.image.bannerImageUrl;
  }

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

var handleLeave = undefined;

YoutubeSexy.prototype.showChannelPage = function(channelId, mouseX, mouseY){

  $("#main-page").removeClass("blurInFrames").removeClass("blurOutFrames");
  
  youtubeSexy.hideChannelPreviews();
  console.log("Loading channel page for channel ID: " + channelId);
  
  var backgroundType = this.options.backgroundType;
  if(backgroundType === "backgroundBlur") $("#main-page").addClass("blurInFrames");
  
  $("body").css({"overflow": "hidden"});
  $("#content-page").empty();
  $(".top-text").get(0).textContent = "Loading...";

  handleLeave = function(onDone){
    window.clearInterval(this.activeChannelPage.pollTimer);
    $(".top-text").get(0).textContent = "Home";
    this.activeChannelPage.unload();
    this.activeChannelPage = undefined;
    if(backgroundType === "backgroundBlur") $("#main-page").removeClass("blurInFrames").addClass("blurOutFrames");
    $("#content-page").animate({"opacity": 0});
    $("body").css({"overflow": ""});
    $("nav").css({"height": "64px"}).animate({"background-color": "#d40000"}, 100, "linear",function(){
      $("nav").css({"background-color": "#d40000"});
    });

    setTimeout(function(){
      if(backgroundType === "backgroundBlur") $("#main-page").removeClass("blurOutFrames");
      var $contentPage = $("#content-page");
      $contentPage.css({"display": "none", "opacity": 1}).empty();
      if(backgroundType === "backgroundBlur") $contentPage.removeClass("blurInFrames");
      
      onDone();
    }, 500);
  };

  youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/channels", {
    "part": "snippet,brandingSettings,statistics",
    "id": channelId
  }, function(result){
    for(var channelIndex in result.items){
      var channel = result.items[channelIndex];
      $("#content-page").css({"display": ""});
      this.activeChannelPage = new YoutubeChannelPage(channelId, channel, mouseX, mouseY);
      return;
    }

    alert("Invalid channel. Maybe it got deleted?");
    console.log("Invalid channel. Maybe it got deleted?");
  });

}

YoutubeSexy.prototype.loadNewMenuMenuPage = function(){

  this.loadingPage = true;

  if(this.ytDataAPI.authenticated){
    this.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/activities", {
      "part": "snippet",
      "maxResults": 25,
      "home": true,
      "pageToken": this.lastPageToken
    }, function(json){
      youtubeSexy.loadMainMenuPage(json);
      youtubeSexy.loadingPage = false;
    });
  }else{
    this.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos", {
      "part": "snippet,statistics",
      "chart": "mostPopular",
      "maxResults": 25,
      "pageToken": this.lastPageToken
    }, (json) => {
      youtubeSexy.loadMainMenuPage(json);
      youtubeSexy.loadingPage = false;
    });
  }

}

$.fn.blurBackground = function(backgroundElementQuery){

  var backgroundElement = $(backgroundElementQuery).get(0);

  return this.each(function(){
      var $element = $(this);
      $element.css({"overflow": "hidden"});

      var backElClone = backgroundElement.cloneNode(true);			
      this.appendChild(backElClone);
      $(backElClone).css({"filter": "blur(3px)", "pointer-events": "none"});
  });

}
