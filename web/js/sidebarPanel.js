UIManager.prototype.loadSidebarPanelNoAuth = function(){

  console.log("Asked to load sidebar panel without authentication.");
  var uiMan = youtubeSexy.ui;
  this.uiMan = uiMan;
  var sidebar = $("#sidebar").get(0);
  this.sidebar = sidebar;

  this.loadBasics();

}

UIManager.prototype.unloadSidebar = function(){

  $("#sidebar").empty();

}

UIManager.prototype.loadBasics = function(){

  this.addButton("Home", function(){
    if(handleLeave){
      handleLeave(function(){
        console.log("Going home");
        $("nav").css({"height": "64px"}).animate({"background-color": "#d40000"}, 100, "linear", function(){
          $("nav").css({"background-color": "#d40000"});
        });
        $("#main-page").css({"opacity": ""});
      });
      handleLeave = undefined;
    }else console.log("Already home");
  });

  this.addButton("Options", function(){
    console.log("Opening options panel");
  	$("#optionModal").modal("open");
  });

}

UIManager.prototype.addButton = function(name, handleClicked){

  var li = this.uiMan.generateNewElement("li", ["bold"], undefined, this.sidebar, undefined);
  var btn = this.uiMan.generateNewElement("a", ["waves-effect", "waves-dark"], name, li, undefined);
  btn.onclick = function(){
    handleClicked();
  }

}

UIManager.prototype.loadSidebarPanelAuthenticated = function(){

  console.log("Asked to load sidebar panel with authentication.");
  var uiMan = youtubeSexy.ui;
  this.uiMan = uiMan;
  var sidebar = $("#sidebar").get(0);
  this.sidebar = sidebar;

  this.loadBasics();

}
