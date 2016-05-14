var auth = undefined;

function load(authentication){

	if(authentication){
		auth = authentication;
	}
	
	document.body.removeChild(spinner);
	$(".lean-overlay").animate({'opacity': '0.0'}, 400, 'linear', function(){
		$(".lean-overlay").remove();
	});
	
	getScript("youtubeAPIv3", "youtubeAPIv3", function(){
		getScript("headerUtils", "header", function(){
			getHeader();
			var page = readQuery();			
		});
	});
	
}

function readQuery(){
	
	var params = {};
	var queryString = location.hash.substring(1);
	var regex = /([^&=]+)=([^&]*)/g;
	var m;

	while(m = regex.exec(queryString)){
		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}
	
	if(params.hasOwnProperty('channel')){
		return getChannelPage(params['channel'], params);
	}else{
		return getPage(params);
	}
	
}

function getChannelPage(channel, params){
	
	if(params.hasOwnProperty('video')){
		if(params.hasOwnProperty('innerPage')){
			return new Page(pageLoadHandleVideo(channel, params['video'], params['innerPage']))
		}else return new Page(pageLoadHandleVideo(channel, params['video'], 'main'));
	}else if(params.hasOwnProperty('playlist')){
		if(params.hasOwnProperty('innerPage')){
			return new Page(pageLoadHandlePlaylist(channel, params['playlist'], params['playlistTrack'], params['playlistShuffle'], params['innerPage']))
		}else return new Page(pageLoadHandlePlaylist(channel, params['playlist'], params['playlistTrack'], params['playlistShuffle'], 'main'));
	}else if(params.hasOwnProperty('innerPage')){
		return new Page(pageLoadHandleChannel(channel, params['innerPage']))
	}else return new Page(pageLoadHandleChannel(channel, 'main'));

}


function getPage(params){
	
	getScript('pageManager', 'pages');
		
	if(params.hasOwnProperty('innerPage')){
		return new Page(pageLoadHandle(params['innerPage']))
	}else return new Page(pageLoadHandle('main'));
	
}