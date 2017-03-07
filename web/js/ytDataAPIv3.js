
function startAPILib(){

  gapi.load("client", startGAPI);

}

function startGAPI(){

  gapi.client.init({
    "apiKey": "AIzaSyBlV48q70B0bP3URvRVw_7-uW0YhXZA8GE",
    "clientId": "143036117535-r44koj2e0bf9emon2k6kc18g6pkgorh1.apps.googleusercontent.com",
    "discoveryDocs": [
      "https://people.googleapis.com/$discovery/rest?version=v1",
      "https://developers.google.com/apis-explorer/#s/discovery/v1/discovery.apis.getRest?api=youtube&version=v3"
    ],
    "scope": [
      "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email",
      "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile",
      "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube",
      "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl",
      "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly",
      "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload",
      "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutubepartner-channel-audit"
    ]
  }).then(() => {
    console.log("Sucessfully loaded google API.");
    gapi.client.request({
      "path": "https://www.googleapis.com/youtube/v3/activities",
      "params":{
        "part": "snippet",
        "maxResults": 50
      }
    }).then((result) => {
      console.log("Request responded..")
      loadMainMenuPage(result.result);
    });
  });

}
