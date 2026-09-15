// Supported USMC MOS codes, kept as strings to preserve leading zeroes.
// Legacy roles without a clear Marine equivalent remain for existing uniform
// switches and badge eligibility only; they are NOT valid USMC MOS values.
// This is an initial supported catalog, not an exhaustive USMC MOS directory.
export const Mos = Object.freeze({
  GROUND_SUPPLY_OFFICER: "3002",
  AIRCRAFT_MAINTENANCE_OFFICER: "6002",
  AIR_SUPPORT_CONTROL_OFFICER: "7202",
  INFANTRY_WEAPONS_OFFICER: "0306",
  INTELLIGENCE_OPERATIONS_AND_FUSION_WARRANT_OFFICER: "0205",
  MACHINE_GUNNER: "0331",
  ANTITANK_MISSILE_GUNNER: "0352",
  INFANTRY_UNIT_LEADER: "0369",
  LOGISTICS_EMBARKATION_SPECIALIST: "0431",
  DATA_SYSTEMS_ADMINISTRATOR: "0671",
  COMBAT_GRAPHICS_SPECIALIST: "4512",
  // Aviation
  AVIATION_OFFICER: "15A",
  ROTARY_WING_AVIATOR_WARRANT_OFFICER: "153A",
  FIXED_WING_AVIATOR_WARRANT_OFFICER: "155A",
  JET_AIRCRAFT_PILOT: "155F",
  ENLISTED_ROTARY_CREWMAN: "15T",
  // Infantry
  INFANTRY_OFFICER: "0302",
  INFANTRYMAN: "0311",
  INDIRECT_FIRE_INFANTRYMAN: "0341",
  // Medical
  MEDICAL_OFFICER: "67A",
  COMBAT_MEDIC: "68W",
  // Armor / Cavalry
  ARMOR_CAVALRY_OFFICER: "19A",
  BRADLEY_CREWMEMBER: "19C",
  CAVALRY_SCOUT: "19D",
  ARMOR_CREWMAN: "19K",
  // Engineer
  COMBAT_ENGINEER_OFFICER: "1302",
  COMBAT_ENGINEER: "1371",
  // Field Artillery
  FIELD_ARTILLERY_OFFICER: "0802",
  CANNON_CREWMEMBER: "0811",
  // Command
  COMMAND_SERGEANT_MAJOR: "00Z",
  OFFICER_GENERALIST: "01A",
  // Staff — S1
  S1_OFFICER: "42B",
  S1_ENLISTED: "42A",
  // Staff — S2
  S2_OFFICER: "0202",
  S2_NCO: "35B",
  S2_ENLISTED: "0231",
  // Staff — S3
  S3_OFFICER: "57A",
  S3_ENLISTED: "57B",
  // Staff — S5
  S5_OFFICER: "4502",
  S5_ENLISTED: "46S",
  // Staff — S6
  S6_OFFICER: "0602",
  S6_ENLISTED: "0621",
  REGIMENTAL_TECHNICAL_AIDE: "255N",
  // Staff — S7
  S7_OFFICER: "47A",
  // Military Police
  MP_OFFICER: "5803",
  MP_ENLISTED: "5811",
  // JAG
  JAG_OFFICER: "4402",
  JAG_ENLISTED: "27D",
  // Logistics
  LOGISTICS_OFFICER: "0402",
  LOGISTICS_ENLISTED: "3043",
  // RRD
  RRD_OFFICER: "79A",
  RRD_ENLISTED: "79R",
  // RTC
  RTC_OFFICER: "79Z",
  RTC_ENLISTED: "79X",
  // WAG
  WAG_OFFICER: "26Z",
  WAG_ENLISTED: "26B",
  // Other commands / schools
  ODS_OFFICER: "47Q",
  NCOA_OFFICER: "47C",
  NCOA_ENLISTED: "47T",
  FCC_ANALYST: "49A",
  RDC_OFFICER: "50A",
  DEVCOM_LEAD: "51A",
  DEVCOM_SUPPORT_COORDINATOR: "51S",
});

// Validation categories are explicit: never infer type from a code's shape.
// The separate legacy badge groups below retain their existing membership;
// maintenance/control officers must not be treated as pilots automatically.
export const MosGroup = Object.freeze({
  OFFICER: Object.freeze([
    Mos.INFANTRY_OFFICER,
    Mos.S2_OFFICER,
    Mos.LOGISTICS_OFFICER,
    Mos.S6_OFFICER,
    Mos.FIELD_ARTILLERY_OFFICER,
    Mos.COMBAT_ENGINEER_OFFICER,
    Mos.GROUND_SUPPLY_OFFICER,
    Mos.JAG_OFFICER,
    Mos.S5_OFFICER,
    Mos.MP_OFFICER,
    Mos.AIRCRAFT_MAINTENANCE_OFFICER,
    Mos.AIR_SUPPORT_CONTROL_OFFICER,
  ]),
  WARRANT_OFFICER: Object.freeze([
    Mos.INFANTRY_WEAPONS_OFFICER,
    Mos.INTELLIGENCE_OPERATIONS_AND_FUSION_WARRANT_OFFICER,
  ]),
  ENLISTED: Object.freeze([
    Mos.INFANTRYMAN,
    Mos.MACHINE_GUNNER,
    Mos.INDIRECT_FIRE_INFANTRYMAN,
    Mos.ANTITANK_MISSILE_GUNNER,
    Mos.INFANTRY_UNIT_LEADER,
    Mos.S2_ENLISTED,
    Mos.LOGISTICS_EMBARKATION_SPECIALIST,
    Mos.S6_ENLISTED,
    Mos.DATA_SYSTEMS_ADMINISTRATOR,
    Mos.CANNON_CREWMEMBER,
    Mos.COMBAT_ENGINEER,
    Mos.LOGISTICS_ENLISTED,
    Mos.COMBAT_GRAPHICS_SPECIALIST,
    Mos.MP_ENLISTED,
  ]),
  // Legacy Army badge eligibility, pending a separate uniform adaptation.
  AVIATION: [
    Mos.ROTARY_WING_AVIATOR_WARRANT_OFFICER,
    Mos.FIXED_WING_AVIATOR_WARRANT_OFFICER,
    Mos.AVIATION_OFFICER,
    Mos.ENLISTED_ROTARY_CREWMAN,
    Mos.JET_AIRCRAFT_PILOT,
  ],
  MEDICAL: [Mos.COMBAT_MEDIC, Mos.MEDICAL_OFFICER],
  // Aviation MOSs that crew aircraft rather than pilot them.
  ROTARY_CREW: [Mos.ENLISTED_ROTARY_CREWMAN],
});
