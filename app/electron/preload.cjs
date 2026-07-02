"use strict";

// electron/preload.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("electronAPI", {
  invoke: (method, ...args) => import_electron.ipcRenderer.invoke("api", method, args),
  pickFolder: () => import_electron.ipcRenderer.invoke("pick_folder"),
  showNotification: (title, body) => import_electron.ipcRenderer.invoke("show_notification", title, body),
  platform: "electron"
});
