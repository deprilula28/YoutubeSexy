function WebGL(){
    this.canvas = document.getElementById("thumbnailBackgroundOverlayCanvasObj");
    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');

    if(this.gl){
        console.log("Using WebGL acelerated gaussian blur.")
        WebGL.prototype.blurImageToCanvas = function(imageSourceID) {
            const ctx = this.gl;
            ctx.clearColor(0.0, 0.0, 0.0, 1.0);
            ctx.enable(ctx.DEPTH_TEST);
            ctx.depthFunc(ctx.LEQUAL);
            ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT)
        }
    }else{
        console.log("Seems like this browser does not support WebGL, fallback to StackBlur.")
        WebGL.prototype.blurImageToCanvas = function(sourceImage) {
            sourceImage.id = "thumbnailBackgroundOverlayCanvasImgSrc";
            stackBlurImage("thumbnailBackgroundOverlayCanvasImgSrc", "thumbnailBackgroundOverlayCanvasObj", 20, 255);
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            ctx.fillRect(0, 0, $(window).height() * 3, $(window).width() * 3);
            sourceImage.id = "";
        }
    }
}
