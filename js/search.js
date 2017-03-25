UIManager.prototype.loadSearchButton = function(){

    var $searchButton = $(".search-button");
    var searchButton = $searchButton.get(0);
    this.searchBar = false;

    $searchButton.click((e) => {
        this.searchBar = true;
        var $navWrapper = $(".nav-wrapper");
        var navWrapper = $navWrapper.get(0);

        var searchButtonRect = searchButton.getBoundingClientRect();
        var wave = this.generateNewElement("div", ["searchEffectRipple"], undefined, navWrapper, {
            "left": (searchButtonRect.left + e.pageX) + "px",
            "top": (-150 + (e.pageY - $(body).scrollTop() - searchButtonRect.top)) + "px"
        });
                         
        $(".search-icon-hide").css({"opacity": 1}).animate({"opacity": 0}, 300, "linear", () => {
            $(".search-icon-hide").css({"opacity": "", "display": "none"});
            $(".search-icon-show").css({"opacity": 0, "display": ""}).animate({"opacity": 1}, 300, "linear", () => {
                $(".search-icon-show").css({"opacity": ""});
                $("#searchInput").focus();
            });
        });
        
        setTimeout(function() {
            $(wave).remove();
            $("nav").css({"background-color": "#D6D6D6"}); 
        }, 300);
    });

}

UIManager.prototype.unloadSearchBar = function(){

    if(this.searchBar){
        this.searchBar = false;
        $(".search-icon-hide").css({"opacity": 0, "display": ""}).animate({"opacity": 1}, 300, "linear", () => {
            $(".search-icon-hide").css({"opacity": ""});
            $(".search-icon-show").css({"opacity": 1}).animate({"opacity": 0}, 300, "linear", () => {
                $(".search-icon-show").css({"opacity": "", "display": "none"});
            });
        });
        $("nav").animate({"background-color": "#FF4646"}, 600, "linear", () => {});
    }

}