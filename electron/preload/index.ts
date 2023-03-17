import { ipcRenderer, contextBridge } from "electron";

export {};
declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */
  sendMessage: (message: string) => {
    ipcRenderer.send("message", message);
  },

  getCpuReport: () => {
    ipcRenderer.send("fetchCpuUsage");
  },

  endCpuReport: () => {
    ipcRenderer.send("closeCpuUsage");
  },

  getMemoryReport: () => {
    ipcRenderer.send("fetchMemoryUsage");
  },

  endMemoryReport: () => {
    ipcRenderer.send("closeMemoryUsage");
  },

  getNetworkReport: () => {
    ipcRenderer.send("fetchNetworkUsage");
  },

  endNetworkReport: () => {
    ipcRenderer.send("closeNetworkUsage");
  },

  getBatteryReport: () => {
    ipcRenderer.send("fetchBatteryUsage");
  },

  endBatteryReport: () => {
    ipcRenderer.send("closeBatteryUsage");
  },

  getUserReport: () => {
    ipcRenderer.send("fetchUser");
  },
  /**
    Here function for AppBar
   */
  Minimize: () => {
    ipcRenderer.send("minimize");
  },
  Maximize: () => {
    ipcRenderer.send("maximize");
  },
  Close: () => {
    ipcRenderer.send("close");
  },
  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld("Main", api);
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);
