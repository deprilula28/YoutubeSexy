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
