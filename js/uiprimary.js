UIManager.prototype.generateNewElement=function(e,t,n,a,r){var o=document.createElement(e),d=$(o);if(t)for(var c in t)d.addClass(t[c]);return n&&(o.textContent=n),a&&a.appendChild(o),r&&d.css(r),o};
