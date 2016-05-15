var header = undefined;

function Header(){
	
	this.tabsInitialized = false;
	this.tabsUl = undefined;
	this.breadcrumbsDiv = undefined;
	
	var navbarFixed = newDiv("white z-depth-2");
	$(navbarFixed).css({'height': '128px', 'height-min': '128px', 'width': '100%', 'position': 'fixed'});
	
	var navWrapper = newDiv("");
	
	var topRow = this.getHeaderTopRow();
	var bottomRow = this.getHeaderBottomRow();

	//NAV
	navWrapper.appendChild(topRow);
	navWrapper.appendChild(bottomRow);
	navbarFixed.appendChild(navWrapper);
	document.body.appendChild(navbarFixed);
	
	header = navbarFixed;
	
}

Header.prototype.getHeaderTopRow = function(){
	
	var topRow = newDiv("row");
	$(topRow).css({'margin-bottom': '0px'});
	
	topRow.appendChild(this.getHeaderSearchColumnDesktop());
	
	return topRow;
	
}

Header.prototype.getHeaderBottomRow = function(){
	
	var bottomRow = newDiv("row");
	
	var breadcrumbsColumn = newDiv("col s6 hide-on-med-and-down");
	this.breadcrumbsDiv = breadcrumbsColumn;
	
	var tabsColumn = newDiv("col s12 m8 offset-m2");
	var tabs = document.createElement("ul");
	this.tabsUl = tabs;
	$(tabs).attr("class", "tabs white");
	
	//Bottom row
	bottomRow.appendChild(breadcrumbsColumn);
	tabsColumn.appendChild(tabs);
	bottomRow.appendChild(tabsColumn);
	
	return bottomRow;
	
}

Header.prototype.getHeaderSearchColumnDesktop = function(){
	
	var topRowSearchColumn = newDiv("col s12 hide-on-small-only");
	
	var inputRow = newDiv("row");
	
	var inputColumnInputWrapper = newDiv("col s10 l11");
	var inputInput = document.createElement("input");
	$(inputInput).attr({'class': 'black-text validate', 'type': 'text'});
	inputInput.id = "searchTextInput";
	
	var inputColumnIconWrapper = newDiv("center-align col s2 l1");
	$(inputColumnIconWrapper).height = "100%";
	
	var inputGoButton = document.createElement("a");
	$(inputGoButton).attr('class', 'waves-effect waves-light btn red');
	$(inputGoButton).css({'margin-top': '5px'});
	
	var inputIcon = this.getIcon("search", true);
	
	//Search column	
	inputGoButton.appendChild(inputIcon);
	
	inputColumnInputWrapper.appendChild(inputInput);
	inputColumnIconWrapper.appendChild(inputGoButton);
	
	inputRow.appendChild(inputColumnInputWrapper);
	inputRow.appendChild(inputColumnIconWrapper);
	
	topRowSearchColumn.appendChild(inputRow);
	
	return topRowSearchColumn;
	
}

Header.prototype.getIcon = function(iconName, black){
	
	if(black){
		var inputIcon = document.createElement("i");
		$(inputIcon).attr({'class': 'material-icons black-text'});
		
		var iconText = document.createTextNode(iconName);
		
		inputIcon.appendChild(iconText);
		return inputIcon;
	}else{
		var inputIcon = document.createElement("i");
		$(inputIcon).attr({'class': 'material-icons white-text'});
		
		var iconText = document.createTextNode(iconName);
		
		inputIcon.appendChild(iconText);
		return inputIcon;
	}
	
}

Header.prototype.updateHeaderTabs = function(tabs, selected){
	
	var tabLis = tabsUl.childNodes;
	
	for(i = 0; i < tabLis.length; i ++){
		tabsUl.removeChild(tabLis[i]);
	}
	
	for(i = 0; i < tabs.length; i++){
		var curLi = tabLis[i];
		
		tabsUl.appendChild(curLi);	
		
		if(curLi.id == selected){
			$(curLi).attr({'class': 'active'});
		}
	}
	
	$(tabsUl).tabs('select-tab', selected);
	
	if(!this.tabsInitialized){
		$(tabsUl).tabs();
		this.tabsInitialized = true;
	}
	
}

Header.prototype.updateHeaderBreadcrumbs = function(breadcrumbs){
	
	if(breadcrumbs){
		
	}else{
		
	}
	
}