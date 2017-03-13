function UIManager(){

  this.darkThemed = true;
  this.breadcrumbs = [new Breadcrumb("Home", () => {
    console.log("Setting up homepage");
    $("nav").animate({"background-color": "#3f51b5"});
  }, undefined)];

}

UIManager.prototype.addToBreadcrumbs = function(handleVisit, handleLeave, name){

  var breadcrumbIndex = this.breadcrumbs.length;
  var breadcrumbEl = new Breadcrumb(name, handleVisit, handleLeave);
  this.breadcrumbs.push(breadcrumbEl);
  var lastBreadcrumb = $(".last-breadcrumb");

  var newBreadcrumb = document.createElement("a");
  $(newBreadcrumb).addClass("last-breadcrumb").addClass("breadcrumb").addClass("waves-effect").addClass("waves-light");
  breadcrumbEl.element = newBreadcrumb;
  console.log("breadcrumbs:", this.breadcrumbs);
  newBreadcrumb.textContent = name;
  newBreadcrumb.onclick = () => {
    this.onClickBreadcrumb(breadcrumbIndex, breadcrumbEl);
  };
  lastBreadcrumb.get(0).parentNode.insertBefore(newBreadcrumb, lastBreadcrumb.nextSibling);
  lastBreadcrumb.removeClass("last-breadcrumb");

  return breadcrumbEl;

}

UIManager.prototype.gotoBreadcrumbState = function(breadcrumbs){

  $(".breadcrumb").remove();
  console.log("Loading breadcrumb state:", breadcrumbs, "Previous:", this.breadcrumbs);
  this.breadcrumbs = breadcrumbs;

  var lastBreadcrumb = undefined;

  for(var breadcrumbIndex in breadcrumbs){
    var breadcrumb = breadcrumbs[breadcrumbIndex];

    var newBreadcrumb = document.createElement("a");
    $(newBreadcrumb).addClass("breadcrumb").addClass("waves-effect").addClass("waves-light");
    breadcrumb.element = newBreadcrumb;
    newBreadcrumb.textContent = breadcrumb.name;
    newBreadcrumb.onclick = () => {
      this.onClickBreadcrumb(breadcrumbIndex, breadcrumb)
    };
    if(lastBreadcrumb) lastBreadcrumb.parentNode.insertBefore(newBreadcrumb, lastBreadcrumb.nextSibling);
    else $(".placeholder-breadcrumb").get(0).parentNode.insertBefore(newBreadcrumb, $(".placeholder-breadcrumb").get(0).nextSibling);

    lastBreadcrumb = newBreadcrumb;
  }

  $(lastBreadcrumb).addClass("last-breadcrumb");

}

UIManager.prototype.onClickBreadcrumb = function(arrayIndex, breadcrumb){

  console.log("Last breadcrumb:")
  console.log(this.breadcrumbs[this.breadcrumbs.length - 1]);
  if(this.breadcrumbs[this.breadcrumbs.length - 1].handleLeave) this.breadcrumbs[this.breadcrumbs.length - 1]
    .handleLeave();
  breadcrumb.handleVisit();

  console.log("Slicing from 0 to " + arrayIndex);
  this.gotoBreadcrumbState(this.breadcrumbs.slice(0, arrayIndex + 1));

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

function Breadcrumb(name, handleVisit, handleLeave){

  this.name = name;
  this.handleVisit = handleVisit;
  this.handleLeave = handleLeave;
  this.element = undefined;

}

Breadcrumb.prototype.setName = function(name){

  this.name = name;
  this.element.textContent = name;

}