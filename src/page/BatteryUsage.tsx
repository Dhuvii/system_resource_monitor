import { useEffect } from "react";
import { intervalToDuration } from "date-fns";

import useBatteryStore from "../store/batteryStore";
import { SysInfo } from "../../types";
import Battery from "../components/Battery";
import Loader from "@/components/Loader";

const BatteryUsage = () => {
  const convertTime = (secs: number) => {
    const { hours, minutes } = intervalToDuration({
      start: 0,
      end: secs * 1000,
    });

    return `${hours} hr ${minutes} mins`;
  };

  const batteryUsage = useBatteryStore((state) => state.batteryUsage);
  const isLoading = useBatteryStore((state) => state.isLoading);

  const updateStore = useBatteryStore((state) => state.update);

  useEffect(() => {
    window.Main.getBatteryReport();

    window.Main.on("batteryUsage", (data) => {
      const d = data as SysInfo["batteryUsage"];
      updateStore(d);
    });

    return () => {
      window.Main.endBatteryReport();
    };
  }, []);

  return (
    <>
      {!isLoading && batteryUsage && (
        <div className="h-full w-full">
          <div className="w-full h-full flex items-center justify-center gap-10">
            <Battery percentage={batteryUsage.percent} />

            <div className="w-[50%] p-3 bg-white/5 rounded-2xl">
              <div className="w-full grid grid-cols-2 gap-3">
                <Widget
                  Icon={() => (
                    <svg
                      className="w-10 h-10 text-[#357ded]"
                      viewBox="0 0 15 15"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M0 11.5A1.5 1.5 0 0 0 1.5 13h10a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 11.5 2h-10A1.5 1.5 0 0 0 0 3.5v8Zm6.724-6.447A.5.5 0 0 0 6 5.5v3.191L2.724 7.053l-.448.894l4 2A.5.5 0 0 0 7 9.5V6.309l3.276 1.638l.448-.894l-4-2Z"
                        clip-rule="evenodd"
                      />
                      <path fill="currentColor" d="M15 5v5h-1V5h1Z" />
                    </svg>
                  )}
                  label="Current Charge"
                  value={`${batteryUsage.percent}%`}
                />

                <Widget
                  Icon={() => (
                    <svg
                      className="w-10 h-10 text-[#D90368]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m19.562 12.098l1.531 2.652a3.5 3.5 0 0 1-3.03 5.25H16v2l-5-3.5l5-3.5v2h2.062a.498.498 0 0 0 .471-.668l-.038-.082l-1.531-2.652l2.598-1.5zM7.737 9.384l.53 6.08l-1.73-1l-1.032 1.786a.498.498 0 0 0 .343.742l.09.008H9v3H5.938a3.5 3.5 0 0 1-3.031-5.25l1.031-1.786l-1.732-1l5.53-2.58zm6.013-6.415c.532.307.974.749 1.281 1.281l1.03 1.786l1.733-1l-.53 6.08l-5.532-2.58l1.732-1l-1.031-1.786a.498.498 0 0 0-.814-.073l-.052.073l-1.53 2.652l-2.599-1.5l1.53-2.652a3.5 3.5 0 0 1 4.782-1.281z"
                      />
                    </svg>
                  )}
                  label="Cycle Count"
                  value={`${batteryUsage.cycleCount}`}
                />

                <Widget
                  Icon={() => (
                    <svg
                      className="w-10 h-10 text-[#FFD400]"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"
                      />
                    </svg>
                  )}
                  label="Voltage"
                  value={`${batteryUsage.voltage}`}
                />

                <Widget
                  Icon={() => (
                    <svg
                      className="w-10 h-10 text-[#FE4A49]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m.5 11H11l-4-2.3l.8-1.3l3.3 1.9V7h1.5v6Z"
                      />
                    </svg>
                  )}
                  label="Time remaning"
                  value={convertTime(batteryUsage.timeRemaining * 60)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <div className="">
            <Loader />
          </div>
          <p className="mt-5 text-[0.65rem] text-gray-400 tracking-wide">
            Gathering battery information, please wait
          </p>
        </div>
      )}
    </>
  );
};

const Widget = ({
  Icon,
  value,
  label,
}: {
  Icon: React.FC;
  value: number | string;
  label: string;
}) => {
  return (
    <div className="p-3 flex flex-col items-center justify-center gap-3 bg-[#1D202B] rounded-xl shadow-lg">
      {<Icon />}

      <p className="text-3xl font-thin text-white">{value}</p>
      <p className="whitespace-nowrap text-xs uppercase tracking-widest text-gray-400">
        {label}
      </p>
    </div>
  );
};

export default BatteryUsage;
