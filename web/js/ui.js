function UIManager(){

  this.darkThemed = true;

}

UIManager.prototype.toggleTheme = function(){

  this.darkThemed = !this.darkThemed;

  if(this.darkThemed){
      $("body").animate({"background-color": "#FFFFFF"}, 100, "linear", function(){
        $("body").addClass("grey").addClass("darken-3");
        $("body").css("background-color", "");
        $("#authenticateButton").removeClass("waves-light");
        $(".nav-wrapper-right-align .chip a").removeClass("black-text").addClass("white-text");
      });

      $(".videoNameTextComponent").addClass("white-text").removeClass("black-text");
      $(".nav-wrapper-right-align .chip").addClass("grey").addClass("darken-3");
  }else{
      $("body").animate({"background-color": "#424242"}, 100, "linear", function(){
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

UIManager.prototype.generateNewElement = function(type, classes, textContent, master, css){

  var element = document.createElement(type);
  var jqueryElement = $(element);
  if(classes){
    for(var classCur in classes) jqueryElement.addClass(classes[classCur]);
  }
  if(textContent) element.textContent = textContent;
  if(master) master.appendChild(element);
  if(css) jqueryElement.css(css);
  
  return element;

}
