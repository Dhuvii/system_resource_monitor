import { ipcMain, IpcMainEvent } from "electron";
import si from "systeminformation";
import Timer from "setinterval";

const fetchInformation = async (event: IpcMainEvent) => {
  return new Timer(async () => {
    const memory = await si.mem();
    const memoryUsage = {
      total: memory.total,
      free: memory.free,
      memUsed: memory.available,
      cached: memory.used - memory.available,
      swap: memory.swapused,
    };

    event.sender.send("memoryUsage", memoryUsage);
  }, 1000);
};

export default () => {
  let interval: Timer;
  ipcMain.on("fetchMemoryUsage", async (e: IpcMainEvent) => {
    interval = await fetchInformation(e);
    interval.setInterval();
  });

  ipcMain.on("closeMemoryUsage", () => {
    if (!interval || interval !== undefined) {
      interval.clearInterval();
    }
  });
};
