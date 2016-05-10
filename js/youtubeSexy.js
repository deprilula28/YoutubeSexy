$(document).ready(function(){
	
	var spinner = makeStartSpinner();
	
	
	
});

function checkScripts(callback){

	
	
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
		script.id = scriptId;
		
		if(loadHandler)
			script.addEventListener("load", loadHandler, false);
		
		script.src = scriptName;
	}
		
}

function hasScript(scriptID){
	
	if($(scriptID).length > 0) return true;
	return false;
	
}