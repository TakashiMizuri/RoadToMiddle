import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  invoke: (method: string, ...args: unknown[]) =>
    ipcRenderer.invoke("api", method, args) as Promise<unknown>,
  pickFolder: () => ipcRenderer.invoke("pick_folder") as Promise<string | null>,
  showNotification: (title: string, body: string) =>
    ipcRenderer.invoke("show_notification", title, body) as Promise<void>,
  platform: "electron" as const,
});
