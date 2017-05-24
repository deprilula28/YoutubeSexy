import org.w3c.xhr.XMLHttpRequest
import kotlin.js.Json
import kotlin.js.json

private const val SCOPE = "https://www.googleapis.com/auth/yt-analytics.readonly" +
        "%20https://www.googleapis.com/auth/yt-analytics-monetary.readonly" +
        "%20https://www.googleapis.com/auth/youtube" +
        "%20https://www.googleapis.com/auth/youtube.readonly" +
        "%20https://www.googleapis.com/auth/youtube.upload" +
        "%20https://www.googleapis.com/auth/youtubepartner" +
        "%20https://www.googleapis.com/auth/plus.login"
private const val API_KEY = "AIzaSyBlV48q70B0bP3URvRVw_7-uW0YhXZA8GE"

class YTDataAPI {
    val authenticated = false
    lateinit var accessToken: String

    fun startAPILibrary(cookieManager: CookieManager) {

        if (cookieManager.getCookie("doAuthenticate") != null && cookieManager.getCookie("doAuthenticate") === "true") {
            console.log("Requesting authentication because of a cookie.")
        } else if(authenticated) {

        }

    }

    fun googleAPIGet(path: String, params: Json, complete: (json: Json) -> Unit, error: (textStatus: String, errorThrown: String) -> Unit) {

        var url = "$path?key=$API_KEY${if(authenticated) "&access_token=$accessToken" else ""}"

        params.forEach { k, v ->
            url += "&$k=$v"
        }

        val requestJSON = json("url" to url, "contentType" to "content/json")

        val xhttp = XMLHttpRequest()
        xhttp.open("GET", url, true)
        xhttp.onreadystatechange = {
            val json = JSON.parse<Json>(xhttp.responseText)

            if (json["error"] != null) {
                val errorJson = json["errorJson"] as Json

                val errorAlert = StringBuilder("An errorJson has been returned by the Youtube API! Error Code: ${errorJson["code"]}\n" +
                        "Message: ${errorJson["message"]}4\n\nFull errorJson log:")
                console.log(errorJson["errors"])

                (errorJson["errors"] as Array<Json>).forEachIndexed { index, json ->
                    errorAlert += "\nError #$index: ${json["reason"]} (${json["message"]})"
                }

                console.log(errorAlert.toString())
                alert(errorAlert.toString())
            }else complete(json)
        }

    }

}