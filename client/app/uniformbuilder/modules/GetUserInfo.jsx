import GetCoordArray from "./getCoordArray";
import GetCitationCoordArray from "./getCitationCoordArray";
import GetCombatBadgeCoords from "./getCombatBadgeCoords";
import GetYearsInServiceCoordArray from "./getYearsInServiceCoordArray";
import GetTabCoordArray from "./getTabCoordArray";
import { Mos, MosGroup } from "./constants";

export default function GetUserInfo(
  dataActive,
  ribbonCount,
  citationCount,
  yearsInService,
  tabCount,
) {
  const rankGrade = getRankGrade(dataActive.rank.rankId);

  const returnObject = {
    nameTag: generateNameTag(dataActive.user.username),
    rank: dataActive.rank.rankShort,
    rankId: dataActive.rank.rankId,
    rankGrade: rankGrade,
    ribbonCount: ribbonCount,
    unitCitationCount: citationCount,
    yearsInService: yearsInService,
    tabCount: tabCount,
    yearsInServiceCoordArray: [],
    ribbonCoordArray: [],
    unitCitationCoordArray: [],
    combatBadgeCoords: [],
    tabCoordArray: [],
    mosCheck: checkMos(dataActive.mos, rankGrade),
    shoulderCord: setShoulderCord(dataActive.mos),
    neckPins: setNeckPins(dataActive.mos),
  };
  returnObject.ribbonCoordArray = GetCoordArray(ribbonCount);
  returnObject.unitCitationCoordArray = GetCitationCoordArray(citationCount);
  returnObject.combatBadgeCoords = GetCombatBadgeCoords(ribbonCount);
  returnObject.yearsInServiceCoordArray = GetYearsInServiceCoordArray(
    yearsInService,
    rankGrade,
  );
  returnObject.tabCoordArray = GetTabCoordArray(tabCount);

  return returnObject;
}

function generateNameTag(username) {
  const periodIndex = username.indexOf(".");
  const nameTag = username.substring(0, periodIndex);
  return nameTag.toUpperCase();
}

function getRankGrade(rankId) {
  // NF Rosters IDs, not pay grades: Warrant Officers sit between O and E.
  const grades = {
    2: "O10",
    3: "O9",
    4: "O8",
    5: "O7",
    6: "O6",
    7: "O5",
    8: "O4",
    9: "O3",
    10: "O2",
    11: "O1",
    12: "W5",
    13: "W4",
    14: "W3",
    15: "W2",
    16: "W1",
    17: "E9",
    18: "E8",
    19: "E9",
    20: "E8",
    21: "E7",
    22: "E6",
    23: "E5",
    24: "E4",
    25: "E3",
    26: "E2",
    27: "E1",
  };
  return grades[rankId] ?? "E0";
}

function setShoulderCord(mos) {
  switch (mos) {
    case Mos.COMBAT_MEDIC:
    case Mos.MEDICAL_OFFICER:
      return "Medical";
    case Mos.INFANTRYMAN:
    case Mos.INFANTRY_OFFICER:
    case Mos.MACHINE_GUNNER:
    case Mos.ANTITANK_MISSILE_GUNNER:
    case Mos.INFANTRY_UNIT_LEADER:
    case Mos.INDIRECT_FIRE_INFANTRYMAN:
      return "Infantry";
    case Mos.FIELD_ARTILLERY_OFFICER:
    case Mos.CANNON_CREWMEMBER:
      return "Artillery";
    case Mos.COMBAT_ENGINEER_OFFICER:
    case Mos.COMBAT_ENGINEER:
      return "Engineer";
    case Mos.OFFICER_GENERALIST:
      return "Aide";
    case Mos.MP_OFFICER:
    case Mos.MP_ENLISTED:
      return "MP";
    case Mos.ARMOR_CREWMAN:
    case Mos.ARMOR_CAVALRY_OFFICER:
    case Mos.BRADLEY_CREWMEMBER:
    case Mos.CAVALRY_SCOUT:
      return "Armor";
    case Mos.GROUND_SUPPLY_OFFICER:
    case Mos.LOGISTICS_OFFICER:
    case Mos.LOGISTICS_EMBARKATION_SPECIALIST:
    case Mos.LOGISTICS_ENLISTED:
      return "Logistics";
    default:
      return false;
  }
}

