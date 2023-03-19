import gsap from "gsap";
import { useLayoutEffect } from "react";

const SplashScreen = () => {
  useLayoutEffect(() => {
    gsap.fromTo(
      ".blink",
      { opacity: 0.5 },
      { opacity: 1, duration: 1, repeat: -1, yoyo: true }
    );
  }, []);
  return (
    <div className="blink w-full h-screen flex flex-col items-center justify-center">
      <svg className="w-20 h-20" fill="none" viewBox="0 0 832 832">
        <g clipPath="url(#a)">
          <path
            fill="url(#b)"
            d="M757 0H75A75 75 0 0 0 0 75v682a75 75 0 0 0 75 75h682a75 75 0 0 0 75-75V75a75 75 0 0 0-75-75Z"
          />
          <path
            fill="#BE1E2D"
            d="M757 0H75A75 75 0 0 0 0 75v682a75 75 0 0 0 75 75h682a75 75 0 0 0 75-75V75a75 75 0 0 0-75-75Z"
          />
          <path
            fill="url(#c)"
            d="M757 0H75A75 75 0 0 0 0 75v682a75 75 0 0 0 75 75h682a75 75 0 0 0 75-75V75a75 75 0 0 0-75-75Z"
          />
          <path fill="#EAEAEA" d="M142.2 266.7h-21.4V832h21.4V266.7Z" />
          <path
            fill="#EAEAEA"
            d="M131.5 294.7a34.7 34.7 0 1 0 0-69.4 34.7 34.7 0 0 0 0 69.4Zm124.5 152h-21.4V832H256V446.7Z"
          />
          <path
            fill="#EAEAEA"
            d="M245.3 474.7a34.7 34.7 0 1 0 0-69.4 34.7 34.7 0 0 0 0 69.4Zm124.5-158h-21.4V832h21.4V316.7Z"
          />
          <path
            fill="#EAEAEA"
            d="M359.1 344.7a34.7 34.7 0 1 0 0-69.4 34.7 34.7 0 0 0 0 69.4Zm124.5-68h-21.4V832h21.4V276.7Z"
          />
          <path
            fill="#EAEAEA"
            d="M472.9 304.7a34.7 34.7 0 1 0 0-69.4 34.7 34.7 0 0 0 0 69.4Zm124.5-148H576V832h21.4V156.7Z"
          />
          <path
            fill="#EAEAEA"
            d="M586.7 184.7a34.7 34.7 0 1 0 0-69.4 34.7 34.7 0 0 0 0 69.4Zm124.5 112h-21.4V832h21.4V296.7Z"
          />
          <path
            fill="#EAEAEA"
            d="M700.5 324.7a34.7 34.7 0 1 0 0-69.4 34.7 34.7 0 0 0 0 69.4Z"
          />
          <path
            fill="url(#d)"
            d="M700.5 304.7a14.7 14.7 0 1 0 0-29.4 14.7 14.7 0 0 0 0 29.4Z"
          />
          <path
            fill="url(#e)"
            d="M586.7 164.7a14.7 14.7 0 1 0 0-29.4 14.7 14.7 0 0 0 0 29.4Z"
          />
          <path
            fill="url(#f)"
            d="M472.9 284.7a14.7 14.7 0 1 0 0-29.4 14.7 14.7 0 0 0 0 29.4Z"
          />
          <path
            fill="url(#g)"
            d="M359.1 324.7a14.7 14.7 0 1 0 0-29.4 14.7 14.7 0 0 0 0 29.4Z"
          />
          <path
            fill="url(#h)"
            d="M245.3 454.7a14.7 14.7 0 1 0 0-29.4 14.7 14.7 0 0 0 0 29.4Z"
          />
          <path
            fill="url(#i)"
            d="M131.5 274.7a14.7 14.7 0 1 0 0-29.4 14.7 14.7 0 0 0 0 29.4Z"
          />
        </g>
        <defs>
          <linearGradient
            id="b"
            x1="22"
            x2="792.4"
            y1="810"
            y2="39.6"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#474747" />
            <stop offset=".2" stopColor="#333" />
            <stop offset=".5" stopColor="#171717" />
            <stop offset=".8" stopColor="#060606" />
            <stop offset="1" />
          </linearGradient>
          <linearGradient
            id="c"
            x1="0"
            x2="832"
            y1="416"
            y2="416"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D32643" />
            <stop offset=".4" stopColor="#D12542" />
            <stop offset=".7" stopColor="#C8233E" />
            <stop offset=".9" stopColor="#BA1E39" />
            <stop offset="1" stopColor="#AD1A33" />
          </linearGradient>
          <linearGradient
            id="d"
            x1="685.8"
            x2="715.2"
            y1="290"
            y2="290"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C62236" />
            <stop offset=".3" stopColor="#C22135" />
            <stop offset=".5" stopColor="#B61E31" />
            <stop offset=".8" stopColor="#A1192A" />
            <stop offset="1" stopColor="#8C1423" />
          </linearGradient>
          <linearGradient
            id="e"
            x1="572"
            x2="601.4"
            y1="150"
            y2="150"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C62236" />
            <stop offset=".3" stopColor="#C22135" />
            <stop offset=".5" stopColor="#B61E31" />
            <stop offset=".8" stopColor="#A1192A" />
            <stop offset="1" stopColor="#8C1423" />
          </linearGradient>
          <linearGradient
            id="f"
            x1="458.2"
            x2="487.6"
            y1="270"
            y2="270"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C62236" />
            <stop offset=".3" stopColor="#C22135" />
            <stop offset=".5" stopColor="#B61E31" />
            <stop offset=".8" stopColor="#A1192A" />
            <stop offset="1" stopColor="#8C1423" />
          </linearGradient>
          <linearGradient
            id="g"
            x1="344.4"
            x2="373.8"
            y1="310"
            y2="310"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C62236" />
            <stop offset=".3" stopColor="#C22135" />
            <stop offset=".5" stopColor="#B61E31" />
            <stop offset=".8" stopColor="#A1192A" />
            <stop offset="1" stopColor="#8C1423" />
          </linearGradient>
          <linearGradient
            id="h"
            x1="230.6"
            x2="260"
            y1="440"
            y2="440"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C62236" />
            <stop offset=".3" stopColor="#C22135" />
            <stop offset=".5" stopColor="#B61E31" />
            <stop offset=".8" stopColor="#A1192A" />
            <stop offset="1" stopColor="#8C1423" />
          </linearGradient>
          <linearGradient
            id="i"
            x1="116.8"
            x2="146.2"
            y1="260"
            y2="260"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C62236" />
            <stop offset=".3" stopColor="#C22135" />
            <stop offset=".5" stopColor="#B61E31" />
            <stop offset=".8" stopColor="#A1192A" />
            <stop offset="1" stopColor="#8C1423" />
          </linearGradient>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h832v832H0z" />
          </clipPath>
        </defs>
      </svg>

      <div className="mt-5 text-base text-white">
        <span className="word px-0.5">S</span>
        <span className="word px-0.5">Y</span>
        <span className="word px-0.5">S</span>
        <span className="word px-0.5">T</span>
        <span className="word px-0.5">E</span>
        <span className="word px-0.5">M</span>
        <span className="">{"  "}</span>
        <span className="word px-0.5">R</span>
        <span className="word px-0.5">E</span>
        <span className="word px-0.5">S</span>
        <span className="word px-0.5">O</span>
        <span className="word px-0.5">U</span>
        <span className="word px-0.5">R</span>
        <span className="word px-0.5">C</span>
        <span className="word px-0.5">E</span>
        <span className="">{"  "}</span>
        <span className="word px-0.5">M</span>
        <span className="word px-0.5">O</span>
        <span className="word px-0.5">N</span>
        <span className="word px-0.5">I</span>
        <span className="word px-0.5">T</span>
        <span className="word px-0.5">O</span>
        <span className="word px-0.5">R</span>
      </div>
    </div>
  );
};

export default SplashScreen;
