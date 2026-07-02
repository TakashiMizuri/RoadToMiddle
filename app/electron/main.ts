import { app, BrowserWindow, dialog, ipcMain, Notification, shell } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElectronBackend, getPreloadPath } from "./backend-factory.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);

let backend: ReturnType<typeof createElectronBackend>["backend"];

try {
  const electronBackend = createElectronBackend(app.getPath("userData"));
  backend = electronBackend.backend;
  if (isDev) {
    console.log("[electron] database:", electronBackend.dbPath);
  }
} catch (error) {
  app.whenReady().then(() => {
    dialog.showErrorBox("Cannot start application", String(error));
    app.quit();
  });
  backend = null as never;
}

type BackendMethod = keyof typeof backend;

async function handleApi(method: string, args: unknown[] = []): Promise<unknown> {
  const fn = backend[method as BackendMethod] as (...a: unknown[]) => Promise<unknown>;
  if (typeof fn !== "function") {
    throw new Error(`Unknown API method: ${method}`);
  }
  return fn(...args);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 960,
    minHeight: 640,
    title: "Road to Middle",
    show: false,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  win.webContents.on("preload-error", (_event, preloadPath, error) => {
    console.error(`[electron] Preload failed (${preloadPath}):`, error);
  });

  if (isDev) {
    console.log("[electron] preload:", getPreloadPath());

    win.webContents.on("before-input-event", (_event, input) => {
      if (input.type !== "keyDown") return;
      const toggleDevTools =
        input.key === "F12" ||
        (input.control && input.shift && input.key.toLowerCase() === "i");
      if (toggleDevTools) {
        win.webContents.toggleDevTools();
      }
    });
  }

  win.webContents.on("did-fail-load", (_event, errorCode, errorDescription, validatedURL) => {
    console.error(`[electron] Failed to load ${validatedURL}: ${errorCode} ${errorDescription}`);
    if (isDev) {
      win.webContents.openDevTools({ mode: "detach" });
    }
  });

  if (isDev) {
    void win.loadURL(process.env.VITE_DEV_SERVER_URL!);
  } else {
    void win.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(() => {
  if (!backend) return;

  ipcMain.handle("api", (_event, method: string, args: unknown[]) => handleApi(method, args));

  ipcMain.handle("pick_folder", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    if (result.canceled || result.filePaths.length === 0) return null;
    return result.filePaths[0];
  });

  ipcMain.handle("show_notification", (_event, title: string, body: string) => {
    if (Notification.isSupported()) {
      new Notification({ title, body }).show();
    }
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
