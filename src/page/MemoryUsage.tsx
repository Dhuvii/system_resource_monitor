import { useEffect } from "react";
import useMemoryStore from "../store/memoryStore";
import { SysInfo } from "../../types";
import CircularProgress from "../components/CircularProgress";
import LineChart from "../components/LineChart";
import convertSize from "../utilities/convertSize";

const MemoryUsage = () => {
  const timeData = useMemoryStore((state) => state.timeElapsed);

  const memoryUsage = useMemoryStore((state) => state.memoryUsage);
  const isLoading = useMemoryStore((state) => state.isLoading);
  const memoryPressureReadingData = useMemoryStore(
    (state) => state.memoryPressureReadingData
  );
  const updateStore = useMemoryStore((state) => state.update);

  useEffect(() => {
    window.Main.getMemoryReport();

    window.Main.on("memoryUsage", (data) => {
      const d = data as SysInfo["memoryUsage"];
      updateStore(d);
    });

    return () => {
      window.Main.endMemoryReport();
    };
  }, []);

  return (
    <>
      {!isLoading && memoryUsage && (
        <div className="w-full h-full flex flex-col gap-3">
          <div className="w-full p-10 border flex items-center justify-between gap-10 dark:bg-gradient-to-tl dark:from-[#1D202B] dark:to-[#2A303F] border-gray-800 shadow-md rounded-xl">
            {memoryUsage?.free && (
              <div className="w-60">
                <CircularProgress
                  percentage={(memoryUsage.free * 100) / memoryUsage.total}
                  thickness={5}
                  innerPadding={0}
                  colorStart="#810CA8"
                  colorStop="#C147E9"
                >
                  <p className="text-5xl font-thin text-white">
                    {convertSize(memoryUsage?.free, 1024 * 1024 * 1024, 2)} GB
                  </p>
                  <p className="mt-2 text-xs rounded-md px-2 py-1 uppercase tracking-wide text-gray-300 text-center">
                    free
                  </p>
                </CircularProgress>
              </div>
            )}
            {memoryUsage?.memUsed && (
              <div className="">
                <CircularProgress
                  percentage={(memoryUsage.memUsed * 100) / memoryUsage.total}
                  thickness={5}
                  innerPadding={0}
                  colorStart="#4B56D2"
                  colorStop="#82C3EC"
                >
                  <p className="text-5xl font-thin text-white">
                    {convertSize(memoryUsage?.memUsed, 1024 * 1024 * 1024, 2)}{" "}
                    GB
                  </p>
                  <p className="mt-5 text-xs bg-white/20 rounded-md px-2 py-1 uppercase tracking-wide text-gray-300 text-center">
                    Used
                  </p>
                </CircularProgress>
              </div>
            )}

            {memoryUsage?.cached && (
              <div className="w-60">
                <CircularProgress
                  percentage={(memoryUsage.cached * 100) / memoryUsage.total}
                  thickness={5}
                  innerPadding={0}
                  colorStart="#FD841F"
                  colorStop="#E14D2A"
                >
                  <p className="text-5xl font-thin text-white">
                    {convertSize(memoryUsage?.cached, 1024 * 1024 * 1024, 2)} GB
                  </p>
                  <p className="mt-2 text-xs rounded-md px-2 py-1 uppercase tracking-wide text-gray-300 text-center">
                    Cached
                  </p>
                </CircularProgress>
              </div>
            )}
          </div>

          {/* chart */}
          <div className="relative w-full p-3 pr-0 h-full rounded-xl shadow-md">
            <div className="absolute p-2 top-0 right-0 bg-white/5 rounded-md backdrop-blur-sm flex items-center justify-between gap-2">
              <button
                className={`bg-[#db00b6] text-white text-xs px-2 py-1 rounded-md`}
              >
                Memory Pressure
              </button>
            </div>
            <div className="h-full w-full">
              <LineChart
                color="219, 0, 182"
                dataY={memoryPressureReadingData}
                dataX={timeData}
              />
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-xs text-white italic">
            Crunching memory information...
          </p>
        </div>
      )}
    </>
  );
};

export default MemoryUsage;
