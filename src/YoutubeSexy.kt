import org.w3c.dom.HTMLElement
import kotlin.browser.document
import kotlin.dom.addClass
import kotlin.js.Json
import kotlin.js.json

class YoutubeSexy {

    val ui = UIManager()
    val cookies = CookieManager()
    val options = OptionManager()
    val ytDataAPI = YTDataAPI()
    val gl = GL()

    var lastPageToken: String? = null
    var loadingPage = true
    var playing: String? = null
    var playlist: String? = null

    init {

        console.log("Loading YoutubeSexy...")
        ytDataAPI.startAPILibrary(this)

    }

    fun loadMainMenuPage(mainMenuSource: Json) {

        lastPageToken = mainMenuSource["nextPageToken"] as? String?
        if (lastPageToken == null) `$`("#loadingcircle").css(json("display" to "none"))

        if (ytDataAPI.authenticated) {
            TODO("Authenticated main menu page not implemented yet.")
        } else {
            val videosRow = document.createElement("div")
            videosRow.addClass("row")
            document.getElementById("main-page")!!.appendChild(videosRow)

            var delay = 0.0
            (mainMenuSource["items"] as Array<Json>).forEach {
                ui.generateVideo(it, null, delay).invoke(HTMLBodyElementAppendable(videosRow as HTMLElement))
                delay += 0.05
            }
        }

    }

}

fun main(args: Array<String>) {

    YoutubeSexy()

}