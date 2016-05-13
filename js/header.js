function getHeader(){
	
	var navbarFixed = newDiv("navbar-fixed");
	$(navbarFixed).css({'height': '128px', 'height-min': '128px'});
	
	var nav = document.createElement("nav");
	
	var navWrapper = newDiv("nav-wrapper white");
	
	var topRow = getHeaderTopRow();
	var bottomRow = getHeaderBottomRow();

	//NAV
	navWrapper.appendChild(topRow);
	navWrapper.appendChild(bottomRow);
	nav.appendChild(navWrapper);
	navbarFixed.appendChild(nav);
	document.body.appendChild(navbarFixed);
	
}

function getHeaderTopRow(){
	
	var topRow = newDiv("row");

	var topRowBrandLogoColumn = newDiv("col s2");
	
	var brandLogoWrapper = document.createElement("a");
	$(brandLogoWrapper).attr("class", "brand-logo");
	var brandLogo = document.createElement("img");
	
	//Brand column
	brandLogoWrapper.appendChild(brandLogo);
	topRowBrandLogoColumn.appendChild(brandLogoWrapper);
	topRow.appendChild(topRowBrandLogoColumn);
	topRow.appendChild(getHeaderSearchColumnDesktop());	

	brandLogo.addEventListener("load", function(){
		$(brandLogo).css({'height': '64px', 'width': '64px'});
	}, false);
	
	brandLogo.src = "img/YtLogo.png";
	
	return topRow;
	
}

function getHeaderBottomRow(){
	
	var bottomRow = newDiv("row");
	
	var breadcumbsColumn = newDiv("col s6 hide-on-med-and-down");
	
	var tabsColumn = newDiv("col s12 m8 offset-m2");
	var tabs = document.createElement("ul");
	$(tabs).attr("class", "tabs white");
	
	//Bottom row
	bottomRow.appendChild(breadcumbsColumn);
	tabsColumn.appendChild(tabs);
	bottomRow.appendChild(tabsColumn);
	
	return bottomRow;
	
}

function getHeaderSearchColumnDesktop(){
	
	var topRowSearchColumn = newDiv("col s12 hide-on-med-and-down");
	$(topRowSearchColumn).css({'margin-left': '70px'});
	
	var searchColumnBarLeft = newDiv("");
	$(searchColumnBarLeft).css({"height": "100%", "border-left": "1px solid"});
	
	var inputRow = newDiv("row");
	
	var inputColumnInputWrapper = newDiv("col s12");
	var inputInput = document.createElement("input");
	$(inputInput).attr({'class': 'black-text'})
	var inputIcon = getIcon("search", true);
	
	var searchColumnBarRight = newDiv("");
	$(searchColumnBarRight).css({"height": "100%", "border-left": "1px solid"});
	
	//Search column
	inputColumnInputWrapper.appendChild(inputInput);
	inputColumnInputWrapper.appendChild(inputIcon);
	
	inputRow.appendChild(inputColumnInputWrapper);
	inputRow.appendChild(inputIcon);
	
	topRowSearchColumn.appendChild(searchColumnBarLeft);
	topRowSearchColumn.appendChild(inputRow);
	topRowSearchColumn.appendChild(searchColumnBarRight);
	
	return topRowSearchColumn;
	
}

function getIcon(iconName, black){
	
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

function updateHeaderTabs(tabs){
	
}

function updateHeaderBreadcumbs(breadcumbs){
	
	if(breadcumbs){
		
	}else{
		
	}
	
}