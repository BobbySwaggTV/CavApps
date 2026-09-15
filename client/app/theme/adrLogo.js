import * as React from "react";
import { Oxanium } from "next/font/google";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["700"],
});

const Logo = (props) => (
  <div
    {...props}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      width: "100%",
    }}
  >
    <img
      src="/15thmeu-Logo.png"
      alt="15th MEU"
      style={{
        width: "48px",
        height: "48px",
        objectFit: "contain",
      }}
    />

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        lineHeight: 1,
      }}
    >
      <div
        style={{
          fontFamily: oxanium.style.fontFamily,
          fontSize: "22px",
          fontWeight: "700",
          color: "#ffffff",
          textAlign: "left",
        }}
      >
        15th MEU
      </div>

      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "10px",
          fontWeight: "700",
          color: "#b11226",
          marginTop: "4px",
          letterSpacing: "0.08em",
          textAlign: "left",
        }}
      >
        ACTIVE DUTY ROSTER
      </div>
    </div>
  </div>
);

export default Logo;
