import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

type CircularProgressProps = {
  percentage?: number;
  children?: React.ReactNode;
  thickness?: number;
  innerPadding?: number;
  colorStart?: string;
  colorStop?: string;
};

const CircularProgress = ({
  percentage = 10,
  children,
  thickness = 10,
  innerPadding = 2,
  colorStart = "#57C84D",
  colorStop = "#54C24B",
}: CircularProgressProps) => {
  const containerEl = useRef<HTMLDivElement>(null);
  const circleEl = useRef<SVGCircleElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let win_on_resize: any;
    if (containerEl && containerEl.current) {
      setWidth(() => calculateWidth(containerEl));
      win_on_resize = window.addEventListener("resize", () =>
        setWidth(() => calculateWidth(containerEl))
      );
    }

    return () => {
      window.removeEventListener("resize", win_on_resize);
    };
  }, [containerEl, percentage]);

  function calculateWidth(
    containerEl: React.RefObject<HTMLDivElement>
  ): number {
    if (containerEl && containerEl.current) {
      const client = containerEl.current.getBoundingClientRect();
      return client.right - client.left;
    }
    return 0;
  }

  useLayoutEffect(() => {
    if (circleEl && percentage) {
      gsap.to(circleEl.current, {
        strokeDashoffset: `
                ${
                  (44 / 7) * (width / 2 - 10) -
                  (percentage * ((44 / 7) * (width / 2 - 10))) / 100
                }
              `,
        duration: 1,
        ease: "elastic.out(0.5, 0.5)",
      });
    }
  }, [percentage, circleEl]);

  return (
    <div ref={containerEl} className="w-full relative aspect-square">
      <div className="w-full absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>

      <div
        style={{ padding: `${innerPadding}px` }}
        className="w-full absolute z-10 inset-0 flex items-center justify-center"
      >
        <div
          style={{ borderWidth: `${thickness + 5}px` }}
          className="w-full aspect-square rounded-full border-white/5"
        ></div>
      </div>

      <div className="w-full h-full relative z-20 inset-0 -rotate-90">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id={`loaderGradient${colorStart}${colorStop}`}>
              <stop offset="0%" stopColor={colorStart} />
              <stop offset="100%" stopColor={colorStop} />
            </linearGradient>
          </defs>
          {width && (
            <circle
              ref={circleEl}
              style={{
                fill: "none",
                stroke: `url(#${`loaderGradient${colorStart}${colorStop}`})`,
                strokeWidth: `${thickness}px`,
              }}
              cx={width / 2}
              cy={width / 2}
              r={width / 2 - thickness}
              //2 * PI * r
              strokeDasharray={(44 / 7) * (width / 2 - thickness)}
              //strokeDashoffset={(44 / 7) * (width / 2 - thickness)}
              strokeDashoffset={`
                ${
                  (44 / 7) * (width / 2 - 10) -
                  (percentage * ((44 / 7) * (width / 2 - 10))) / 100
                }
              `}
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default CircularProgress;
