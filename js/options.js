function OptionManager(){
	
	
	
}

OptionManager.prototype.load = function(){

	var options = {};
	if(youtubeSexy.cookies.getCookie("options")) options = JSON.parse(youtubeSexy.cookies.getCookie("options"));
	this.optionsJSON = options;
	
	this.blackThemed = this.getOption("themeColor", true);
	this.subscriberCountChannelUpdateRate = this.getOption("subscriberCountChannelUpdateRate", -1); // Never default
	this.subscriberCountChannelPageUpdateRate = this.getOption("subscriberCountChannelPageUpdateRate", 2000); // 2 Seconds default
	
	this.save();
	
}

OptionManager.prototype.changeOptionInJSON = function(option, newValue){
	
	this.optionsJSON[option] = newValue;
	this.save();
	Materialize.toast("Settings saved!", 1000);
	
}

OptionManager.prototype.save = function(){
	
	youtubeSexy.cookies.setCookie("options", this.optionsJSON, 365);
	
}

OptionManager.prototype.getOption = function(name, fallback){
	
	if(this.optionsJSON && this.optionsJSON[name]) return json.name;
	else{
		this.optionsJSON[name] = fallback;
		return fallback;
	}
	
}