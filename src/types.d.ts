import { api, ipcRenderer } from "../electron/preload";
export {};

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}
