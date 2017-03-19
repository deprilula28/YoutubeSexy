function YoutubeChannelPage(channelId, response){

  this.channelId = channelId;
  this.response = response;
  this.vibrantColor = "#000000";

  this.banner = undefined;
  this.fixed = false;
  this.tabs = undefined;
  this.maxScroll = 0;
  this.loadingPage = true;

  this.createChannelPage();

  $(".channelPageWrapper").get(0).onscroll = (event) => {
    if(youtubeSexy.activeChannelPage){
      var scroll = $(".channelPageWrapper").scrollTop();

      if(this.preloader && !this.loadingPage && scroll + $(window).height() >= this.preloader.getBoundingClientRect().top){
        console.log("Loading new page");
        this.loadingPage = true;
        this.loadVideoPage();
      }

      var tabs = this.tabs;

      if(scroll > 260 && this.fixed) return;
      else if(scroll <= 260 && this.fixed){
      	$("")
        // Unfixing
      	$(".top-text").get(0).textContent = "";
      	
        $(this.filler).css({"display": "none"});
        $(this.tabs).css({"margin-top": "80px", "width": ""});
        this.tabsColumn.appendChild(this.tabs);
        this.fixed = false;
      	this.callSubUpdate(this.response);
        this.setupPollTimer(this.response);
      }

      var banner = this.banner;
      var bannerColumn = banner.parentNode;
      var bannerRow = bannerColumn.parentNode;

      var img = this.userImg;
      var name = this.userNameA;
      var subscribers = this.userSubscriberCountA;
      var informationDiv = this.informationDiv;

      var progress = scroll / 260.0;
      if(progress > 1) progress = 1;

      if(scroll > 260 && !this.fixed){
        // Fixing
      	$(".top-text").get(0).textContent = this.response.snippet.title;
        
        $(img).css({"width": "64px", "height": "64px", "opacity": 0, "top": "65px"});
        $(name).css({"top": "32px", "left": "150px"});
        $(subscribers).css({"top": "47px"});
        $(this.filler).css({"display": "block"});
        this.tabsNavWrapperColumn.appendChild(this.tabs);
        $(this.tabs).css({"margin-top": "0px", "width": "100%"});
        this.fixed = true;
        window.clearInterval(this.pollTimer);
      }

      $(img).css({"width": ((-progress + 1) * 64.0 + 64.0) + "px", "height": ((-progress + 1) * 64.0 + 64.0) + "px", "opacity":
        -progress + 1, "top": lerp(160.0, 0, progress)});
      $(name).css({"top": lerp(275, 32, progress) + "px"});
      $(subscribers).css({"top": lerp(300, 57, progress) + "px"});
    }
  };

}

YoutubeChannelPage.prototype.unload = function(){

  $(this.tabsNavWrapperRow).remove();

}

