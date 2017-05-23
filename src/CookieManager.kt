import kotlin.browser.document
import kotlin.js.json

class CookieManager {
    init {
        if(getCookie("annoyingGithubInviteClosed") != null || getCookie("annoyingGithubInviteClosed") != "true"){
            setTimeout({
                `$`(".content").addClass("blurInFrames")
                `$`(".annoyingGithubInvite").css(json("display" to "", "opacity" to 0)).animate(json("opacity" to 1))
                setCookie("annoyingGithubInviteClosed", "true")
                console.log("Annoying github invite displayed.")
            }, 120000) // 2 Minutes
            console.log("Displaying annoying github invite in 1 minute!")
        }else{
            setCookie("annoyingGithubInviteClosed", "true")
            `$`(".annoyingGithubInvite").remove()
        }
    }

    fun hideAnnoyingGithubInvite(){

        `$`(".content").removeClass("blurInFrames").addClass("blurOutFrames")
        `$`(".annoyingGithubInvite").css(json("display" to "", "opacity" to 1)).animate(json("opacity" to 1), 100, "linear", {
            `$`(".annoyingGithubInvite").remove()
        }).remove()

        setTimeout({
            `$`(".content").removeClass("blurOutFrames")
        }, 500)

    }

    fun setCookie(name: String, value: String) {

        document.cookie = "$name=$value;path=/"

    }

    fun getCookie(name: String): String? {

        val finalName = name + "="
        val decodedCookie = decodeURIComponent(document.cookie)
        val ca = decodedCookie.split(';')

        ca.forEach {
            var c = it
            while (c[0] == ' ') c = c.substring(1)
            if(c.indexOf(finalName) == 0) return c.substring(finalName.length, c.length)
        }

        return null

    }
}