function setNeckPins(mos) {
  switch (mos) {
    case Mos.ROTARY_WING_AVIATOR_WARRANT_OFFICER:
    case Mos.FIXED_WING_AVIATOR_WARRANT_OFFICER:
    case Mos.AVIATION_OFFICER:
      return "AviationOfficer";
    case Mos.ENLISTED_ROTARY_CREWMAN:
    case Mos.JET_AIRCRAFT_PILOT:
      return "AviationNCO";
    case Mos.FIELD_ARTILLERY_OFFICER:
      return "ArtilleryOfficer";
    case Mos.CANNON_CREWMEMBER:
      return "ArtilleryNCO";
    case Mos.MEDICAL_OFFICER:
      return "MedicalOfficer";
    case Mos.COMBAT_MEDIC:
      return "MedicalNCO";
    case Mos.COMBAT_ENGINEER_OFFICER:
      return "EngineerOfficer";
    case Mos.COMBAT_ENGINEER:
      return "EngineerNCO";
    case Mos.OFFICER_GENERALIST:
      return "Aide";
    case Mos.COMMAND_SERGEANT_MAJOR:
      return "CSM";
    case Mos.REGIMENTAL_TECHNICAL_AIDE:
    case Mos.S6_OFFICER:
      return "IMOOfficer";
    case Mos.DATA_SYSTEMS_ADMINISTRATOR:
    case Mos.S6_ENLISTED:
      return "IMONCO";
    case Mos.S1_OFFICER:
    case Mos.S3_OFFICER:
    case Mos.S5_OFFICER:
      return "S1S3S5";
    case Mos.S2_NCO:
      return "S2NCO";
    case Mos.S2_OFFICER:
      return "S2Officer";
    case Mos.MP_OFFICER:
      return "MPOfficer";
    case Mos.MP_ENLISTED:
      return "MPNCO";
    case Mos.ARMOR_CAVALRY_OFFICER:
      return "ArmorOfficer";
    case Mos.ARMOR_CREWMAN:
    case Mos.BRADLEY_CREWMEMBER:
    case Mos.CAVALRY_SCOUT:
      return "ArmorNCO";
    case Mos.JAG_OFFICER:
      return "JAGOfficer";
    case Mos.JAG_ENLISTED:
      return "JAGNCO";
    case Mos.DEVCOM_LEAD:
    case Mos.RDC_OFFICER:
      return "RDCOfficer";
    case Mos.INFANTRY_OFFICER:
    case Mos.FIELD_ARTILLERY_OFFICER:
    case Mos.S7_OFFICER:
    case Mos.RRD_OFFICER:
    case Mos.RTC_OFFICER:
    case Mos.WAG_OFFICER:
    case Mos.ODS_OFFICER:
    case Mos.NCOA_OFFICER:
      return "InfantryOfficer";
    case Mos.INFANTRYMAN:
    case Mos.MACHINE_GUNNER:
    case Mos.ANTITANK_MISSILE_GUNNER:
    case Mos.INFANTRY_UNIT_LEADER:
    case Mos.INDIRECT_FIRE_INFANTRYMAN:
    case Mos.S1_ENLISTED:
    case Mos.S3_ENLISTED:
    case Mos.COMBAT_GRAPHICS_SPECIALIST:
    case Mos.S5_ENLISTED:
    case Mos.RRD_ENLISTED:
    case Mos.RTC_ENLISTED:
    case Mos.DEVCOM_SUPPORT_COORDINATOR:
    case Mos.FCC_ANALYST:
    case Mos.WAG_ENLISTED:
    case Mos.NCOA_ENLISTED:
      return "InfantryNCO";
    case Mos.GROUND_SUPPLY_OFFICER:
    case Mos.LOGISTICS_OFFICER:
      return "LogisticsOfficer";
    case Mos.LOGISTICS_EMBARKATION_SPECIALIST:
    case Mos.LOGISTICS_ENLISTED:
      return "LogisticsNCO";
    default:
      return false;
  }
}

export function checkMos(mos, rankGrade) {
  if (mos == null || (typeof mos === "string" && mos.trim() === "")) {
    return null;
  }

  const code = typeof mos === "string" ? mos.trim() : mos;
  const categories = [
    ["OFFICER", "O", "commissioned officer"],
    ["WARRANT_OFFICER", "W", "warrant officer"],
    ["ENLISTED", "E", "enlisted"],
  ];
  const category = categories.find(([type]) => MosGroup[type].includes(code));

  if (!category) {
    return [
      "Failed",
      `Unknown or unsupported USMC MOS ${code}. Inform your lead if you see this error.`,
    ];
  }

  const [, gradePrefix, label] = category;
  if (typeof rankGrade !== "string" || !rankGrade.startsWith(gradePrefix)) {
    return [
      "Failed",
      `MOS ${code} is a ${label} MOS and requires an ${gradePrefix} grade; received ${rankGrade ?? "unknown"}. Inform your lead if you see this error.`,
    ];
  }

  return null;
}
