function YoutubeChannelPage(channelId, response, breadcrumb){

  this.channelId = channelId;
  this.response = response;
  this.breadcrumb = breadcrumb;
  this.vibrantColor = "#000000";

  this.createChannelPage();

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

  var informationRow = uiMan.generateNewElement("div", ["row"], undefined, div, undefined);
  var informationColumn = uiMan.generateNewElement("div", ["col", "s12"], undefined, informationRow, {"padding": "0px"});
  var informationDiv = uiMan.generateNewElement("div", ["vibrantColored"], undefined, informationColumn, {"width": "100%",
    "height": "60px", "background-color": "#000000"});

  var userImg = uiMan.generateNewElement("img", ["circular", "z-depth-5"], undefined, informationDiv,
    {"z-index": "10000", "position": "fixed", "width": "128px", "height": "128px", "left": "10px", "top":
    "160px"});
  userImg.src = chnl.snippet.thumbnails.high.url;

  var usernameRow = uiMan.generateNewElement("div", ["row"], undefined, informationDiv, undefined);
  var usernameColumn = uiMan.generateNewElement("div", ["col", "s10", "offset-s2"], undefined, usernameRow, {"padding": "0px"});

  var userName = uiMan.generateNewElement("a", ["white-text", "truncate"], chnl.snippet.title,
    usernameColumn, {"font-size": "24px"});

}
