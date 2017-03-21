UIManager.prototype.loadSidebarPanelNoAuth = function(){

  console.log("Asked to load sidebar panel without authentication.");
  var uiMan = youtubeSexy.ui;
  this.uiMan = uiMan;
  var sidebar = $("#sidebar").get(0);
  this.sidebar = sidebar;

  this.addButton("Home", () => {
    if(handleLeave) handleLeave();
    $("nav").animate({"background-color": "#3f51b5"});
  });

  this.addButton("Options", () => {
    
  });

}

UIManager.prototype.addButton = function(name, handleClicked){

  var li = this.uiMan.generateNewElement("li", ["bold"], undefined, this.sidebar, undefined);
  var btn = this.uiMan.generateNewElement("a", ["waves-effect", "waves-dark"], name, li, undefined);
  btn.onclick = handleClicked;

}

UIManager.prototype.loadSidebarPanelAuthenticated = function(){

  console.log("Asked to load sidebar panel with authentication.");
  var uiMan = youtubeSexy.ui;
  this.uiMan = uiMan;
  var sidebar = $("#sidebar").get(0);
  this.sidebar = sidebar;

  this.addButton("Home", () => {
    if(handleLeave) handleLeave();
    $("nav").animate({"background-color": "#3f51b5"});
  });

}
