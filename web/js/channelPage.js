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

  var div = uiMan.generateNewElement("div", ["channelPageWrapper"], undefined, contentPage, {"position": "relative"});

  var banner = uiMan.generateNewElement("img", undefined, undefined, div, {"width": "100%"});
  banner.src = chnl.brandingSettings.image.bannerImageUrl;
  banner.crossOrigin = "Anonymous";
  banner.addEventListener("load", () => {
    var vibrant = new Vibrant(banner);
    var swatches = vibrant.swatches();

    this.vibrantColor = swatches[uiMan.darkThemed ? 0 : 2];
    if(this.vibrantColor) this.vibrantColor = this.vibrantColor.getHex();
    else this.vibrantColor = "#000000";
  });



}
