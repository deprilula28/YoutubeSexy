function simplifyNumber(numb){

  var numbString = numb + "";

  if(numb > 1000 && numb < 999999) numbString = Math.round(numb / 1000) + "K";
  else if(numb > 1000000 && numb < 999999999) numbString = Math.round(numb / 1000000) + "M";
  else if(numb > 1000000000) numbString = Math.round(numb / 1000000000) + "Bil";

  return numbString;

}

function prettifyNumber(numb){

  return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	
}

function lerp(a, b, progress){

  return a + progress * (b - a);

}

//Thanks to http://stackoverflow.com/a/488073/5572963
function isScrolledIntoView(elem){

  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));

}