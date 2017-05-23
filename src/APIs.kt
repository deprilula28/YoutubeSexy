import jquery.MouseClickEvent
import jquery.MouseEvent
import kotlin.js.Json

external fun stackBlurImage(imageID: String, canvasID: String, radius: Int, blurAlphaChannel: Int)
external fun `$`(query: dynamic): `$`
external fun setTimeout(callback: () -> Unit, time: Number)
external fun decodeURIComponent(encodedURIComponent: String): String

external class `$` {
    fun css(json: Json): `$`
    fun animate(json: Json): `$`
    fun animate(json: Json, time: Number, animation: String, callback: () -> Unit): `$`
    fun remove(): `$`

    fun addClass(className: String): `$`
    fun addClass(f: (Int, String) -> String): `$`

    fun attr(attrName: String): String
    fun attr(attrName: String, value: String): `$`

    fun html(): String
    fun html(s: String): `$`
    fun html(f: (Int, String) -> String): `$`


    fun hasClass(className: String): Boolean
    fun removeClass(className: String): `$`
    fun height(): Number
    fun width(): Number

    fun click(): `$`

    fun mousedown(handler: (MouseEvent) -> Unit): `$`
    fun mouseup(handler: (MouseEvent) -> Unit): `$`
    fun mousemove(handler: (MouseEvent) -> Unit): `$`

    fun dblclick(handler: (MouseClickEvent) -> Unit): `$`
    fun click(handler: (MouseClickEvent) -> Unit): `$`

    fun load(handler: () -> Unit): `$`
    fun change(handler: () -> Unit): `$`

    fun append(str: String): `$`
    fun ready(handler: () -> Unit): `$`
    fun text(text: String): `$`
    fun slideUp(): `$`
    fun hover(handlerInOut: () -> Unit): `$`
    fun hover(handlerIn: () -> Unit, handlerOut: () -> Unit): `$`
    fun next(): `$`
    fun parent(): `$`
    fun `val`(): String?
}