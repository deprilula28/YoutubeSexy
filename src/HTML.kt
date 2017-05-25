import org.w3c.dom.HTMLElement
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.js.Json
import kotlin.js.json

abstract class HTMLBodyAppendable {

    abstract fun bind(name: String, handleFunc: (Event) -> Unit)
    abstract fun appendElement(element: HTMLElement)
    abstract fun addClass(clazz: String)
    abstract fun css(css: Json)
    abstract fun animate(css: Json)
    abstract fun animate(css: Json, time: Number, animation: String, callback: () -> Unit)
    abstract fun textInternal(str: String)

    fun load(handleFunc: (Event) -> Unit) {

        bind("load", handleFunc)

    }

    fun click(handleFunc: (Event) -> Unit) {

        bind("click", handleFunc)

    }

    fun text(str: String) {

        textInternal(str)

    }

    fun i(classes: Array<String> = arrayOf(), css: Json = json(), appendFunc: HTMLBodyAppendable.() -> Unit): HTMLBodyElementAppendable {

        val htmlElement = document.createElement("div") as HTMLElement
        val appendable = HTMLBodyElementAppendable(htmlElement)

        classes.forEach { appendable.addClass(it) }
        appendable.css(css)
        appendFunc(appendable)

        return appendable

    }

    fun img(classes: Array<String> = arrayOf(), css: Json = json(), appendFunc: HTMLBodyAppendable.() -> Unit): HTMLBodyElementAppendable {

        val htmlElement = document.createElement("div") as HTMLElement
        val appendable = HTMLBodyElementAppendable(htmlElement)

        classes.forEach { appendable.addClass(it) }
        appendable.css(css)
        appendFunc(appendable)

        return appendable

    }

    fun span(classes: Array<String> = arrayOf(), css: Json = json(), appendFunc: HTMLBodyAppendable.() -> Unit): HTMLBodyElementAppendable {

        val htmlElement = document.createElement("div") as HTMLElement
        val appendable = HTMLBodyElementAppendable(htmlElement)

        classes.forEach { appendable.addClass(it) }
        appendable.css(css)
        appendFunc(appendable)

        return appendable

    }

    fun div(classes: Array<String> = arrayOf(), css: Json = json(), appendFunc: HTMLBodyAppendable.() -> Unit): HTMLBodyElementAppendable {

        val htmlElement = document.createElement("div") as HTMLElement
        val appendable = HTMLBodyElementAppendable(htmlElement)

        classes.forEach { appendable.addClass(it) }
        appendable.css(css)
        appendFunc(appendable)

        return appendable

    }

    fun a(classes: Array<String> = arrayOf(), css: Json = json(), appendFunc: HTMLBodyAppendable.() -> Unit): HTMLBodyElementAppendable {

        val htmlElement = document.createElement("a") as HTMLElement
        val appendable = HTMLBodyElementAppendable(htmlElement)

        classes.forEach { appendable.addClass(it) }
        appendable.css(css)
        appendFunc(appendable)

        return appendable

    }

    fun ul(classes: Array<String> = arrayOf(), css: Json = json(),  appendFunc: HTMLBodyAppendable.() -> Unit): HTMLBodyElementAppendable {

        val htmlElement = document.createElement("ul") as HTMLElement
        val appendable = ULBodyElementAppendable(htmlElement)

        classes.forEach { appendable.addClass(it) }
        appendable.css(css)
        appendFunc(appendable)

        return appendable

    }

}

open class JQueryAppendable(val jq: `$`) : HTMLBodyAppendable() {

    override fun appendElement(element: HTMLElement) {
        jq.append(element)
    }

    override fun addClass(clazz: String) {
        jq.addClass(clazz)
    }

    override fun css(css: Json) {
        jq.css(css)
    }

    override fun animate(css: Json) {
        jq.animate(css)
    }

    override fun animate(css: Json, time: Number, animation: String, callback: () -> Unit) {
        jq.animate(css, time, animation, callback)
    }

    override fun bind(name: String, handleFunc: (Event) -> Unit) {
        jq.on(name, handleFunc)
    }

    override fun textInternal(str: String) {
        jq.text(str)
    }

}

open class HTMLBodyElementAppendable(sourceElement: HTMLElement): JQueryAppendable(`$`(sourceElement)) {
}

class ULBodyElementAppendable(sourceElement: HTMLElement): HTMLBodyElementAppendable(sourceElement) {

    fun li(appendFunc: HTMLBodyAppendable.() -> Unit) {
        val htmlElement = document.createElement("li") as HTMLElement
        appendFunc(HTMLBodyElementAppendable(htmlElement))
    }

}
