var Modal = function(){
	
	this.divModal = newDiv("modal");
	this.divModalContent = newDiv("modal-content");
	this.divModalFooter = newDiv("modal-footer");
	
	divModal.appendChild(divModalContent);
	divModal.appendChild(divModalFooter);
	document.body.appendChild(divModal);
	
}

Modal.prototype.open = function(){
	
	$(divModal).openModal();
	
}

Modal.prototype.close = function(){
	
	$(divModal).closeModal();
	
}

Modal.prototype.addElementContent = function(element){
	
	divModalContent.appendChild(element);
	
}

Modal.prototype.destroy = function(){
	
	delete this;
	
}

Modal.prototype.addFooterButton = function(left, text, buttonHandler){
	
	var side = "right";
	if(left) side = "left";
	
	var element = document.createElement("a");
	$(element).attr("class", side + " waves-effect waves-red btn-flat");
	
	var txtNode = document.createTextNode(text);
	element.appendChild(txtNode);
	
	$(element).css({'color': '#000000'});
	addElementContent(element);
	
	if(buttonHandler){
		a.addEventListener("click", buttonHandler, false);
	}
	
}