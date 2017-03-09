
var API_KEY = "AIzaSyBlV48q70B0bP3URvRVw_7-uW0YhXZA8GE";

function YTDataAPI(){

  this.authenticated = false;

}

YTDataAPI.prototype.startAPILib = function(){

  if(this.authenticated){
    this.googleAPIGet("https://www.googleapis.com/youtube/v3/activities", {
      "part": "snippet",
      "maxResults": 50,
      "home": true
    }, (json) => {
      youtubeSexy.loadMainMenuPage(json);
      youtubeSexy.loadingPage = false;
    });
  }else{
    this.googleAPIGet("https://www.googleapis.com/youtube/v3/videos", {
      "part": "snippet",
      "chart": "mostPopular",
      "maxResults": 50
    }, (json) => {
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
      $(h4).addClass("videoNameTextComponent").addClass(youtubeSexy.ui.darkThemed ? "white-text" : "black-text");
      $(h4).css({"margin-bottom": "0px"});
      h4.textContent = "Trending Videos";
      columnTitle.appendChild(h4);

      var a = document.createElement("a");
      $(a).addClass("videoNameTextComponent").addClass(youtubeSexy.ui.darkThemed ? "white-text" : "black-text");
      a.textContent = "Authenticate to view videos recommended for you.";
      div.appendChild(a);

      youtubeSexy.loadMainMenuPage(json);
      youtubeSexy.loadingPage = false;
    });
  }

}

//credits: http://www.netlobo.com/url_query_string_javascript.html
function gup(url, name){

  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

  var regexS = "[\\#&]"+name+"=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);

  if(results == null) return "";
  else return results[1];

}

function getURL(redirect){

	return "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope="
			getScope() + "&client_id=143036117535-r44koj2e0bf9emon2k6kc18g6pkgorh1.apps.googleusercontent.com&redirect_uri=" + redirect;

}

function getScope(){

	return "https://www.googleapis.com/auth/yt-analytics.readonly%20https://www.googleapis.com/auth/yt-analytics-monetary.readonly%20https://www.googleapis.com/auth/youtube%20https://www.googleapis.com/auth/youtube.readonly" +
			"%20https://www.googleapis.com/auth/youtube.upload%20https://www.googleapis.com/auth/youtubepartner";

}

YTDataAPI.prototype.requestAuth = function(){

  var win = window.open("oauthFrame.html", "Authenticate", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width= 800, height= 600");
  win.focus();
  var redirect = window.document.URL;
  win.location.href = getURL(redirect);

  var pollTimer = win.setInterval(function(){
    console.log(win.document.URL);
    if(win.document.URL.indexOf(redirect) != -1){
        window.clearInterval(pollTimer);

        var url = win.document.URL;
        acToken = gup(url, 'access_token');
        tokenType = gup(url, 'token_type');
        expiresIn = gup(url, 'expires_in');
        win.close();

        validateToken(acToken);
    }
  }, 100);

}

YTDataAPI.prototype.googleAPIGet = function(path, params, completeHandler){

  var url = path + "?key=" + API_KEY;

  jQuery.each(params, (paramName, param) => url = url + "&" + paramName + "=" + (param + ""));
  console.log("Requesting with URL " + url);

	var request = new XMLHttpRequest();
	var received = false;

	request.open('GET', url, true);
	request.onreadystatechange = function(e){

		if(!received && request.readyState == 4){
			received = true;
      var json = JSON.parse(request.responseText);

      if(json.hasOwnProperty("error")){
        var errorAlert = "An error has occured while processing a Youtube API request! Error Code: " + json.error.code + "\n" +
          "Message: " + json.error.message + "\n\nFull error log:";
        var index = 1;
        console.log(json.error.errors);

        for(var errorIndex in json.error.errors){
          var errorCur = json.error.errors[errorIndex];
          errorAlert = errorAlert + "\nError #" + index + ": " + errorCur.reason + " (" + errorCur.message + ")";
          index ++;
        }

        console.log(errorAlert);
        alert(errorAlert);
      }else completeHandler(JSON.parse(request.responseText));
		}

	}

	request.send(null);

}