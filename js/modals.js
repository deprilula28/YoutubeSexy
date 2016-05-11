var Modal = function(undismissible){
	
	this.undismissible = dismissible;
	this.divModal = newDiv("modal");
	this.divModalContent = newDiv("modal-content");
	this.divModalFooter = newDiv("modal-footer");
	
	this.divModal.appendChild(this.divModalContent);
	this.divModal.appendChild(this.divModalFooter);
	document.body.appendChild(this.divModal);
	
}

Modal.prototype.open = function(){
	
	if(this.undismissible){
		$(this.divModal).leanModel({'dismissible': false});
	}else{
		$(this.divModal).openModal();
	}
	
}

Modal.prototype.close = function(){
	
	$(this.divModal).closeModal();
	
}

Modal.prototype.addElementContent = function(element){
	
	this.divModalContent.appendChild(element);
	
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
	this.addElementContent(element);
	
	if(buttonHandler){
		element.addEventListener("click", buttonHandler, false);
	}
	
}