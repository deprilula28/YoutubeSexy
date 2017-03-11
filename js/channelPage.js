function YoutubeChannelPage(channelId, response, breadcrumb){

  this.channelId = channelId;
  this.response = response;
  this.breadcrumb = breadcrumb;
  this.vibrantColor = "#000000";

  this.banner = undefined;
  this.fixed = false;
  this.tabs = undefined;

  this.createChannelPage();

  $(".channelPageWrapper").get(0).onscroll = (event) => {
    if(youtubeSexy.activeChannelPage){
      var scroll = $(".channelPageWrapper").scrollTop();
      var tabs = this.tabs;

      if(scroll > 260 && this.fixed) return;
      else if(scroll <= 260 && this.fixed){
        //Unfixing
        this.fixed = false;
      }

      if(scroll <= 260) $("nav").css({"height": "64px"});
      else $("nav").css({"height": "128px"});

      var banner = this.banner;
      var bannerColumn = banner.parentNode;
      var bannerRow = bannerColumn.parentNode;

      var img = this.userImg;
      var name = this.userNameA;
      var informationDiv = this.informationDiv;

      var progress = scroll / 260.0;
      if(progress > 1) progress = 1;

      if(scroll > 260 && !this.fixed){
        //Fixing
        $(img).css({"width": "64px", "height": "64px", "opacity": 0, "top": "65px"});
        $(name).css({"top": "32px", "left": "150px"});
        this.fixed = true;
      }

      $(img).css({"width": ((-progress + 1) * 64.0 + 64.0) + "px", "height": ((-progress + 1) * 64.0 + 64.0) + "px", "opacity":
        -progress + 1, "top": lerp(160.0, 0, progress)});
      $(name).css({"top": lerp(275, 32, progress) + "px", "left": lerp(150, 150, progress)});
    }
  };

}

YoutubeChannelPage.prototype.createChannelPage = function(){

  var uiMan = youtubeSexy.ui;
  var chnl = this.response;
  this.breadcrumb.setName(chnl.snippet.title);

  var contentPage = document.getElementById("content-page");
  $(div).css({"width": "100%", "height": "100%"});

  console.log(chnl);

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
    console.log("Vibrant color: " + this.vibrantColor + ", all swatches:", swatches);

    $("nav").animate({"background-color": this.vibrantColor});
    $(".vibrantColored").animate({"background-color": this.vibrantColor})
  });

  this.banner = banner;

  var informationRow = uiMan.generateNewElement("div", ["row"], undefined, div, undefined);
  var informationColumn = uiMan.generateNewElement("div", ["col", "s12"], undefined, informationRow, {"padding": "0px"});
  var informationDiv = uiMan.generateNewElement("div", ["vibrantColored"], undefined, informationColumn, {"width": "100%",
    "height": "128px", "background-color": "#000000"});

  var userImg = uiMan.generateNewElement("img", ["circular", "z-depth-5"], undefined, div,
    {"z-index": "999", "position": "fixed", "width": "128px", "height": "128px", "left": "10px", "top":
    "160px"});
  userImg.src = chnl.snippet.thumbnails.high.url;
  this.userImg = userImg;

  var userName = uiMan.generateNewElement("a", ["white-text", "truncate"], chnl.snippet.title,
    div, {"font-size": "24px", "position": "fixed", "z-index": "15000", "left": "150px", "top": "275px"});

  this.userNameA = userName;

  var container = uiMan.generateNewElement("div", ["container"], undefined, div, undefined);
  var containerRow = uiMan.generateNewElement("div", ["row"], undefined, container, undefined);
  var containerColumn = uiMan.generateNewElement("div", ["col", "s12"], undefined, containerRow, undefined);

  var tabsRow = uiMan.generateNewElement("div", ["row"], undefined, informationDiv, undefined);
  var tabsColumn = uiMan.generateNewElement("div", ["col", "s12"], undefined, tabsRow, undefined);
  var tabs = uiMan.generateNewElement("ul", ["tabs", "vibrantColored"], undefined, tabsColumn,
      {"background-color": "#000000", "margin-top": "80px", "color": "#FFFFFF"});
  this.tabsColumn = tabsColumn;
  this.tabs = tabs;

  this.loadTab(uiMan, true, "Videos", "videos");
  this.loadTab(uiMan, false, "About", "about");
  this.loadTab(uiMan, false, "Channels", "channels");

  //Videos
  var videosDIV = uiMan.generateNewElement("div", ["col", "s12"], undefined, tabsRow, undefined);
  videosDIV.id = "videos";

  if(chnl.brandingSettings.channel.unsubscribedTrailer){
    var titleRow = uiMan.generateNewElement("div", ["row"], undefined, videosDIV, {"margin-top": "20px"});
    var title = uiMan.generateNewElement("h4", [youtubeSexy.ui.darkThemed ? "white-text" : "black-text",
      "truncate"], "Trailer", titleRow, undefined);

    var trailerRow = uiMan.generateNewElement("div", ["row"], undefined, videosDIV, undefined);
    //Trailer Video
    var trailerVideoColumn = uiMan.generateNewElement("div", ["col", "s12", "m6", "l6"], undefined, trailerRow,
      {"width": "100%", "height": "400px"});
    var iframe = uiMan.generateNewElement("iframe", undefined, undefined, trailerVideoColumn, {"width": "100%", "height":
      "100%"});
    iframe.src = "https://www.youtube.com/embed/" + chnl.brandingSettings.channel.unsubscribedTrailer + "?autoplay=1";

    //Trailer Video Info
    var trailerVideoInfoColumn = uiMan.generateNewElement("div", ["col", "s12", "m6", "l6"], undefined, trailerRow,
      {"width": "100%", "height": "400px"});

    var videoSeparationTitleRow = uiMan.generateNewElement("div", ["row"], undefined, videosDIV, {"margin-top": "20px"});
    var videoSeparationTitle = uiMan.generateNewElement("h4", [youtubeSexy.ui.darkThemed ? "white-text" : "black-text",
      "truncate"], "Videos", videoSeparationTitleRow, undefined);
  }

  var videoListRow = uiMan.generateNewElement("div", ["row"], undefined, videosDIV, undefined);
  this.loadVideos(this.channelId, videoListRow, undefined);

  //About
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

  //Channels
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

      channelFeaturedChannels.appendChild(youtubeSexy.ui.getUserIcon(channel, "100%"));
    }
  }

  $(tabs).tabs();
  $(".indicator").css({"color": "#FFFFFF"});

  //var test = uiMan.generateNewElement("a", undefined, "Test Test Test Test Test Test Test Test Test Test Test Test Test " +
  //  "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test",
  //  div, {"font-size": "72px", "word-wrap": "break-word"});

}

YoutubeChannelPage.prototype.loadVideos = function(channelId, row, nextPageToken){

  var json = {
    "part": "snippet",
    "maxResults": 50,
    "channelId": this.channelId
  };
  if(nextPageToken) json.pageToken = nextPageToken;

  youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/search", json, (json) => {
    for(var videoIndex in json.items){
      var video = json.items[videoIndex];
      row.appendChild(youtubeSexy.ui.createFullVideoDIV(video));
    }
    if(json.nextPageToken) this.loadVideos(channelId, row, json.nextPageToken);
  });

}

YoutubeChannelPage.prototype.loadTab = function(uiMan, active, name, tabDivID){

  var li = uiMan.generateNewElement("li", ["tab", "col", "s4"], undefined, this.tabs, undefined);
  var text = uiMan.generateNewElement("a", active ? ["active"] : undefined, name, li, undefined);
  text.href = "#" + tabDivID;

}
