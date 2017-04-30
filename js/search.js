UIManager.prototype.loadSearchButton = function(){

    var $searchButton = $(".search-button");
    var searchButton = $searchButton.get(0);
    this.searchBar = false;

    $searchButton.click(function(e){
        this.searchBar = true;
        var $navWrapper = $(".nav-wrapper");
        var navWrapper = $navWrapper.get(0);

        var searchButtonRect = searchButton.getBoundingClientRect();
        var wave = this.generateNewElement("div", ["searchEffectRipple"], undefined, navWrapper, {
            "left": (e.pageX) + "px",
            "top": (-150 + (e.pageY - $(document.body).scrollTop() - searchButtonRect.top)) + "px"
        });
        $(".search-icon-show-row").css({"display": "block"});
        $(".searchEffectRipple").get(0).appendChild($(".search-icon-show").get(0));
        
        setTimeout(function() {
            $(".search-icon-show-wrapper").get(0).appendChild($(".search-icon-show").get(0));
            $(wave).remove();
            $("nav").css({"background-color": "#D6D6D6"}); 
                $("#searchInput").focus().focusout(function(){
                    youtubeSexy.ui.unloadSearchBar();
                });
        }, 300);
    });

}

UIManager.prototype.unloadSearchBar = function(){

    if(this.searchBar){
        this.searchBar = false;
        $(".search-icon-hide").css({"opacity": 0, "display": ""}).animate({"opacity": 1}, 300, "linear", function(){
            $(".search-icon-hide").css({"opacity": ""});
            $(".search-icon-show-row").css({"display": ""});
            $(".search-icon-show").css({"opacity": 1}).animate({"opacity": 0}, 300, "linear", function(){
                $(".search-icon-show").css({"opacity": "", "display": "none"});
            });
        });
        $("nav").css({"height": "64px"}).animate({"background-color": "#d40000"}, 100, "linear", function(){
			$("nav").css({"background-color": "#d40000"});
		});
    }

}