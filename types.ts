import si from "systeminformation";

export type SysInfo = {
  user: si.Systeminformation.OsData &
    si.Systeminformation.SystemData & {
      userName: string;
      hasBattery: boolean;
      memory: number;
    };
  cpuUsage: {
    model: string;
    idle: number;
    user: number;
    system: number;
    total: number;
    avgLoad: number;
  };

  memoryUsage: {
    total: number;
    free: number;
    memUsed: number;
    swap: number;
    cached: number;
  };

  networkUsage: {
    dataRecieved: number;
    dataSent: number;
    dataRecievedRate: number;
    dataSentRate: number;
    processes: si.Systeminformation.ProcessesData;
  };

  batteryUsage: si.Systeminformation.BatteryData;
};
