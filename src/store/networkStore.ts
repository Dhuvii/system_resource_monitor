import { create } from "zustand";
import arrayContainer from "../../src/utilities/arrayContainer";
import { SysInfo } from "../../types";

interface NetworkState {
  isLoading: boolean;
  timeElapsed: number[];
  timeTrack: number;

  networkUsage: SysInfo["networkUsage"] | null;
  networkDataRecievedReadingData: number[];
  networkDataSentReadingData: number[];

  update: (cpu: SysInfo["networkUsage"]) => void;
}

const useNetworkStore = create<NetworkState>()((set) => ({
  isLoading: true,
  timeTrack: 0,
  timeElapsed: [],

  networkUsage: null,
  networkDataRecievedReadingData: [],
  networkDataSentReadingData: [],

  update: (network) => {
    set((state) => ({
      isLoading: false,
      timeElapsed: arrayContainer(state.timeElapsed, state.timeTrack + 1, 30),
      timeTrack: state.timeTrack + 1,

      networkUsage: network,
      networkDataRecievedReadingData: arrayContainer(
        state.networkDataRecievedReadingData,
        network.dataRecievedRate,
        30
      ),
      networkDataSentReadingData: arrayContainer(
        state.networkDataSentReadingData,
        network.dataSentRate,
        30
      ),
    }));
  },
}));

export default useNetworkStore;
