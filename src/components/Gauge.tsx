import { Fragment } from "react";
import arrayOf from "../utilities/arrayOf";

type GaugeProps = {
  numberOfPoints?: number;
  divisions?: number;
  angleFrom?: number;
  angleTo?: number;
  height?: number;
  percentage?: number;
  children: React.ReactNode;
  classCompleted?: string;
  classUnCompleted?: string;
};

const Gauge = ({
  numberOfPoints = 72,
  divisions = 12,
  angleFrom = -20,
  angleTo = 200,
  height = 40,
  percentage = 10,
  classCompleted,
  classUnCompleted,
  children,
}: GaugeProps) => {
  function isAngleInLimit(angle: number) {
    return angle >= angleFrom + 270 || angle <= angleTo - 90;
  }

  function recalculateAngle(angle: number) {
    return angle >= 0 && angle <= 180
      ? angle + (angleTo - 90)
      : angle - (angleFrom + 270);
  }

  function calculatePercentage(value: number) {
    const totalAngle = Math.abs(angleFrom) + Math.abs(angleTo);
    return totalAngle * (value / 100);
  }

  return (
    <div className="w-full aspect-square relative">
      {arrayOf(numberOfPoints).map((el, idx) => (
        <Fragment key={idx}>
          {isAngleInLimit((numberOfPoints / divisions) * idx) && (
            <>
              <div
                style={{
                  rotate: `${(numberOfPoints / divisions) * idx}deg`,
                }}
                className="h-full w-0.5 flex items-start justify-center left-[50%] absolute bottom-0 inset-y-0"
              >
                <div
                  style={{ height }}
                  className={`w-full text-[0.3rem] ${
                    calculatePercentage(percentage) >=
                    recalculateAngle((numberOfPoints / divisions) * idx)
                      ? `${classCompleted ? classCompleted : "bg-red-500"} `
                      : `${
                          classUnCompleted ? "classUnCompleted" : "bg-gray-300"
                        } `
                  } rounded-full`}
                ></div>
              </div>
            </>
          )}
        </Fragment>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Gauge;