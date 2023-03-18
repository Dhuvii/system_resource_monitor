import cpuInfo from "./cpu.ipc";
import memoryInfo from "./memory.ipc";
import networkInfo from "./network.ipc";
import batteryInfo from "./battery.ipc";
import userInfo from "./user.ipc";

export function runIpcs() {
  cpuInfo();
  memoryInfo();
  networkInfo();
  batteryInfo();
  userInfo();
}
