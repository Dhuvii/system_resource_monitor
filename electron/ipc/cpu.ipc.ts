import { ipcMain, IpcMainEvent } from "electron";
import os from "os";
import si from "systeminformation";
import Timer from "setinterval";

const fetchInformation = async (event: IpcMainEvent) => {
  return new Timer(async () => {
    const [cpu] = os.cpus();
    const cpuLoad = await si.currentLoad();
    const cpuUsage = {
      model: cpu.model,
      idle: parseFloat(cpuLoad.currentLoadIdle.toFixed(1)),
      total: parseFloat(cpuLoad.currentLoad.toFixed(1)),
      user: parseFloat(cpuLoad.currentLoadUser.toFixed(1)),
      system: parseFloat(cpuLoad.currentLoadSystem.toFixed(1)),
      avgLoad: parseFloat(cpuLoad.avgLoad.toFixed(1)),
    };

    event.sender.send("cpuUsage", cpuUsage);
  }, 1000);
};

export default () => {
  let interval: Timer;
  ipcMain.on("fetchCpuUsage", async (e: IpcMainEvent) => {
    interval = await fetchInformation(e);
    interval.setInterval();
  });

  ipcMain.on("closeCpuUsage", () => {
    if (!interval || interval !== undefined) {
      interval.clearInterval();
    }
  });
};