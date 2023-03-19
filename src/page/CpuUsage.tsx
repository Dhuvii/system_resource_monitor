import { useEffect, useState } from "react";

import useCpuStore from "../store/cpuStore";
import { SysInfo } from "../../types";
import Gauge from "../components/Gauge";
import LineChart from "../components/LineChart";

const CpuUsage = () => {
  const isLoading = useCpuStore((state) => state.isLoading);

  const cpuUsage = useCpuStore((state) => state.cpuUsage);

  const cpuSystemUsageReadingData = useCpuStore(
    (state) => state.cpuSystemReadingData
  );
  const cpuUserUsageReadingData = useCpuStore(
    (state) => state.cpuUserReadingData
  );
  const cpuIdleUsageReadingData = useCpuStore(
    (state) => state.cpuIdleReadingData
  );
  const timeData = useCpuStore((state) => state.timeElapsed);

  const updateStore = useCpuStore((state) => state.update);

  useEffect(() => {
    window.Main.getCpuReport();

    window.Main.on("cpuUsage", (data) => {
      const d = data as SysInfo["cpuUsage"];
      updateStore(d);
    });

    return () => {
      window.Main.endCpuReport();
    };
  }, []);

  const [selectedCpuUsageChart, setSelectedCpuUsageChart] = useState<
    "user" | "system" | "idle"
  >("system");

  return (
    <>
      {!isLoading && cpuUsage && (
        <div className="w-full h-full flex flex-col gap-3">
          <div className="w-full p-10 border flex items-start justify-between gap-10 dark:bg-gradient-to-tl dark:from-[#1D202B] dark:to-[#2A303F] border-gray-800 shadow-md rounded-xl">
            {cpuUsage?.idle && (
              <div className="w-[30%]">
                <Gauge
                  height={20}
                  divisions={12}
                  numberOfPoints={72}
                  angleFrom={-30}
                  angleTo={210}
                  percentage={cpuUsage?.idle}
                  classCompleted={`${
                    cpuUsage?.idle > 80 ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  <>
                    <p className="text-4xl font-thin text-white">
                      {cpuUsage?.idle}%
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-wide text-gray-300 text-center">
                      idle
                    </p>
                  </>
                </Gauge>

                <p className="-mt-8 text-xs text-gray-500 text-center">
                  Your CPU is performing well <br /> ({" "}
                  <span className="italic">higher the better</span> )
                </p>
              </div>
            )}
            {cpuUsage?.system && (
              <div className="w-[40%]">
                <Gauge
                  height={20}
                  divisions={12}
                  numberOfPoints={72}
                  angleFrom={-30}
                  angleTo={210}
                  percentage={cpuUsage?.system}
                  classCompleted={`${
                    cpuUsage?.system > 20 ? "bg-yellow-500" : "bg-green-500"
                  }`}
                >
                  <>
                    <p className="text-4xl font-thin text-white">
                      {cpuUsage?.system}%
                    </p>
                    <p className="mt-2 text-xs bg-white/20 rounded-md px-2 py-1 uppercase tracking-wide text-gray-300 text-center">
                      system
                    </p>
                  </>
                </Gauge>

                <p className="-mt-16 text-xs text-gray-500 text-center">
                  Cpu used by the system <br /> ({" "}
                  <span className="italic">lower the better</span> )
                </p>
              </div>
            )}
            {cpuUsage?.idle && (
              <div className="w-[30%]">
                <Gauge
                  height={20}
                  divisions={12}
                  numberOfPoints={72}
                  angleFrom={-30}
                  angleTo={210}
                  percentage={cpuUsage?.user}
                  classCompleted={`${
                    cpuUsage?.user > 20 ? "bg-yellow-500" : "bg-green-500"
                  }`}
                >
                  <>
                    <p className="text-4xl font-thin text-white">
                      {cpuUsage?.user}%
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-wide text-gray-300 text-center">
                      user
                    </p>
                  </>
                </Gauge>

                <p className="-mt-10 text-xs text-gray-500 text-center">
                  Cpu used by the user <br /> ({" "}
                  <span className="italic">lower the better</span> )
                </p>
              </div>
            )}
          </div>

          {/* chart */}
          <div className="relative w-full p-3 pr-0 h-full rounded-xl shadow-md">
            <div className="absolute p-2 top-0 right-0 bg-white/5 rounded-md backdrop-blur-sm flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedCpuUsageChart("idle")}
                className={`${
                  selectedCpuUsageChart === "idle"
                    ? "bg-[#0FA935] text-white "
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300"
                } text-xs px-2 py-1 rounded-md`}
              >
                idle
              </button>

              <button
                onClick={() => setSelectedCpuUsageChart("system")}
                className={`${
                  selectedCpuUsageChart === "system"
                    ? "bg-[#f72585] text-white "
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300"
                } text-xs px-2 py-1 rounded-md`}
              >
                system
              </button>

              <button
                onClick={() => setSelectedCpuUsageChart("user")}
                className={`${
                  selectedCpuUsageChart === "user"
                    ? "bg-[#254CF7] text-white "
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300"
                } text-xs px-2 py-1 rounded-md`}
              >
                user
              </button>
            </div>
            <div className="h-full w-full">
              {selectedCpuUsageChart === "system" && (
                <LineChart
                  color="247, 37, 133"
                  dataY={cpuSystemUsageReadingData}
                  dataX={timeData}
                />
              )}

              {selectedCpuUsageChart === "user" && (
                <LineChart
                  color="37, 76, 247"
                  dataY={cpuUserUsageReadingData}
                  dataX={timeData}
                />
              )}

              {selectedCpuUsageChart === "idle" && (
                <LineChart
                  color="15, 169, 53"
                  dataY={cpuIdleUsageReadingData}
                  dataX={timeData}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-xs text-white italic">
            Crunching cpu information...
          </p>
        </div>
      )}
    </>
  );
};

export default CpuUsage;