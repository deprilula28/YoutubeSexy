$(document).ready(function(){
	
	var spinner = makeStartSpinner();
	
	getScript("googleOAuth", "google-oauth", function(){
		checkGoogleAuthenticated(function(){
			getScript("cookieManagement", "cookies", function(){
				
				var auth = getCookie("googleAuthenticate");
				
				if(auth == "true"){
					doAuth();
				}else if(auth == "false"){
					loadWebsite();
				}else{
					setupQuestionModal();
				}
			});
		});
	});
	
});

function loadWebsite(authenticationKey){
	
	getScript("youtubeSexyWebsite", "website", function(){
		load(authenticationKey);
	});
	
}

function setupQuestionModal(){
	
	getScript("modalManager", "modals", function(){
		var questionModal = new Modal();
		
		var divRowHeader = newDiv("row");
		
		var h5Header = document.createElement("h5");
		var textNodeHeader = document.createTextNode("Do you want to give permissions from Google?");
		h5Header.appendChild(textNodeHeader);
		divRowHeader.appendChild(h5Header);
		
		questionModal.addElementContent(divRowHeader);
		
		var divRowText = newDiv("row");
		
		var aBelowText = document.createElement("a");
		$(aBelowText).attr("class", "black-text");
		var textNodeA = document.createTextNode("You can give Youtube Sexy permission to use Google API with your information, to rate, comment, post videos and much more.");
		aBelowText.appendChild(textNodeA);
		divRowText.appendChild(aBelowText);
		
		questionModal.addElementContent(divRowText);
		
		questionModal.addFooterButton(true, "Yes", function(){
			
			setCookie("googleAuthenticate", "true");
			getScript("googleOAuth", "google-oauth", function(){
				doAuth();
			});
			
		});
		
		questionModal.addFooterButton(true, "No", function(){

			setCookie("googleAuthenticate", "false");
			loadWebsite();
			
		});
		
		questionModal.open();
	});
	
}

function makeStartSpinner(){
	
	var spinnerWrapper = document.createElement("div");
	$(spinnerWrapper).css({'width': '100%', 'margin-top': '40px'});
	$(spinnerWrapper).attr('class', 'center-align');
	
	var spinner = getSpinner('big');
	spinnerWrapper.appendChild(spinner);
	document.body.appendChild(spinnerWrapper);
	
	return spinnerWrapper;
	
}

function getSpinner(size){
	
	var finalSize = ' ' + size;
	
	if(size == 'medium') 
		finalSize = '';
	
	var divWrapper = newDiv('preloader-wrapper' + finalSize + ' active');
	var spinnerLayer = newSuperDiv('spinner-layer spinner-red-only', divWrapper);
	
	var circleClipperLeftWrapper = newSuperDiv('circle-clipper left', spinnerLayer);
	var circleClipperLeft = newSuperDiv('circle', circleClipperLeftWrapper);
	
	var gapPatchWrapper = newSuperDiv('gap-patch', spinnerLayer);
	var gapPatch = newSuperDiv('circle', gapPatchWrapper);
	
	var circleClipperRightWrapper = newSuperDiv('circle-clipper right', spinnerLayer);
	var circleClipperRight = newSuperDiv('circle', circleClipperRightWrapper);
	
	return divWrapper;
	
	
}

function newDiv(className){
	
	var div = document.createElement("div");
	$(div).attr('class', className);
	
	return div;
	
}

function newSuperDiv(className, superObject){
	
	var div = newDiv(className);
	superObject.appendChild(div);
	
	return div;
	
}

function getScript(scriptID, scriptName, loadHandler){
	
	if(!hasScript(scriptID)){
		var script = document.createElement("script");
		script.id = scriptID + "Script";
		
		if(loadHandler)
			script.addEventListener("load", loadHandler, false);
		
		script.src = "js/" + scriptName + ".js";
		document.body.appendChild(script);
	}else{
		if(loadHandler)
			loadHandler();
	}
		
}

function hasScript(scriptID){
	
	if($(scriptID).length > 0) return true;
	return false;
	
}