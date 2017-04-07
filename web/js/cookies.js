function Cookies(){

    if(!this.getCookie("annoyingGithubInviteClosed") || this.getCookie("annoyingGithubInviteClosed") !== "true"){
        setTimeout(() => {
            $(".content").addClass("blurInFrames");
            $(".annoyingGithubInvite").css({"display": "", "opacity": 0}).animate({"opacity": 1});
            youtubeSexy.cookies.setCookie("annoyingGithubInviteClosed", "true", 700);
            console.log("Annoying github invite displayed.");
        }, 120000); // 2 Minutes
        console.log("Displaying annoying github invite in 1 minute!");
    }else{
        this.setCookie("annoyingGithubInviteClosed", "true", 700);
        $(".annoyingGithubInvite").remove();
    } 

}

function hideAnnoyingGithubInvite(){

    $(".content").removeClass("blurInFrames").addClass("blurOutFrames");
    $(".annoyingGithubInvite").css({"display": "", "opacity": 1}).animate({"opacity": 0}, 100, "linear", () => {
        $(".annoyingGithubInvite").remove();
    }).remove();

    setTimeout(function() {
        $(".content").removeClass("blurOutFrames");
    }, 500);

}

//Credit: https://www.w3schools.com/js/js_cookies.asp
Cookies.prototype.setCookie = function(name, value, expire){

    var date = new Date();
    date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
    var expireString = "expires=" + date.toUTCString();

    document.cookie = name + "=" + value + ";" + expireString + ";path=/";

}

//Credit: https://www.w3schools.com/js/js_cookies.asp
Cookies.prototype.getCookie = function(name){

    var finalName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(var i = 0; i <ca.length; i++){
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if(c.indexOf(finalName) == 0) return c.substring(finalName.length, c.length);
    }

    return undefined;

}
