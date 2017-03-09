function simplifyNumber(numb){

  var numbString = numb + "";

  if(numb > 1000 && numb < 999999) numbString = Math.round(numb / 1000) + "K";
  else if(numb > 1000000 && numb < 999999999) numbString = Math.round(numb / 1000000) + "M";
  else if(numb > 1000000000) numbString = Math.round(numb / 1000000000) + "Bil";

  return numbString;

}
