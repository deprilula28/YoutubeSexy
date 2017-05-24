class YoutubeSexy {
    val ui = UIManager()
    val cookies = CookieManager()
    val options = OptionManager()
    val ytDataAPI = YTDataAPI()
    val gl = GL()
    val playing = false
    val playlist = false

    init {
        console.log("Loading YoutubeSexy...")
        ytDataAPI.startAPILibrary(cookies)
    }
}

fun main(args: Array<String>) {

    YoutubeSexy()

}