import Link from "next/link";
import GetCombatRoster from "../reusableModules/getCombatRoster";
import GetReserveRoster from "../reusableModules/getReserveRoster";
import GetApiTimestamp from "../reusableModules/getApiTimestamp";
import GetRosterGroups from "../reusableModules/getGroups";
import AdrListEntry from "./modules/AdrListEntry";
import Logo from "../theme/adrLogo";
import "./page.css";
import "../globals.css";
import { Oxanium } from "next/font/google";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["700"],
});

// This route reads the live roster on every request and must never be
// prerendered. Since Next 15, no-store fetches no longer mark a route dynamic
// on their own, so opt in explicitly. Without this the build prerenders against
// the live API and fails.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Active Duty Roster",
};

export default async function ActiveDutyRoster() {
  const [combat, reserve, timestamp, groups] = await Promise.all([
    GetCombatRoster(),
    GetReserveRoster(),
    GetApiTimestamp(),
    GetRosterGroups(),
  ]);

  const milpacArray = [{ combat, reserve }];
  const rosterGroups = groups;

  const units = [
    {
      title: "15th MEU",
      selectors: [
        0,  // Regimental Headquarters
        1,  // Support Attachment
        2,  // 1-7 Command
        3,  // Alpha Company 1-7
        4,  // Bravo Company 1-7
        5,  // Charlie Company 1-7
        6,  // Delta Company 1-7
        7,  // 2-7 Command
        8,  // Alpha Company 2-7
        9,  // Bravo Company 2-7
        10, // Charlie Company 2-7
        11, // Echo Company 2-7
        12, // 3-7 Command
        13, // Alpha Company 3-7
        14, // Bravo Company 3-7
        15, // Charlie Company 3-7
        16, // ACD Command
        17, // Alpha Company ACD
        18, // Bravo Company ACD
        19, // Charlie Company ACD
        20, // Delta Company ACD
        21, // Starter Platoon Command
        22, // Alpha Platoon DEVCOM
        23, // Bravo Platoon DEVCOM
        24, // Charlie Platoon DEVCOM
        25, // Delta Platoon DEVCOM
      ],
    },
  ];
  return (
    <div className="MasterContainer">
      <div className="p-nav-primary">
        <div className="p-nav-wrapper">
          <nav className="p-nav">
            <div className="p-nav-inner">
              <div className="p-nav-scroller">
                <div className="p-nav-logo">
                  <Link href={"/"}>
                    <Logo
                      alt="ADR Logo"
                      title="Return to CavApps"
                      width="17em"
                      height="3em"
                    />
                  </Link>
                </div>
                <div className="p-nav-info">
                  {timestamp && timestamp[0]?.combat !== null && (
                    <div className="cache-time">
                      Database is {timestamp[0].combat} minutes old
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="ListContainer">
        {units.map((unit) => (
          <div className="DepartmentContainer" key={unit.title}>
            <div
              className="Title"
              style={{ fontFamily: oxanium.style.fontFamily }}
            >
              {unit.title}
            </div>
            {unit.selectors.map((selector) => (
              <AdrListEntry
                key={`${unit.title}-${selector}`} // Unique key for AdrListEntry
                rGSelector={selector}
                milpacArray={milpacArray}
                rosterGroups={rosterGroups}
              />
            ))}
          </div>
        ))}
        {/*<AdrListEntry bBGroup="twoSeven" milpacArray={milpacArray} />
        <AdrListEntry bBGroup="threeSeven" milpacArray={milpacArray} />
        <AdrListEntry bBGroup="acd" milpacArray={milpacArray} />
        <AdrListEntry bBGroup="secOps" milpacArray={milpacArray} />
        <AdrListEntry bBGroup="roo" milpacArray={milpacArray} />
        <AdrListEntry bBGroup="support" milpacArray={milpacArray} /> */}
      </div>
    </div>
  );
}
