class YoutubeSexy {
    val ui = UIManager()
    val cookies = CookieManager()
    val options = OptionManager()
    val ytDataAPI = YTDataAPI()
    val gl = GL()
    val playing = false
    val playlist = false

    init {
        ytDataAPI.startAPILibrary(cookies)
    }
}