var googleModal;

function doAuth(){
	
	getScript("cookieManagement", "cookies", function(){
		setCookie("googleAuthenticate", "true");
		window.location = getURL();
	});

}

function checkGoogleAuthenticated(nonAuthed){

	var params = {};
	var queryString = location.hash.substring(1);
	var regex = /([^&=]+)=([^&]*)/g, m;
	
	while(m = regex.exec(queryString)){
		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}

	if(params['access_token'] == undefined){
		nonAuthed();
	}else{
		validateToken(params['access_token']);
	}

}

function getURL(){

	return "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope="
			+ getScope()
			+ "&client_id=143036117535-r44koj2e0bf9emon2k6kc18g6pkgorh1.apps.googleusercontent.com&redirect_uri=https://deprilula28.github.io/projectPages/youtubeSexy/googleAuthComeback.html";

}

function getScope(){

	return "https://www.googleapis.com/auth/yt-analytics.readonly%20https://www.googleapis.com/auth/yt-analytics-monetary.readonly%20https://www.googleapis.com/auth/youtube%20https://www.googleapis.com/auth/youtube.readonly" +
			"%20https://www.googleapis.com/auth/youtube.upload%20https://www.googleapis.com/auth/youtubepartner";
	
}

function validateToken(token){

	makeRequest(
			"https://www.googleapis.com/oauth2/v3/tokeninfo?" + token,
			function(req){

				if(req.status == 200){
					loadWebsite(token);
				}else if(req.status == 400){
					var json = JSON.parse(req.responseText);
					retryMessage("An error occured with value 400 from the Google APIs, returned with error message \""
							+ json['error'] + "\". Do you want to retry?");
				}else{
					retryMessage();
				}

			});

}

function retryMessage(message){

}