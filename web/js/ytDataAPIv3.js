
var API_KEY = "AIzaSyBlV48q70B0bP3URvRVw_7-uW0YhXZA8GE";

function YTDataAPI(){

  this.authenticated = false;
  this.authAccessToken = undefined;

}

YTDataAPI.prototype.startAPILib = function(){

  if(youtubeSexy.cookies.getCookie("doAuthenticate") && youtubeSexy.cookies.getCookie("doAuthenticate") === "true"){
    console.log("Automatic authentication based on cookie.");
    this.requestAuth();
  }else if(this.authenticated){
    this.googleAPIGet("https://www.googleapis.com/youtube/v3/activities", {
      "part": "snippet,statistics",
      "maxResults": 50,
      "home": true
    }, function(json){
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
			"%20https://www.googleapis.com/auth/youtube.upload%20https://www.googleapis.com/auth/youtubepartner%20https://www.googleapis.com/auth/plus.login";

}

YTDataAPI.prototype.requestAuth = function(runAfter){

  var win = window.open(getURL("https://deprilula28.github.io/YoutubeSexy/oauthFrame.html"), "Authenticate",
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
    "800, height= 600");
  var redirect = "https://deprilula28.github.io/YoutubeSexy/oauthFrame.html#";
  win.focus();

  var pollTimer = window.setInterval(function(){
    try{
      if(win.document.URL.indexOf(redirect) === 0){
          window.clearInterval(pollTimer);
          
          var url = win.document.URL;
          acToken = gup(url, 'access_token');
          tokenType = gup(url, 'token_type');
          expiresIn = gup(url, 'expires_in');

          console.log("Received authentication request, verifying token...");
          Materialize.toast("Authenticating...", 4000);
          
          win.close();

          youtubeSexy.ytDataAPI.verify(acToken, function(){
            youtubeSexy.ytDataAPI.authAccessToken = new AuthAccessToken(acToken, tokenType, expiresIn);
            youtubeSexy.ytDataAPI.authenticated = true;
            console.log("Authenticated!");
            Materialize.toast("Finished authenticating!", 4000);

            $(".side-nav").empty();

            youtubeSexy.ui.loadSidebarPanelAuthenticated();
            youtubeSexy.cookies.setCookie("doAuthenticate", "true", 365);
            youtubeSexy.loadingPage = true;
            $("#loadingcircle").css({"display": ""});
            $("#main-page").empty();
            $(".upload-button").css({"display": ""});

            youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/auth/userinfo.profile", {}, function(json){

            });

            youtubeSexy.ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/activities", {
              "part": "snippet,statistics",
              "maxResults": 50,
              "home": true
            }, function(json){
              youtubeSexy.loadMainMenuPage(json);
              youtubeSexy.loadingPage = false;
            });

            if(runAfter) runAfter();
          });
      }else if(!win.document || !win) window.clearInterval(pollTimer);
    }catch(e){
      if(e.stack.startsWith("TypeError: Cannot read property 'URL' of undefined")){
        Materialize.toast("Cancelled authentication request.", 4000);
        youtubeSexy.ui.loadFeaturedPage();
        youtubeSexy.ui.loadSidebarPanelNoAuth();
        window.clearInterval(pollTimer);
      }
    	console.log(e.stack);
    }
  }, 100);

}

YTDataAPI.prototype.verify = function(token, handleSuccess){

  var url = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token;

	var request = new XMLHttpRequest();
	var received = false;

	request.open('GET', url, true);
	request.onreadystatechange = function(e){

		if(!received && request.readyState === 4){
			received = true;
      var response = JSON.parse(request.responseText);

      if(response.hasOwnProperty("error")) Materialize.toast("Invalid token; Try again", 5000);
      else if(response.audience !== "143036117535-r44koj2e0bf9emon2k6kc18g6pkgorh1.apps.googleusercontent.com")
        Materialize.toast("Bad response; Try again", 5000);
      else handleSuccess();
		}

	}

	request.send(null);

}

YTDataAPI.prototype.googleAPIGet = function(path, params, completeHandler, errorHandler){

  var url = path + "?key=" + API_KEY + (this.authAccessToken ? "&access_token=" + this.authAccessToken : "");

  $.each(params, function(paramName, param){ url = url + "&" + paramName + "=" + (param + "") });

  $.ajax({
    "url": url,
    "contentType": "application/json"
  }).done(function(json){
      if(json.hasOwnProperty("error")){
        var errorAlert = "An error has been returned by the Youtube API! Error Code: " + json.error.code + "\n" +
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
      }else completeHandler(json);
  }).error(function(jqXHR, textStatus, errorThrown){
    if(errorHandler) errorHandler(textStatus, errorThrown);
    else alert("Error: " + textStatus + " (" + errorThrown + ")");
  })

}

function AuthAccessToken(token, tokenType, expiresIn){

  this.token = token;
  this.tokenType = tokenType;
  this.expiresIn = expiresIn;

}
