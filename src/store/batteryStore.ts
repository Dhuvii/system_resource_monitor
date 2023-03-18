import { create } from "zustand";
import { SysInfo } from "../../types";

interface BatteryState {
  isLoading: boolean;
  batteryUsage: SysInfo["batteryUsage"] | null;

  update: (battery: SysInfo["batteryUsage"]) => void;
}

const useBatteryStore = create<BatteryState>()((set) => ({
  isLoading: true,
  batteryUsage: null,

  update: (battery) => {
    set(() => ({
      isLoading: false,
      batteryUsage: battery,
    }));
  },
}));

export default useBatteryStore;
