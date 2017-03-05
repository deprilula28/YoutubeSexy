window.onload = () => {
  $(".button-collapse").sideNav();
}

var dark = true;

function toggleTheme(){

  dark = !dark;
  console.log("Now using theme where dark = " + dark);

  if(dark){
      $("body").addClass("grey").addClass("darken-2");
      $(".nav-wrapper-right-align .chip").addClass("grey").addClass("darken-2");
      $(".nav-wrapper-right-align .chip a").removeClass("black-text").addClass("white-text");
  }else{
      $("body").removeClass("grey").removeClass("darken-2");
      $(".nav-wrapper-right-align .chip").removeClass("grey").removeClass("darken-2");
      $(".nav-wrapper-right-align .chip a").removeClass("white-text").addClass("black-text");
  }

}
