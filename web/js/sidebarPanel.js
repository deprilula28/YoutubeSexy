UIManager.prototype.loadSidebarPanelNoAuth = function(){

  console.log("Asked to load sidebar panel without authentication.");
  var uiMan = youtubeSexy.ui;
  var sidebar = $("#sidebar").get(0);
  this.sidebar = sidebar;

  this.addButton("Home", () => {
    youtubeSexy.ui.onClickBreadcrumb(0, youtubeSexy.ui.breadcrumbs[0]);
  });

}

UIManager.prototype.addButton = function(name, handleClicked){

  var li = uiMan.generateNewElement("li", ["bold"], undefined, this.sidebar, undefined);
  var btn = uiMan.generateNewElement("a", ["waves-effect", "waves-dark"], name, li, undefined);
  btn.onclick = handleClicked;

}

UIManager.prototype.loadSidebarPanelAuthenticated = function(){

  console.log("Asked to load sidebar panel with authentication.");

}
