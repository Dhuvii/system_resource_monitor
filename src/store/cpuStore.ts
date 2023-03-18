import { create } from "zustand";
import arrayContainer from "../../src/utilities/arrayContainer";
import { SysInfo } from "../../types";

interface CpuState {
  isLoading: boolean;
  timeElapsed: number[];
  timeTrack: number;

  cpuUsage: SysInfo["cpuUsage"] | null;
  cpuSystemReadingData: number[];
  cpuUserReadingData: number[];
  cpuIdleReadingData: number[];

  update: (cpu: SysInfo["cpuUsage"]) => void;
}

const useCpuStore = create<CpuState>()((set) => ({
  isLoading: true,
  timeTrack: 0,
  timeElapsed: [],

  cpuUsage: null,
  cpuSystemReadingData: [],
  cpuUserReadingData: [],
  cpuIdleReadingData: [],

  update: (cpu) => {
    set((state) => ({
      isLoading: false,
      timeElapsed: arrayContainer(state.timeElapsed, state.timeTrack + 1, 30),
      timeTrack: state.timeTrack + 1,

      cpuUsage: cpu,
      cpuSystemReadingData: arrayContainer(
        state.cpuSystemReadingData,
        cpu.system,
        30
      ),
      cpuUserReadingData: arrayContainer(
        state.cpuUserReadingData,
        cpu.user,
        30
      ),
      cpuIdleReadingData: arrayContainer(
        state.cpuIdleReadingData,
        cpu.idle,
        30
      ),
    }));
  },
}));

export default useCpuStore;
