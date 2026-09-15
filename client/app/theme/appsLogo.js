import * as React from "react";
import { Oxanium } from "next/font/google";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["700"],
});

const Logo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={520}
    height={180}
    viewBox="0 0 520 180"
    {...props}
  >
    <rect width="520" height="180" fill="none" />

    <text
      x="260"
      y="78"
      textAnchor="middle"
      fontFamily={oxanium.style.fontFamily}
      fontSize="72"
      fontWeight="700"
      fill="#ffffff"
      stroke="#000000"
      strokeWidth="3"
      paintOrder="stroke"
    >
      15th MEU
    </text>

    <text
      x="260"
      y="130"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="38"
      fontWeight="600"
      fill="#b11226"
    >
      Operations Portal
    </text>
  </svg>
);

export default Logo;