YoutubeChannelPage.prototype.createChannelPage = function(){

  var uiMan = youtubeSexy.ui;
  var chnl = this.response;

  $(".top-text").get(0).textContent = "";
  
  var contentPage = document.getElementById("content-page");
  $(div).css({"width": "100%", "height": "100%"});

  var div = uiMan.generateNewElement("div", ["channelPageWrapper"], undefined, contentPage, undefined);

  var bannerRow = uiMan.generateNewElement("div", ["row"], undefined, div, {"margin-bottom": "0px"});
  var bannerColumn = uiMan.generateNewElement("div", ["col", "s12"], undefined, bannerRow, {"padding": "0px", "height": "200px"});
  var banner = uiMan.generateNewElement("img", ["channelViewBanner"], undefined, bannerColumn, {"width": "100%", "height": "200px"});
  banner.crossOrigin = "Anonymous";
  banner.src = chnl.brandingSettings.image.bannerImageUrl;
  banner.addEventListener("load", () => {
    var vibrant = new Vibrant(banner);
    var swatches = vibrant.swatches();
    this.vibrantColor = swatches.DarkVibrant.getHex();

    $("nav").animate({"background-color": this.vibrantColor});
    $(".vibrantColored").animate({"background-color": this.vibrantColor})
  });

  this.banner = banner;

  var informationRow = uiMan.generateNewElement("div", ["row"], undefined, div, undefined);
  var informationColumn = uiMan.generateNewElement("div", ["col", "s12"], undefined, informationRow, {"padding": "0px"});
  var informationDiv = uiMan.generateNewElement("div", ["vibrantColored"], undefined, informationColumn, {"width": "100%",
    "height": "128px"});

  var userImg = uiMan.generateNewElement("img", ["circular", "z-depth-5"], undefined, div,
    {"z-index": "999", "position": "fixed", "width": "128px", "height": "128px", "left": "10px", "top":
    "160px"});
  userImg.src = chnl.snippet.thumbnails.high.url;
  this.userImg = userImg;

  var userName = uiMan.generateNewElement("a", ["white-text", "truncate"], chnl.snippet.title,
    div, {"font-size": "24px", "position": "fixed", "z-index": "15000", "left": "150px", "top": "275px"});

  var userSubscriberCount = uiMan.generateNewElement("a", ["white-text", "truncate"], prettifyNumber(chnl.statistics.subscriberCount) + " subscribers",
    div, {"left": "150px", "font-size": "24px", "position": "fixed", "z-index": "15000", "top": "300px"});

  this.userNameA = userName;
  this.userSubscriberCountA = userSubscriberCount;
  
  var container = uiMan.generateNewElement("div", ["container"], undefined, div, undefined);
  var containerRow = uiMan.generateNewElement("div", ["row"], undefined, container, undefined);
  var containerColumn = uiMan.generateNewElement("div", ["col", "s12"], undefined, containerRow, undefined);

  var tabsRow = uiMan.generateNewElement("div", ["row"], undefined, informationDiv, undefined);
  var tabsColumn = uiMan.generateNewElement("div", ["col", "s12"], undefined, tabsRow, undefined);

  var filler = uiMan.generateNewElement("div", undefined, undefined, tabsColumn, {"display": "none", "height": "48px",
    "margin-top": "80px"});
    this.filler = filler;

  var tabs = uiMan.generateNewElement("ul", ["tabs", "vibrantColored"], undefined, tabsColumn, {"margin-top": "80px", "background-color": "rgba(0, 0, 0, 0)"});
  this.tabsColumn = tabsColumn;
  this.tabs = tabs;

  var tabsNavWrapperRow = uiMan.generateNewElement("div", ["row"], undefined, $("nav").get(0), {"width": "100%"});
  var tabsNavWrapperColumn = uiMan.generateNewElement("div", ["col", "s12"], undefined, tabsNavWrapperRow, {"height": "0px",
    "width": "100%"});
  this.tabsNavWrapperRow = tabsNavWrapperRow;
  this.tabsNavWrapperColumn = tabsNavWrapperColumn;

  this.loadTab(uiMan, true, "Videos", "videos");
  this.loadTab(uiMan, false, "About", "about");
  this.loadTab(uiMan, false, "Channels", "channels");

  // Videos
  var videosDIV = uiMan.generateNewElement("div", ["col", "s12"], undefined, tabsRow, undefined);
  videosDIV.id = "videos";

  if(chnl.brandingSettings.channel.unsubscribedTrailer){
    var titleRow = uiMan.generateNewElement("div", ["row"], undefined, videosDIV, {"margin-top": "20px"});
    var title = uiMan.generateNewElement("h4", [youtubeSexy.ui.darkThemed ? "white-text" : "black-text",
      "truncate"], "Trailer", titleRow, undefined);

    var trailerRow = uiMan.generateNewElement("div", ["row"], undefined, videosDIV, undefined);
    // Trailer Video
    var trailerVideoColumn = uiMan.generateNewElement("div", ["col", "s12", "m6", "l6"], undefined, trailerRow,
      {"height": "400px"});
    var iframe = uiMan.generateNewElement("iframe", undefined, undefined, trailerVideoColumn, {"width": "100%", "height":
      "100%", "border": "0px"});
    var trailer = chnl.brandingSettings.channel.unsubscribedTrailer;
    iframe.src = "https://www.youtube.com/embed/" + trailer + "?autoplay=1&enablejsapi=1&theme=light&showinfo=0";
    iframe.allowfullscreen = true;

    // Trailer Video Info
    var trailerVideoInfoColumn = uiMan.generateNewElement("div", ["col", "s12", "m6", "l6"], undefined, trailerRow,
      {"height": "400px"});

    var videoSeparationTitleRow = uiMan.generateNewElement("div", ["row"], undefined, videosDIV, {"margin-top": "20px"});
    var videoSeparationTitle = uiMan.generateNewElement("h4", [youtubeSexy.ui.darkThemed ? "white-text" : "black-text",
      "truncate"], "Videos", videoSeparationTitleRow, undefined);
  }

  var videoListRow = uiMan.generateNewElement("div", ["row"], undefined, videosDIV, undefined);
  this.videoRow = videoListRow;
  this.loadVideoPage();

  // About
  var aboutDIV = uiMan.generateNewElement("div", ["col", "s12"], undefined, tabsRow, undefined);
  aboutDIV.id = "about";

  var topRow = uiMan.generateNewElement("div", ["row"], undefined, aboutDIV, {"margin-top": "20px"});

  var columnCreationDate = uiMan.generateNewElement("div", ["col", "s12", "m4", "l4"], undefined, topRow, undefined);
  var creationDateString = uiMan.generateNewElement("a", [youtubeSexy.ui.darkThemed ? "white-text" : "black-text",
    "truncate"], "Created at " + chnl.snippet.publishedAt, columnCreationDate, {"font-size": "30px"});

  var columnViews = uiMan.generateNewElement("div", ["col", "s12", "m4", "l4"], undefined, topRow, undefined);
  var viewsString = uiMan.generateNewElement("a", [youtubeSexy.ui.darkThemed ? "white-text" : "black-text",
    "truncate"], simplifyNumber(chnl.statistics.viewCount) + " views", columnViews, {"font-size": "30px"});

  var columnVideos = uiMan.generateNewElement("div", ["col", "s12", "m4", "l4"], undefined, topRow, undefined);
  var videosString = uiMan.generateNewElement("a", [youtubeSexy.ui.darkThemed ? "white-text" : "black-text",
  "truncate"], simplifyNumber(chnl.statistics.videoCount) + " videos", columnVideos, {"font-size": "30px"});

  var descriptionRow = uiMan.generateNewElement("div", ["row"], undefined, aboutDIV, {"margin-top": "20px"});
  var descriptionColumn = uiMan.generateNewElement("div", ["col", "s12"], undefined, descriptionRow, undefined);
  var description = uiMan.generateNewElement("a", [youtubeSexy.ui.darkThemed ? "white-text" : "black-text"],
    chnl.snippet.description, descriptionColumn, {"word-wrap": "break-word", "font-size": "12px"});

  // Channels
  var channelsDIV = uiMan.generateNewElement("div", ["col", "s12"], undefined, tabsRow, undefined);
  channelsDIV.id = "channels";

  if(chnl.brandingSettings.channel.featuredChannelsTitle){
    var rowFeaturedChannels = uiMan.generateNewElement("div", ["row"], undefined, channelsDIV, undefined);
    var channelFeaturedChannels = uiMan.generateNewElement("div", ["col", "s12"], undefined, rowFeaturedChannels, undefined);
    var text = uiMan.generateNewElement("h4", [youtubeSexy.ui.darkThemed ? "white-text" : "black-text"],
      chnl.brandingSettings.channel.featuredChannelsTitle, channelFeaturedChannels, undefined);
  }

  if(chnl.brandingSettings.channel.featuredChannelsUrls){
    var rowFeaturedChannels = uiMan.generateNewElement("div", ["row"], undefined, channelsDIV, undefined);

    for(var channelIndex in chnl.brandingSettings.channel.featuredChannelsUrls){
      var channel = chnl.brandingSettings.channel.featuredChannelsUrls[channelIndex];
      var channelFeaturedChannels = uiMan.generateNewElement("div", ["col", "s12", "m6", "l4"], undefined,
        rowFeaturedChannels, undefined);

      channelFeaturedChannels.appendChild(youtubeSexy.ui.getUserIcon(channel, "100%", chnl));
    }
  }

  $(tabs).tabs();
  $(".indicator").css({"color": "#FFFFFF"});

  var loading = youtubeSexy.ui.createCirclePreloaderDIV("blue", "big");
  videosDIV.appendChild(loading);
  this.preloader = loading;
  this.setupPollTimer(chnl);
  
}

