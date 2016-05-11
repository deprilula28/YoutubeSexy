var googleModal;

function doAuth(){

	googleModal = new Modal();

	var iframe = document.createElement("iframe");
	iframe.height = (window.innerHeight /4)
	
	var spinnerWrapper = newDiv("center-align");
	var spinner = getSpinner('medium');
	spinnerWrapper.appendChild(spinner);
	
	iframe.addEventListener("load", function(){
		 $(spinner).remove();
		 $(iframe).css({'display': 'block'});
	}, false);
	
	googleModal.addElementContent(spinnerWrapper);
	iframe.src = getURL();
	
	window.addEventListener("message", receiveMessage, false);
	googleModal.open();

}

function getNonce(){
	
	var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	
	var nonce = '';
	for(var i = 24; i > 0; --i)
		nonce += mask[Math.floor(Math.random() * mask.length)];
	
}

function getURL(){

	return "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=" + getScope() + "&client_id=143036117535-r44koj2e0bf9emon2k6kc18g6pkgorh1.apps.googleusercontent.com&redirect_url=https://https://deprilula28.github.io/projectPages/youtubeSexy/googleAuthComeback.html";

}

function getScope(){
	
	
	
}

function receiveMessage(event){
	
	var origin = event.origin || event.originalEvent.origin;
	
	if(origin !== "https://deprilula28.github.io/projectPages/youtubeSexy/googleAuthComeback.html")
		return;
	
	event.source.postMessage("success");
	googleModal.close();
	
	var params = {};
	var queryString = event.data;
	var regex = /([^&=]+)=([^&]*)/g, m;
	
	while (m = regex.exec(queryString)){
		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}
	
	validateToken(params['access_token']);
	
}

function validateToken(token){
	
	makeRequest("https://www.googleapis.com/oauth2/v3/tokeninfo?" + token, function(req){
		
		if(req.status == 200){
			loadWebsite(token);
		}else if(req.status == 400){
			var json = JSON.parse(req.responseText);
			retryMessage("An error occured with value 400 from the Google APIs, returned with error message \"" + json['error'] + "\". Do you want to retry?");
		}else{
			retryMessage();
		}
		
	});
	
}

function retryMessage(message){
	
}