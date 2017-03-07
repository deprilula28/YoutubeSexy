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
      });
      $(".nav-wrapper-right-align .chip").addClass("grey").addClass("darken-3");
      $(".nav-wrapper-right-align .chip a").removeClass("black-text").addClass("white-text");
  }else{
      $("body").animate({"background-color": "#424242"}, 100, "linear", () => {
        $("body").css("background-color", "");
        $("body").removeClass("grey").removeClass("darken-3");
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
  var interpreterJSON = {};
  page ++;

  var items = activitiesResponse.items;
  for(var item in items){
    if(items.hasOwnProperty(item) && item.kind == "youtube#activity"){
      var channelTitle = item.snippet.channelTitle;
      if(!interpreterJSON.hasOwnProperty(channelTitle)) interpreterJSON.channelTitle = [];

      interpreterJSON.channelTitle.push(item);
      console.log("Found item with title " + channelTitle);
    }
  }

  jQuery.each(interpreterJSON, (title, itemList) => {
    console.log("Interpreting section titled " + title);
    createVideoDIV(title, itemList);
  });

}

function createVideoDIV(title, items){

  var curi = 0;
  var mainPage = document.getElementById("main-page");
  var div = document.createElement("div");
  mainPage.appendChild(div);

  $(div).addClass("mainPageSection");

  var rowTitle = document.createElement("div");
  $(rowTitle).addClass("row");
  div.appendChild(rowTitle);

  var columnTitle = document.createElement("div");
  $(columnTitle).addClass("col").addClass("s12");
  rowTitle.appendChild(columnTitle);

  var h4 = document.createElement("h4");
  h4.textContent = title;
  columnTitle.appendChild(h4);

  var rowVideos = document.createElement("div");
  $(rowVideos).addClass("row");
  div.appendChild(rowVideos);

  for(var item in items){
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
  $(column).addClass("col").addClass("s6").addClass("l2");

  var card = document.createElement("div");
  $(card).addClass("card").addClass("small");
  column.appendChild(card);

  var cardContent = document.createElement("div");
  $(cardContent).addClass("card-content");
  card.appendChild(cardContent);

  var img = document.createElement("img");
  img.src = item.snippet.thumbnails.default.url;
  $(img).css({"width": "100%", "height": "100%"});
  cardContent.appendChild(img);

  var cardAction = document.createElement("div");
  $(cardAction).addClass("card-action");
  card.appendChild(cardAction);

  var userIcon = getUserIcon(video.snippet.channelId);
  cardAction.appendChild(userIcon);

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

  var textNode = document.createTextNode("Loading...");
  chip.appendChild(textNode);

  gapi.client.request({
    "path": "https://www.googleapis.com/youtube/v3/channels",
    "params":{
      "part": "snippet",
      "id": channelId
    }
  }).then((respose) => {
    var result = response.result;
    for(var channel in result.items){
      textNode.nodeValue = channel.snippet.title;
      img.src = channel.snippet.thumbnails.default.url;
      break;
    }

    textNode.nodeValue = "Invalid channel.";
  });

  return chip;

}

function playVideo(item){



}

function loadNewMenuMenuPage(){

  gapi.client.request({
    "path": "https://www.googleapis.com/youtube/v3/activities",
    "params":{
      "part": "snippet",
      "home": true,
      "maxResults": 50,
      "pageToken": "nextPageToken"
    }
  }).then((response) => {
    loadMainMenuPage(response.result);
  }, (error) => {
    console.log("Error: " + error);
    alert("Error!")
  });

}
