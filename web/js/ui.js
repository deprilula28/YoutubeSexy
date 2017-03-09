function UIManager(){

  this.darkThemed = true;

}

UIManager.prototype.toggleTheme = function(){

  this.darkThemed = !this.darkThemed;

  if(this.darkThemed){
      $("body").animate({"background-color": "#FFFFFF"}, 100, "linear", () => {
        $("body").addClass("grey").addClass("darken-3");
        $("body").css("background-color", "");
        $("#authenticateButton").removeClass("waves-light");
      });
      $(".nav-wrapper-right-align .chip").addClass("grey").addClass("darken-3");
      $(".nav-wrapper-right-align .chip a").removeClass("black-text").addClass("white-text");
  }else{
      $("body").animate({"background-color": "#424242"}, 100, "linear", () => {
        $("body").css("background-color", "");
        $("body").removeClass("grey").removeClass("darken-3");
        $("#authenticateButton").addClass("waves-light");
      });
      $(".nav-wrapper-right-align .chip").removeClass("grey").removeClass("darken-3");
      $(".nav-wrapper-right-align .chip a").removeClass("white-text").addClass("black-text");
  }

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
  $(h4).addClass("white-text");
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

    rowVideos.appendChild(this.getFullSizeVideoCard(item));

    curi ++;
  }

}

UIManager.prototype.createFullVideoDIV = function(video){

  var column = document.createElement("div");
  $(column).addClass("col").addClass("s6").addClass("l4");
  $(column).css({"height": "240px", "max-height": "240px", "width": "214px", "max-width": "214px", "overflow": "none"});

  var card = document.createElement("div");
  $(card).addClass("card").addClass("z-depth-2").addClass("hoverable");
  $(column).css({"height": "180px", "max-height": "180px", "width": "214px", "max-width": "214px", "margin-bottom" : "10px",
  "margin-left": "5px", "margin-right": "5px"});
  column.appendChild(card);

  var cardContent = document.createElement("div");
  $(cardContent).addClass("card-content");
  $(cardContent).css({"height": "120px", "max-height": "120px", "padding-top": "0px", "padding-bottom": "0px",
    "padding-left": "0px", "padding-right": "0px"});
  card.appendChild(cardContent);

  var img = document.createElement("img");
  img.src = video.snippet.thumbnails.high.url;
  img.onClick = (event) => {
    playVideo(video);
  };
  $(img).css({"width": "100%", "height": "100%"});
  cardContent.appendChild(img);

  var cardAction = document.createElement("div");
  $(cardAction).addClass("card-action").addClass("grey").addClass("lighten-4").css({"min-width": "214px",
    "max-width": "214px", "width": "214px"});
  card.appendChild(cardAction);

  var rowVideoName = document.createElement("div");
  $(rowVideoName).addClass("row");
  cardContent.appendChild(rowVideoName);

  var columnVideoName = document.createElement("div");
  $(columnVideoName).addClass("col").addClass("s12");
  rowVideoName.appendChild(columnVideoName);

  var videoNameTextComp = document.createElement("a");
  $(videoNameTextComp).addClass("truncate").addClass("indigo-text");
  videoNameTextComp.textContent = video.title;

  var rowUserIcon = document.createElement("div");
  $(rowUserIcon).addClass("row");
  cardContent.appendChild(rowUserIcon);

  var columnUserIcon = document.createElement("div");
  $(columnUserIcon).addClass("col").addClass("s12");
  rowUserIcon.appendChild(columnUserIcon);

  var userIcon = this.getUserIcon(video.snippet.channelId);
  columnUserIcon.appendChild(userIcon);

  return column;

}

UIManager.prototype.getUserIcon = function(channelId){

  var chip = document.createElement("div");
  $(chip).addClass("chip");

  var img = document.createElement("img");
  chip.appendChild(img);

  var textNode = document.createElement("a");
  $(textNode).addClass("black-text").addClass("truncate");
  textNode.textContent = "Loading";
  chip.appendChild(textNode);

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
