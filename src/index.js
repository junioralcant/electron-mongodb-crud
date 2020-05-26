const { app } = require("electron");

const { createWindow } = require("./main");

require("./database");

require("electron-reload")(__dirname);

app.whenReady().then(createWindow);
