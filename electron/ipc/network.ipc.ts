import { ipcMain, IpcMainEvent } from "electron";
import si from "systeminformation";
import Timer from "setinterval";

const fetchInformation = async (event: IpcMainEvent) => {
  return new Timer(async () => {
    const [network] = await si.networkStats();
    const networkUsage = {
      dataRecieved: network.rx_bytes,
      dataSent: network.tx_bytes,
      dataRecievedRate: network.rx_sec,
      dataSentRate: network.tx_sec,
      processes: await si.processes(),
    };

    event.sender.send("networkUsage", networkUsage);
  }, 1000);
};

export default () => {
  let interval: Timer;
  ipcMain.on("fetchNetworkUsage", async (e: IpcMainEvent) => {
    interval = await fetchInformation(e);
    interval.setInterval();
  });

  ipcMain.on("closeNetworkUsage", () => {
    if (!interval || interval !== undefined) {
      interval.clearInterval();
    }
  });
};
