import convertSize from "../../src/utilities/convertSize";
import { create } from "zustand";
import arrayContainer from "../../src/utilities/arrayContainer";
import { SysInfo } from "../../types";

interface MemoryState {
  isLoading: boolean;
  timeElapsed: number[];
  timeTrack: number;

  memoryUsage: SysInfo["memoryUsage"] | null;
  memoryPressureReadingData: number[];

  update: (cpu: SysInfo["memoryUsage"]) => void;
}

const useMemoryStore = create<MemoryState>()((set) => ({
  isLoading: true,
  timeTrack: 0,
  timeElapsed: [],

  memoryUsage: null,
  memoryPressureReadingData: [],

  update: (memory) => {
    set((state) => ({
      isLoading: false,
      timeElapsed: arrayContainer(state.timeElapsed, state.timeTrack + 1, 30),
      timeTrack: state.timeTrack + 1,

      memoryUsage: memory,
      memoryPressureReadingData: arrayContainer(
        state.memoryPressureReadingData,
        convertSize(memory?.memUsed, 1024 * 1024 * 1024, 3),
        30
      ),
    }));
  },
}));

export default useMemoryStore;