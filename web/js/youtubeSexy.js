String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {

    return this.split(needle).join(replacement);

};

window.onload = () => {
  $(".button-collapse").sideNav();
  startAPILib();
}

var darkThemed = true;

function toggleTheme(){

  darkThemed = !darkThemed;

  if(darkThemed){
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

var page = 0;
var maxScrollLevel = 0;

function loadMainMenuPage(activitiesResponse){

  console.log("Creating main page contents with activities reponse:");
  console.log(activitiesResponse);

  if(authenticated){
    var interpreterJSON = {};
    page ++;

    var items = activitiesResponse.items;
    for(var itemIndex in items){
      var item = items[itemIndex];
      var channelTitle = item.snippet.channelTitle;

      if(!interpreterJSON.hasOwnProperty(channelTitle)) interpreterJSON[channelTitle] = [];
      interpreterJSON[channelTitle].push(item);
    }

    jQuery.each(interpreterJSON, (title, itemList) => {
      console.log("Interpreting section titled " + title);
      createVideoDIVRecommended(title, itemList);
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
    $(h4).addClass("white-text");
    $(h4).css({"margin-bottom": "0px"});
    h4.textContent = "Trending Videos";
    columnTitle.appendChild(h4);

    var a = document.createElement("a");
    $(a).addClass("white-text");
    a.textContent = "Authenticate to view videos recommended for you.";
    div.appendChild(a);

    var rowVideos = document.createElement("div");
    $(rowVideos).addClass("row");
    div.appendChild(rowVideos);

    var items = activitiesResponse.items;
    for(var itemIndex in items){
      var item = items[itemIndex];
      rowVideos.appendChild(getFullSizeVideoCard(item));
    }
  }

}

function createVideoDIVRecommended(title, items){

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

    rowVideos.appendChild(getFullSizeVideoCard(item));

    curi ++;
  }

}

function getFullSizeVideoCard(video){

  //<div class="col s6 l2">
  //  <div class="card small">
  //    <div class="card-content">
  //      <img style="width: 100%; height: 100%" src="<URL>" />
  //    </div>
  //    <div class="card-action">
  //
  //    </div>
  //  </div>
  //</div>

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

  var userIcon = getUserIcon(video.snippet.channelId);
  columnUserIcon.appendChild(userIcon);

  return column;

}

function getUserIcon(channelId){

  //<div class="chip">
  //  Loading...
  //</div>
  //Loads page after

  var chip = document.createElement("div");
  $(chip).addClass("chip");

  var img = document.createElement("img");
  chip.appendChild(img);

  var textNode = document.createElement("a");
  $(textNode).addClass("black-text").addClass("truncate");
  textNode.textContent = "Loading";
  chip.appendChild(textNode);

  googleAPIGet("https://www.googleapis.com/youtube/v3/channels", {
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

function playVideo(item){



}

function loadNewMenuMenuPage(){

  if(authenticated){
    googleAPIGet("https://www.googleapis.com/youtube/v3/activities", {
      "part": "snippet",
      "maxResults": 50,
      "home": true,
      "pageToken": "nextPageToken"
    }, (json) => loadMainMenuPage(json));
  }else{
    googleAPIGet("https://www.googleapis.com/youtube/v3/videos", {
      "part": "snippet",
      "chart": "mostPopular",
      "maxResults": 50,
      "pageToken": "nextPageToken"
    }, (json) => loadMainMenuPage(json))
  }

}
