import { ipcMain, IpcMainEvent } from "electron";
import si from "systeminformation";
import Timer from "setinterval";

const fetchInformation = async (event: IpcMainEvent) => {
  return new Timer(async () => {
    const batteryUsage = { ...(await si.battery()) };

    event.sender.send("batteryUsage", batteryUsage);
  }, 5000);
};

export default () => {
  let interval: Timer;
  ipcMain.on("fetchBatteryUsage", async (e) => {
    interval = await fetchInformation(e);
    interval.setInterval();
  });

  ipcMain.on("closeBatteryUsage", () => {
    if (!interval || interval !== undefined) {
      interval.clearInterval();
    }
  });
};
