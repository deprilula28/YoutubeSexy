const electron = require("electron");
const {app, BrowserWindow} = electron;

app.on("ready", () => {
  var window = new BrowserWindow({"width": 800, "height": 600});
  window.loadURL("{PathToYoutubeSexyFolder}/web/index.html");
});
