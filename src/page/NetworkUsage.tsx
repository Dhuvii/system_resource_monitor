import LineChart from "../components/LineChart";
import useStateComparator from "../hooks/useStateComparator";
import { GraphDownIcon, GraphUpIcon } from "../icons";
import convertSize from "../utilities/convertSize";

import { useEffect } from "react";
import useNetworkStore from "../store/networkStore";
import { SysInfo } from "../../types";
import Table from "../components/Table";
import Loader from "@/components/Loader";

const NetworkUsage = () => {
  const dataRecievedReadingData = useNetworkStore(
    (state) => state.networkDataRecievedReadingData
  );

  const dataSentReadingData = useNetworkStore(
    (state) => state.networkDataSentReadingData
  );
  const timeData = useNetworkStore((state) => state.timeElapsed);

  const networkUsage = useNetworkStore((state) => state.networkUsage);
  const isLoading = useNetworkStore((state) => state.isLoading);

  const drrState = useStateComparator(networkUsage?.dataRecievedRate);
  const dsrState = useStateComparator(networkUsage?.dataSentRate);

  const updateStore = useNetworkStore((state) => state.update);

  useEffect(() => {
    window.Main.getNetworkReport();

    window.Main.on("networkUsage", (data: SysInfo["networkUsage"]) => {
      const d = data;
      updateStore(d);
    });

    return () => {
      window.Main.endNetworkReport();
    };
  }, []);

  type Headings = "process_name" | "cpu" | "memory";

  return (
    <>
      {!isLoading && networkUsage && (
        <div className="h-full flex flex-col gap-3 overflow-hidden">
          <div className="w-full flex items-center justify-between gap-3">
            {/* data recieved */}
            <div className="w-full p-3 rounded-lg border border-gray-700 shadow-lg bg-gradient-to-t from-[#1D202B] to-[#242936]">
              <div className="w-full flex items-center justify-between gap-3">
                <div className="">
                  <h3 className="text-[0.6rem] text-gray-300 font-medium uppercase tracking-wider">
                    Data recieved
                  </h3>

                  <p className="mt-2 text-4xl font-thin text-white">
                    {convertSize(
                      networkUsage.dataRecieved,
                      1024 * 1024 * 1024,
                      2
                    )}{" "}
                    GB
                  </p>
                </div>

                <div className="">
                  <div className="flex items-center justify-end gap-3">
                    <h3 className="text-[0.6rem] text-right text-gray-300 font-medium uppercase tracking-wider">
                      Rate
                    </h3>

                    {drrState === "up" ? (
                      <div className="w-5 text-[#38B000]">
                        <GraphUpIcon />
                      </div>
                    ) : (
                      <div className="w-5 text-[#E9052B]">
                        <GraphDownIcon />
                      </div>
                    )}
                  </div>

                  <p className="mt-2 text-4xl font-thin text-white">
                    {convertSize(networkUsage.dataRecievedRate, 1024, 2)} KB
                  </p>
                </div>
              </div>

              <div className="w-full h-32">
                <LineChart
                  color="255, 0, 84"
                  displayYAxis={false}
                  dataY={dataRecievedReadingData}
                  dataX={timeData}
                />
              </div>
            </div>
            {/* end of data recieved */}

            {/* data sent */}
            <div className="w-full p-3 rounded-lg border border-gray-700 shadow-lg bg-gradient-to-t from-[#1D202B] to-[#242936]">
              <div className="w-full flex items-center justify-between gap-3">
                <div className="">
                  <h3 className="text-[0.6rem] text-gray-300 font-medium uppercase tracking-wider">
                    Data sent
                  </h3>

                  <p className="mt-2 text-4xl font-thin text-white">
                    {convertSize(networkUsage.dataSent, 1024 * 1024 * 1024, 2)}{" "}
                    GB
                  </p>
                </div>

                <div className="">
                  <div className="flex items-center justify-end gap-3">
                    <h3 className="text-[0.6rem] text-right text-gray-300 font-medium uppercase tracking-wider">
                      Rate
                    </h3>

                    {dsrState === "up" ? (
                      <div className="w-5 text-[#38B000]">
                        <GraphUpIcon />
                      </div>
                    ) : (
                      <div className="w-5 text-[#E9052B]">
                        <GraphDownIcon />
                      </div>
                    )}
                  </div>

                  <p className="mt-2 text-4xl font-thin text-white">
                    {convertSize(networkUsage.dataSentRate, 1024, 2)} KB
                  </p>
                </div>
              </div>

              <div className="w-full h-32">
                <LineChart
                  color="255, 84, 0"
                  displayYAxis={false}
                  dataY={dataSentReadingData}
                  dataX={timeData}
                />
              </div>
            </div>
            {/* end of data sent */}
          </div>

          {networkUsage.processes && (
            <div className="h-full w-full">
              <Table<Headings>
                headings={["process_name", "cpu", "memory"]}
                datas={networkUsage.processes.list.map((process) => ({
                  process_name: {
                    value: `<p className="text-gray-300 text-left">${process.name}</p>`,
                  },
                  cpu: {
                    value: `<p className="text-gray-300 text-center">${process.cpu}</p>`,
                  },
                  memory: {
                    value: `<p className="text-gray-300 text-center">${process.mem}</p>`,
                  },
                }))}
              />
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <div className="">
            <Loader />
          </div>
          <p className="mt-5 text-[0.65rem] text-gray-400 tracking-wide">
            Gathering network information, please wait
          </p>
        </div>
      )}
    </>
  );
};

export default NetworkUsage;
