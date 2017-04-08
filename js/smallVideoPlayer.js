UIManager.prototype.animateVideoIFrameSizing = function(){

    var $element = $(".smallVideoPlayerWindowWrapper");
    $element.animate({"width": "450px", "height": "253.13px", "top": ($(window).height() - 306.13) + "px", "left": ($(window).width() - 475) + "px"});

}

UIManager.prototype.resizeIFrame = function(){

    var $element = $(".smallVideoPlayerWindowWrapper");
    $element.css({"width": "450px", "height": "253.13px", "top": ($(window).height() - 306.13) + "px", "left": ($(window).width() - 475) + "px"});

}