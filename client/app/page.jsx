import Link from "next/link";
import Logo from "./theme/appsLogo";
import "./page.css";

export default function Home() {
  return (
    <div className="masterbox">
      <div className="logobox">
        <img
          src="/15thmeu-Logo.png"
          alt="15th Marine Expeditionary Unit"
          style={{
            width: "260px",
            height: "260px",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />
        <Logo width="50em" height="15em" />
      </div>
      <div className="buttonbox">
        <Link href="/adr">
          <button className="button">Active Duty Roster</button>
        </Link>
        <Link href="/rosterstatistics">
          <button className="button">Roster Statistics</button>
        </Link>
        <Link href="/uniformbuilder">
          <button className="button">Uniform Builder</button>
        </Link>
        <Link href="/rosterhistory">
          <button className="button">Roster History</button>
        </Link>
      </div>
    </div>
  );
}
