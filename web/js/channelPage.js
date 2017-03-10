function YoutubeChannelPage(channelId, response, breadcrumb){

  this.channelId = channelId;
  this.response = response;
  this.breadcrumb = breadcrumb;
  this.vibrantColor = "#000000";

  this.banner = undefined;
  this.fixed = false;

  this.createChannelPage();

}

$(window).scroll((event) => {
  if(youtubeSexy.activeChannelPage){
    var scroll = $(document).scrollTop();

    if(scroll > 260 && this.fixed) return;
    else if(scroll <= 260 && this.fixed){
      this.fixed = false;
      $(this.informationDiv).css({"position": "relative", "top": ""});
    }

    var banner = this.banner;
    var bannerColumn = banner.parentNode;
    var bannerRow = bannerColumn.parentNode;

    var img = this.userImg;
    var name = this.userNameA;
    var informationDiv = this.informationDiv;

    var progress = scroll / 260.0;

    if(scroll > 260 && !this.fixed){
      $(img).css({"width": "64px", "height": "64px", "opacity": 0, "top": "65px"});
      $(name).css({"font-size": "14px", "top": "96px", "left": "38px"});
      $(banner).css({"height": "0px"});
      $(bannerColumn).css({"height": "0px"});
      $(bannerRow).css({"height": "0px"});
      $(informationDiv).css({"position": "fixed", "top": "64px"});
    }

    $(img).css({"width": (progress * 64.0 + 64.0) + "px", "height": (progress * 64.0 + 64.0) + "px", "opacity": progress,
      "top": lerp(160.0, 65.0, progress)});
    $(name).css({"font-size": Math.floor(lerp(14, 24, progress)) + "px", "top": lerp(96, 275, progress) + "px",
      "left": lerp(38, 150, progress)});
    $(banner).css({"height": progress * 200 + "px"});
    $(bannerRow).css({"height": progress * 200 + "px"});
    $(informationDiv).css({"height": progress * 200 + "px"});
  }
});

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
    "height": "64px", "background-color": "#000000"});
  this.informationDiv = informationDiv;

  var userImg = uiMan.generateNewElement("img", ["circular", "z-depth-5"], undefined, div,
    {"z-index": "10000", "position": "fixed", "width": "128px", "height": "128px", "left": "10px", "top":
    "160px"});
  userImg.src = chnl.snippet.thumbnails.high.url;
  this.userImg = userImg;

  var userName = uiMan.generateNewElement("a", ["white-text", "truncate"], chnl.snippet.title,
    div, {"font-size": "24px", "position": "fixed", "z-index": "10000", "left": "150px", "top": "275px"});

  this.userNameA = userName;

  var container = uiMan.generateNewElement("div", ["container"], undefined, div, undefined);
  var containerRow = uiMan.generateNewElement("div", ["row"], undefined, container, undefined);
  var containerColumn = uiMan.generateNewElement("div", ["col", "s12"], undefined, containerRow, undefined);

  youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/search", {
    "part": "snippet",
    "maxResults": 50,
    "channelId": this.channelId
  }, (json) => {

  });

}
