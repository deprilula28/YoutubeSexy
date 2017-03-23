function ScrollingNumberText(text, masterElement, classes){
	
	this.numberValues = [];
	var baseDIV = youtubeSexy.ui.generateNewElement("div", undefined, undefined, masterElement, {"margin-bottom": "0px", "display": "inline"});
	
	for(var i = 0, len = text.length; i < len; i++){
	  var char = text[i];
	  if(isNan(char)){
	  	youtubeSexy.ui.generateNewElement("a", classes, char, baseDIV, undefined);
	  	continue;
	  }
		
	  var enclosingDIV = youtubeSexy.ui.generateNewElement("div", undefined, undefined, baseDIV, {"overflow-y": "hidden", "display": "inline"});
	  
	  this.numberValues.push(enclosingDIV);
	}
	
}