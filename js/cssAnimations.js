function addCSSAnimation(animationID, animationGetFunction){
	
	if(!hasCSSAnimation(animationID)){
		var cssAnimation = animationGetFunction();
		
		var styleTag = document.createElement("style");
		styleTag.id = animationID;
		
		var curPercentage = undefined;
		var baseText = "";
		
		for(i = 0; i < cssAnimation.getAnimationValues().length; i ++){
			var curVal = cssAnimation.getAnimationValues()[i];
			
			if(curVal.getPercent() == curPercentage){
				baseText += curVal.getKey + ": " + curVal.getValue + ";";
			}else{
				if(curPercentage != undefined)
					baseText += "}";

				baseText += curVal.getPercent() + "%{";
				curPercentage = curVal.getPercent()

				baseText += curVal.getKey + ": " + curVal.getValue + ";";				
			}
		}
		
		if(curPercentage != undefined)
			baseText += "}";
		
		var text = "@-webkit-keyframes " + animationID + "{" + baseText + "}@-moz-keyframes " + animationID + "{" + baseText + "}@keyframes " + animationID + "{" + baseText + "}";
		var textNode = document.createTextNode(text);
		
		styleTag.appendChild(textNode);
		document.head.appendChild(styleTag);
		
	}
	
}

function hasCSSAnimation(animationID){
	
	if($(animationID).length > 0) return true;
	return false;
	
}

function CSSAnimationValue(percent, key, value){
	
	this.percent = percent;
	this.key = key;
	this.value = value;
	
}

CSSAnimationValue.prototype.getPercent = function(){
	
	return this.percent;
	
}

CSSAnimationValue.prototype.getKey = function(){
	
	return this.key;
	
}

CSSAnimationValue.prototype.getValue = function(){
	
	return this.value;
	
}

function CSSAnimation(){
	
	this.cssAnimationValues = {};
	
}

CSSAnimation.prototype.setAnimationPercentValue = function(percent, key, value){
	
	this.cssAnimationValues[this.cssAnimationValues.length] = new CSSAnimationValue(percent, key, value);
	
}

CSSAnimation.prototype.getAnimationValues = function(){
	
	return this.cssAnimationValues;
	
}