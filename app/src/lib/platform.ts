/** True when running inside the Tauri desktop webview. */

export function isTauriRuntime(): boolean {

  if (typeof window === "undefined") return false;

  const w = window as Window & {

    __TAURI_INTERNALS__?: { ipc?: { invoke?: unknown } };

  };

  return Boolean(w.__TAURI_INTERNALS__?.ipc?.invoke);

}



/** True when running inside the Electron desktop app. */

export function isElectronRuntime(): boolean {

  if (typeof window === "undefined") return false;

  return Boolean(window.electronAPI?.platform === "electron");

}



/** True when running in any desktop shell (Electron or Tauri). */

export function isDesktopRuntime(): boolean {

  return isElectronRuntime() || isTauriRuntime();

}


