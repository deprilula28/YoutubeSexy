
YoutubeSexy.prototype.playVideo = function(videoResult, mouseX, mouseY, thumbnail){

  if(this.playing == videoResult.id){
    console.log("Attempted to open video already playing!");
    return;
  }

  if(handleLeave) handleLeave();
  this.playing = videoResult.id;
  $(".top-text").get(0).textContent = videoResult.snippet.title;
  console.log("Preparing to play video...");

  $("body").css({"overflow": "hidden"});
  $("#content-page").empty();

  handleLeave = () => {
    $("#content-page").animate({"opacity": 0});
    $("body").css({"overflow": ""});
    $("nav").css({"height": "64px"}).animate({"background-color": "#3f51b5"});

    setTimeout(() => {
    	$("#content-page").get(0).appendChild($("#youtubePage").get(0));
      $("#content-page").css({"display": "none", "opacity": 1}).empty();
    }, 500);
    $(".top-text").get(0).textContent = "Home";
  };

  //Appear animation
  if(mouseX && mouseY){
    $("#content-page").css({"display": "none"});

    //var vibrant = new Vibrant(thumbnail);
    //var swatches = vibrant.swatches();
    //console.log("Vibrant color: " + this.vibrantColor + ", all swatches:", swatches);

    //$("nav").animate({"background-color": swatches.DarkVibrant.getHex()});

    $(".videoCircleAnimation").css({"display": "block", "top": (mouseY - 5) + "px", "left": (mouseX - 5) + "px", "width": "10px",
      "height": "10px"/*, "background-color": swatches.DarkVibrant.getHex()*/}).animate({"top": (mouseY - $(window).height()) + "px",
      "left": (mouseX - $(window).width()) + "px", "width": Math.max($(window).height(), $(window).width()) + "px",
      "height": Math.max($(window).height(), $(window).width()) + "px"}, 500, "linear", () => {
        $(".videoCircleAnimation").animate({"opacity": 0}, 100, "linear", () => { $(".videoCircleAnimation").css({"display": "none"})});
    		$("#content-page").animate({"opacity": 1});
      });
  }
  
  //Content page filing
  $("#youtubeVideoTabs").tabs();

}

YoutubeSexy.prototype.usePlaylist = function(playlistId){

  this.playlist = playlistId;

}
