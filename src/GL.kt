import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLImageElement
import org.w3c.dom.RenderingContext
import kotlin.browser.document
import kotlin.browser.window

class GL {

    val canvas = document.getElementById("thumbnailBackgroundOverlayCanvasObj") as HTMLCanvasElement
    val blur: BlurMethod
    val glContext: RenderingContext?

    init {
        glContext = canvas.getContext("webgl") ?: canvas.getContext("experimental-webgl")

        if (glContext == null) {
            blur = StackBlur()
        } else {
            blur = WebGLBlur()
        }
    }

}

class StackBlur: BlurMethod {

    override fun blur(image: HTMLImageElement, gl: GL) {
        image.id = "thumbnailBackgroundOverlayCanvasImgSrc"
        stackBlurImage("thumbnailBackgroundOverlayCanvasImgSrc", gl.canvas.id, 20, 255)

        val ctx = gl.canvas.getContext("2d") as CanvasRenderingContext2D
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)"
        val window = `$`(window)
        ctx.fillRect(0.0, 0.0, window.height().toDouble() * 3, window.width().toDouble() * 3)
    }

}

class WebGLBlur: BlurMethod {

    override fun blur(image: HTMLImageElement, gl: GL) {

    }

}

interface BlurMethod {

    fun blur(image: HTMLImageElement, gl: GL)

}