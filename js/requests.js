function makeRequest(url, completeHandler){
	
	var request = new XMLHttpRequest();
	var received = false;
	
	request.open('GET', url, false);
	request.onreadystatechange = function(e){
		
		if(!received && request.readyState == 4){
			received = true;
			completeHandler(request);
		}
			
	}
	
	request.send(null);
	
}