YoutubeChannelPage.prototype.setupPollTimer = function(chnl){
	
	var pollTimer = window.setInterval(() => {
		youtubeSexy.activeChannelPage.callSubUpdate(chnl);
	}, youtubeSexy.options.subscriberCountChannelPageUpdateRate);
  this.pollTimer = pollTimer;
	
}

YoutubeChannelPage.prototype.callSubUpdate = function(chnl){
	
	youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/channels", {
		"part": "statistics",
		"id": chnl.id,
		"fields": "items/statistics/subscriberCount"
	}, (result) => {
		for(var channelIndex in result.items){
			var channel = result.items[channelIndex];
			this.userSubscriberCountA.textContent = prettifyNumber(channel.statistics.subscriberCount) + " subscribers";
  	  break;
		}
	});
	
}

YoutubeChannelPage.prototype.loadVideoPage = function(){

	this.loadingPage = true;
  var jsonReq = {
    "part": "snippet",
    "maxResults": 25,
    "channelId": this.channelId
  };
  if(this.nextPageToken) jsonReq.pageToken = this.nextPageToken;
  else $(this.preloader).remove();

  youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/search", jsonReq, (json) => {
    var items = json.items;
    var itemIDs = [];
    var itemIdInputString = "";
    var first = true;

    for(var itemIndex in items){
      var item = items[itemIndex];

      if(first) first = false;
      else itemIdInputString = itemIdInputString + ",";

      itemIdInputString = itemIdInputString + item.id.videoId;
    }

    youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos", {
      "part": "snippet,statistics",
      "id": itemIdInputString
    }, (result) => {
      for(var videoIndex in result.items){
        var video = result.items[videoIndex];
        this.videoRow.appendChild(youtubeSexy.ui.createFullVideoDIV(video, true));
      }
      this.loadingPage = false;
    });
  });

}

YoutubeChannelPage.prototype.loadTab = function(uiMan, active, name, tabDivID){

  var li = uiMan.generateNewElement("li", ["tab", "col", "s4"], undefined, this.tabs, undefined);
  var text = uiMan.generateNewElement("a", active ? ["active", "white-text"] : ["white-text"], name, li, undefined);
  text.href = "#" + tabDivID;

}