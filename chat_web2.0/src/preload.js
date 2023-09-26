import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    ipcRenderer,
});
contextBridge.exposeInMainWorld("rightMenu", {
    show: (params) => ipcRenderer.invoke("show-context-menu", params),
});