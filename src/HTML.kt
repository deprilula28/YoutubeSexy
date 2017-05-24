import org.w3c.dom.HTMLElement
import kotlin.browser.document

abstract class HTMLBodyAppendable {

    abstract fun appendElement(element: HTMLElement)

    fun div(appendFunc: HTMLBodyAppendable.() -> Unit) {
        val htmlElement = document.createElement("div") as HTMLElement
        appendFunc(HTMLBodyElementAppendable(htmlElement))
    }

    fun a(appendFunc: HTMLBodyAppendable.() -> Unit) {
        val htmlElement = document.createElement("a") as HTMLElement
        appendFunc(HTMLBodyElementAppendable(htmlElement))
    }

    fun ul(appendFunc: HTMLBodyAppendable.() -> Unit) {
        val htmlElement = document.createElement("ul") as HTMLElement
        appendFunc(ULBodyElementAppendable(htmlElement))
    }

}

class HTMLBodyElementAppendable(val sourceElement: HTMLElement): HTMLBodyAppendable() {

    override fun appendElement(element: HTMLElement) {
        sourceElement.appendChild(element)
    }

}

class ULBodyElementAppendable(val sourceElement: HTMLElement): HTMLBodyAppendable() {

    override fun appendElement(element: HTMLElement) {
        sourceElement.appendChild(element)
    }

    fun li(appendFunc: HTMLBodyAppendable.() -> Unit) {
        val htmlElement = document.createElement("li") as HTMLElement
        appendFunc(HTMLBodyElementAppendable(htmlElement))
    }

}

class JQueryAppendable(val jq: `$`) : HTMLBodyAppendable() {

    override fun appendElement(element: HTMLElement) {
        jq.append(element)
    }

}
