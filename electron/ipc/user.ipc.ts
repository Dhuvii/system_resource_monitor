import { ipcMain, IpcMainEvent } from "electron";
import si from "systeminformation";
import os from "os";

const fetchInformation = async (event: IpcMainEvent) => {
  const user = {
    userName: os.userInfo().username,
    ...(await si.osInfo()),
    ...(await si.system()),
    hasBattery: (await si.battery()).hasBattery,
    memory: (await si.mem()).total,
  };

  event.sender.send("user", user);
};

export default () => {
  ipcMain.on("fetchUser", async (e) => {
    await fetchInformation(e);
  });
};
