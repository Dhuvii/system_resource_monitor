import { useEffect, useState } from "react";

export default function useStateComparator(data: number = 0) {
  const [drr, setDrr] = useState(0);
  const [drrState, setDrrState] = useState<"up" | "down">("up");
  useEffect(() => {
    setDrr((pv) => {
      if (pv > data) {
        setDrrState("down");
      } else {
        setDrrState("up");
      }
      return data;
    });
  }, [data]);

  return drrState;
}
