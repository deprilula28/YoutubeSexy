import kotlin.js.Json
import kotlin.js.json

class UIManager {

    val darkThemed = true

    fun generateVideo(item: Json, channel: Json?, delay: Number, channelChip: Boolean = true, ytDataAPI: YTDataAPI): HTMLBodyAppendable.() -> Unit {

        return {
            div(classes = arrayOf("col", "s12", "m6", "l4"), css = json("height" to "240px", "width" to "214px", "overflow" to "none",
                    "margin-right" to "20px", "opacity" to 0.0, "animation" to "mainMenuAppearItem 1s ease-out ${delay}s")) {
                setTimeout({
                    css(json("opacity" to ""))
                }, 1000)

                div(css = json("width" to "214px", "height" to "120px")) {
                    val preloader = div(classes = arrayOf("bubblesAnimation")) {
                        for (i in 0 .. 5) {
                            span {}
                        }
                    }

                    img(classes = arrayOf("center-align"), css = json("width" to "100%", "height" to "100%", "cursor" to "pointer", "display" to "none")) {
                        load {
                            preloader.css(json("display" to "none"))
                            css(json("display" to "", "opacity" to 0))
                            animate(json("opacity" to 1), 100, "linear", {
                                css(json("display" to ""))
                            })
                        }
                    }

                    //Video Name Row
                    div(classes = arrayOf("row")) {
                        div(classes = arrayOf("col", "s12")) {
                            a(classes = arrayOf("videoNameTextComponent", "truncate", if (darkThemed) "white-text" else "black-text")) {
                                if (item["statistics"] != null && (item["statistics"] as Json)["viewCount"] != null) {
                                    text("${prettifyNumber((item["statistics"] as Json)["viewCount"] as Number)} views")
                                } else {
                                    text("???")
                                }
                            }
                        }
                    }

                    val authVerify = fun(): Boolean {
                        if(ytDataAPI.authenticated) return true
                        //Materialize.toast("You need to be authenticated to perform this action!", 5000)
                        //ytDataAPI.requestAuth(doLater)

                        return false
                    }

                    //Like/
                    div(classes = arrayOf("row"), css = json("margin-bottom" to "10px")) {
                        div(classes = arrayOf("col", "s6"), css = json("padding-right" to "0px")) {
                            div(classes = arrayOf("chip", "small", "waves-effect", "waves-dark")) {
                                click {
                                    if (!authVerify()) return@click

                                    ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos/rate", json(
                                            "id" to (item["snippet"] as Json)["id"] as String,
                                            "rating" to "like"
                                    ), {
                                        //Materialize.toast("Video successfully liked.", 5000)
                                    })
                                }

                                i(classes = arrayOf("material-icon", "black-text"), css = json("margin-right" to "4px")) {
                                    text("thumb_up")
                                }
                            }
                        }
                    }

                    //Dislike
                    div(classes = arrayOf("row"), css = json("margin-bottom" to "10px")) {
                        div(classes = arrayOf("col", "s6"), css = json("padding-right" to "0px")) {
                            div(classes = arrayOf("chip", "small", "waves-effect", "waves-dark")) {
                                click {
                                    if (!authVerify()) return@click

                                    ytDataAPI.googleAPIGet("https://www.googleapis.com/youtube/v3/videos/rate", json(
                                            "id" to (item["snippet"] as Json)["id"] as String,
                                            "rating" to "dislike"
                                    ), {
                                        //Materialize.toast("Video successfully dislike.", 5000)
                                    })
                                }

                                i(classes = arrayOf("material-icon", "black-text"), css = json("margin-right" to "4px")) {
                                    text("thumb_down")
                                }
                            }
                        }
                    }


                }
            }
        }

    }

    fun prettifyNumber(numb: Number): String {

        return numb.toString().replace(Regex("\\B(?=(\\d{3})+(?!\\d)))"), ",")

    }

}