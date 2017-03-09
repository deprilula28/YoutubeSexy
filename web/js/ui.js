function UIManager(){

  this.darkThemed = true;
  this.breadcrumbs = {"Home": () => {
    youtubeSexy.gotoHome()}
  };

}

UIManager.prototype.addToBreadcrumbs = function(handle, name){

  this.breadcrumbs.name = handle;
  var lastBreadcrumb = $(".last-breadcrumb");
  lastBreadcrumb.removeClass("last-breadcrumb");

  var newBreadcrumb = document.createElement("a");
  $(newBreadcrumb).addClass("last-breadcrumb").addClass("breadcrumb").addClass("waves-effect").addClass("waves-light");
  newBreadcrumb.textContent = name;
  newBreadcrumb.onClick = handle;
  lastBreadcrumb.parentNode.insertBefore(newBreadcrumb, lastBreadcrumb.nextSibling);

}

UIManager.prototype.gotoBreadcrumbState = function(breadcrumbs){

  $(".bredcrumb:not(.home-breadcrumb)").remove();
  this.breadcrumbs = breadcrumbs;

  var lastBreadcrumb = $(".home-breadcrumb").get(0);

  jQuery.each(breadcrumbs, (handle, name) => {
    if(page == "homePage" && name == "Home") return;

    var newBreadcrumb = document.createElement("a");
    $(newBreadcrumb).addClass("breadcrumb").addClass("waves-effect").addClass("waves-light");
    newBreadcrumb.textContent = name;
    newBreadcrumb.onClick = handle;
    lastBreadcrumb.parentNode.insertBefore(newBreadcrumb, lastBreadcrumb.nextSibling);

    lastBreadcrumb = newBreadcrumb;
  });

  $(lastBreadcrumb).addClass("last-breadcrumb");

}

UIManager.prototype.toggleTheme = function(){

  this.darkThemed = !this.darkThemed;

  if(this.darkThemed){
      $("body").animate({"background-color": "#FFFFFF"}, 100, "linear", () => {
        $("body").addClass("grey").addClass("darken-3");
        $("body").css("background-color", "");
        $("#authenticateButton").removeClass("waves-light");
        $(".nav-wrapper-right-align .chip a").removeClass("black-text").addClass("white-text");
      });

      $(".videoNameTextComponent").addClass("white-text").removeClass("black-text");
      $(".nav-wrapper-right-align .chip").addClass("grey").addClass("darken-3");
  }else{
      $("body").animate({"background-color": "#424242"}, 100, "linear", () => {
        $("body").css("background-color", "");
        $("body").removeClass("grey").removeClass("darken-3");
        $("#authenticateButton").addClass("waves-light");
        $(".videoNameTextComponent").removeClass("white-text").addClass("black-text");
      });

      $(".nav-wrapper-right-align .chip").removeClass("grey").removeClass("darken-3");
      $(".nav-wrapper-right-align .chip a").removeClass("white-text").addClass("black-text");
  }

}

UIManager.prototype.createCirclePreloaderDIV = function(color, size){

  var classes = ["preloader-wrapper", "active"];
  if(size) classes.push(size);

  var wrapper = this.generateNewElement("div", classes, undefined, undefined, undefined);
  var layer = this.generateNewElement("div", ["spinner-layer", "spinnner-" + color + "-only"], undefined, wrapper, undefined);
  var circleClipperWrapper = this.generateNewElement("div", ["circle-clipper", "left"], undefined, layer, undefined);
  var circleClipper = this.generateNewElement("div", ["circle"], undefined, circleClipperWrapper, undefined);
  var circleGapPatchWrapper = this.generateNewElement("div", ["gap-patch"], undefined, layer, undefined);
  var circleGapPatch = this.generateNewElement("div", ["circle"], undefined, circleGapPatchWrapper, undefined);


  return wrapper;

}
