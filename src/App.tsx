import Lottie from "react-lottie-player";

import { useState, useEffect } from "react";
import { SysInfo } from "types";
import { CpuIcon, MemoryIcon, NetworkIcon, BatteryIcon } from "./icons";
import userIcon from "./assets/user.json";
import useUserStore from "./store/userStore";
import convertSize from "./utilities/convertSize";

import BatteryUsage from "./page/BatteryUsage";
import CpuUsage from "./page/CpuUsage";
import MemoryUsage from "./page/MemoryUsage";
import NetworkUsage from "./page/NetworkUsage";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [selectedTab, setSelectedTab] = useState<
    "cpu" | "memory" | "network" | "battery"
  >("cpu");

  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);

  const updateStore = useUserStore((state) => state.update);

  useEffect(() => {
    window.Main.getUserReport();

    window.Main.on("user", (data: SysInfo["user"]) => {
      const d = data;
      updateStore(d);
    });
  }, []);

  return (
    <div className="App">
      <div className="w-full h-screen bg-[#1D202B]">
        {!isLoading && (
          <div className="w-full h-full">
            {/* sidebar */}
            <div className="w-80 p-3 fixed inset-y-0 left-0 ">
              <div className="relative w-72 p-2 h-full rounded-xl bg-gradient-to-bl to-[#1D202B] from-[#2A303F] shadow-xl border border-gray-800">
                <div className="w-full">
                  <Lottie animationData={userIcon} loop play />
                </div>

                <p className="mt-2 text-xl text-center font-semibold text-white">
                  {user?.manufacturer}
                </p>
                <p className="text-xs text-center text-gray-400">
                  {user?.model}
                </p>

                {/* system details */}
                <div className="mt-5 w-full  flex flex-col items-start justify-start gap-3">
                  <div className="w-full px-3 py-1 rounded-md flex-shrink-0 grid grid-cols-2 items-center justify-center gap-2">
                    <h4 className="text-xs uppercase tracking-wide font-normal text-gray-400">
                      user
                    </h4>
                    <p className="text-sm text-white text-right truncate">
                      {user?.userName}
                    </p>
                  </div>

                  <div className="w-full px-3 py-1 rounded-md flex-shrink-0 grid grid-cols-2 items-center justify-center gap-2">
                    <h4 className="text-xs uppercase tracking-wide whitespace-nowrap font-normal text-gray-400">
                      Chip
                    </h4>
                    <p className="text-sm text-white text-right">
                      {user?.arch}
                    </p>
                  </div>

                  <div className="w-full px-3 py-1 rounded-md flex-shrink-0 grid grid-cols-2 items-center justify-center gap-2">
                    <h4 className="text-xs uppercase tracking-wide whitespace-nowrap font-normal text-gray-400">
                      Memory
                    </h4>
                    <p className="text-sm whitespace-nowrap text-white text-right">
                      {convertSize(user?.memory, 1024 * 1024 * 1024, 2)} GB
                    </p>
                  </div>

                  <div className="w-full px-3 py-1 rounded-md flex-shrink-0 grid grid-cols-2 items-center justify-center gap-2">
                    <h4 className="text-xs uppercase tracking-wide whitespace-nowrap font-normal text-gray-400">
                      Serial number
                    </h4>
                    <p className="text-sm whitespace-nowrap text-white text-right">
                      {user?.serial}
                    </p>
                  </div>

                  <div className="w-full px-3 py-1 rounded-md flex-shrink-0 grid grid-cols-2 items-center justify-center gap-2">
                    <h4 className="text-xs uppercase tracking-wide whitespace-nowrap font-normal text-gray-400">
                      Os
                    </h4>
                    <p className="text-sm whitespace-nowrap text-white text-right">
                      {user?.codename}
                    </p>
                  </div>
                </div>
                {/* end of system details */}

                <div className="text-white/[0.03] rounded-xl absolute inset-0 overflow-hidden flex items-end">
                  <div className="scale-[2] scale-x-[-2] transform overflow-hidden ">
                    <div className="-translate-x-16 translate-y-12">
                      {selectedTab === "cpu" && <CpuIcon />}
                      {selectedTab === "memory" && <MemoryIcon />}
                      {selectedTab === "network" && <NetworkIcon />}
                      {selectedTab === "battery" && <BatteryIcon />}
                    </div>
                  </div>
                </div>

                {/* tabs */}
                <div className="absolute bottom-0 inset-x-0 p-3">
                  <div className="px-3 h-14 rounded-xl bg-[#1D202B]/20 backdrop-blur-md flex items-center justify-between gap-5 shadow-md shadow-[#1D202B]/10 border border-gray-700">
                    <TabButton
                      name="cpu"
                      isSelected={selectedTab === "cpu"}
                      onClick={() => setSelectedTab("cpu")}
                    >
                      <CpuIcon />
                    </TabButton>

                    <TabButton
                      name="memory"
                      isSelected={selectedTab === "memory"}
                      onClick={() => setSelectedTab("memory")}
                    >
                      <MemoryIcon />
                    </TabButton>

                    <TabButton
                      name="network"
                      isSelected={selectedTab === "network"}
                      onClick={() => setSelectedTab("network")}
                    >
                      <NetworkIcon />
                    </TabButton>

                    {user?.hasBattery && (
                      <TabButton
                        name="battery"
                        isSelected={selectedTab === "battery"}
                        onClick={() => setSelectedTab("battery")}
                      >
                        <BatteryIcon />
                      </TabButton>
                    )}
                  </div>
                </div>
                {/* end of tabs */}
              </div>
            </div>
            {/*end of sidebar */}

            {/* content */}
            <div className="w-full h-screen overflow-y-auto min-w-0 pl-[19.4rem] p-3 py-3 bg-[#1D202B]">
              {selectedTab === "cpu" && <CpuUsage />}
              {selectedTab === "memory" && <MemoryUsage />}
              {selectedTab === "network" && <NetworkUsage />}
              {selectedTab === "battery" && <BatteryUsage />}
            </div>
            {/* end of content */}
          </div>
        )}

        {isLoading && <SplashScreen />}
      </div>
    </div>
  );
}

const TabButton = ({
  children,
  name,
  isSelected = false,
  onClick,
}: {
  children: React.ReactNode;
  name: string;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center rounded-md p-1 group "
    >
      <div
        className={`transition-all duration-200 ${
          isSelected
            ? "text-[#2196f3] w-6 h-6"
            : "w-6 h-6 text-gray-500 group-hover:text-gray-400 "
        }`}
      >
        {children}
      </div>
      <span
        className={`mt-1 text-[0.5rem] font-semibold uppercase  ${
          isSelected ? "text-white" : "text-gray-500 group-hover:text-gray-400"
        } `}
      >
        {name}
      </span>
    </button>
  );
};

export default App;
