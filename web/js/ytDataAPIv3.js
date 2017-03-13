
var API_KEY = "AIzaSyBlV48q70B0bP3URvRVw_7-uW0YhXZA8GE";

function YTDataAPI(){

  this.authenticated = false;
  this.authAccessToken = undefined;

}

YTDataAPI.prototype.startAPILib = function(){

  if(this.authenticated){
    this.googleAPIGet("https://www.googleapis.com/youtube/v3/activities", {
      "part": "snippet,statistics",
      "maxResults": 50,
      "home": true
    }, (json) => {
      youtubeSexy.loadMainMenuPage(json);
      youtubeSexy.loadingPage = false;
    });

    youtubeSexy.ui.loadSidebarPanelAuthenticated();
  }else{
    youtubeSexy.ui.loadFeaturedPage();
    youtubeSexy.ui.loadSidebarPanelNoAuth();
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

	return "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=" +
			getScope() + "&client_id=143036117535-r44koj2e0bf9emon2k6kc18g6pkgorh1.apps.googleusercontent.com&redirect_uri=" + redirect;

}

function getScope(){

	return "https://www.googleapis.com/auth/yt-analytics.readonly%20https://www.googleapis.com/auth/yt-analytics-monetary.readonly%20https://www.googleapis.com/auth/youtube%20https://www.googleapis.com/auth/youtube.readonly" +
			"%20https://www.googleapis.com/auth/youtube.upload%20https://www.googleapis.com/auth/youtubepartner";

}

YTDataAPI.prototype.requestAuth = function(){

  var win = window.open(getURL("https://deprilula28.github.io/YoutubeSexy/oauthFrame.html"), "Authenticate",
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
    "800, height= 600");
  var redirect = "deprilula28.github.io";
  win.focus();

  var pollTimer = win.setInterval(function(){
    if(win.document.URL && win.document.URL.indexOf(redirect) != -1){
        window.clearInterval(pollTimer);

        var url = win.document.URL;
        acToken = gup(url, 'access_token');
        tokenType = gup(url, 'token_type');
        expiresIn = gup(url, 'expires_in');

        if(this.verify(acToken)){
          this.authAccessToken = new AuthAccessToken(acToken, tokenType, expiresIn);
          this.authenticated = true;
          console.log("Authenticated!");
        }

        win.close();
    }
  }, 100);

}

YTDataAPI.prototype.googleAPIGet = function(path, params, completeHandler){

  var url = path + "?key=" + API_KEY;

  jQuery.each(params, (paramName, param) => url = url + "&" + paramName + "=" + (param + ""));

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

function AuthAccessToken(token, tokenType, expiresIn){

  this.token = token;
  this.tokenType = tokenType;
  this.expiresIn = expiresIn;

}
