// Extensions are explicit so this module resolves under plain Node as well as
// the Next bundler: generateAwardSprites.js imports it directly to read award
// placement, and Node's ESM resolver does not guess extensions.
import { AwardType } from "./awardTypes.js";
import { AwardAttachmentType } from "./awardAttachmentTypes.js";
import { BadgeFamily } from "./badgeFamilies.js";
import { BadgeImages } from "./badgeImages.js";

// The full award catalog: name + per-award metadata. AwardRegistry loops this
// in order to populate its Map, so KEEP THE ORDER STABLE — Map iteration order
// is insertion order and downstream code may rely on it. `name` is the Map key;
// every other field becomes the stored detail object verbatim.
export const AWARD_CATALOG = [
  //____ MAINLINE MEDALS AND RIBBONS ____
  // Clean ribbonSpriteSheet.png: 43 px wide, 43x13 art, 14 px row pitch.
  // awardPriority is the zero-based ribbon row; row 41 stays reserved.
  // Medal priorities retain their existing placement independently.
  // Real awards without implemented devices intentionally use plain Medal or
  // Ribbon (not MedalWithValor, which forces Army oak-leaf valor overlays).

  // Real Navy/Marine and Joint awards.
  // TODO: DON gold/silver repeat stars and any authorized letter devices.
  {
    name: "Navy Cross",
    awardPriority: 0,
    medalPriority: 0,
    awardType: AwardType.Medal,
  },
  {
    name: "Defense Distinguished Service Medal",
    awardPriority: 1,
    medalPriority: 1,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS,
    awardType: AwardType.Medal,
  },
  // TODO: DON gold/silver repeat stars and any authorized letter devices.
  {
    name: "Navy Distinguished Service Medal",
    awardPriority: 2,
    medalPriority: 2,
    awardType: AwardType.Medal,
  },
  // TODO: DON gold/silver repeat stars and any authorized letter devices.
  {
    name: "Silver Star",
    awardPriority: 3,
    medalPriority: 3,
    awardType: AwardType.Medal,
  },
  {
    name: "Defense Superior Service Medal",
    awardPriority: 4,
    medalPriority: 4,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS,
    awardType: AwardType.Medal,
  },
  // TODO: DON gold/silver repeat stars and any authorized letter devices.
  {
    name: "Legion of Merit",
    awardPriority: 5,
    medalPriority: 5,
    awardType: AwardType.Medal,
  },
  // TODO: DON gold/silver repeat stars and any authorized letter devices.
  {
    name: "Distinguished Flying Cross",
    awardPriority: 6,
    medalPriority: 6,
    awardType: AwardType.Medal,
  },
  // TODO: DON gold/silver repeat stars and any authorized letter devices.
  {
    name: "Navy and Marine Corps Medal",
    awardPriority: 7,
    medalPriority: 7,
    awardType: AwardType.Medal,
  },
  // TODO: DON gold/silver repeat stars and any authorized letter devices.
  {
    name: "Bronze Star Medal",
    awardPriority: 8,
    medalPriority: 8,
    awardType: AwardType.Medal,
  },
  // TODO: DON gold/silver repeat stars and any authorized letter devices.
  {
    name: "Purple Heart",
    awardPriority: 9,
    medalPriority: 9,
    awardType: AwardType.Medal,
  },
  {
    name: "Defense Meritorious Service Medal",
    awardPriority: 10,
    medalPriority: 10,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS,
    awardType: AwardType.Medal,
  },
  // TODO: DON gold/silver repeat stars and any authorized letter devices.
  {
    name: "Meritorious Service Medal",
    awardPriority: 11,
    medalPriority: 11,
    awardType: AwardType.Medal,
  },
  // TODO: DON Air Medal numerals and V/C; NCO_NUMS is not equivalent.
  {
    name: "Air Medal",
    awardPriority: 12,
    medalPriority: 12,
    awardType: AwardType.Medal,
  },
  {
    name: "Joint Service Commendation Medal",
    awardPriority: 13,
    medalPriority: 13,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS,
    awardType: AwardType.Medal,
  },
  // TODO: DON gold/silver repeat stars and any authorized letter devices.
  {
    name: "Navy and Marine Corps Commendation Medal",
    awardPriority: 14,
    medalPriority: 14,
    awardType: AwardType.Medal,
  },
  {
    name: "Joint Service Achievement Medal",
    awardPriority: 15,
    medalPriority: 15,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS,
    awardType: AwardType.Medal,
  },
  // TODO: DON gold/silver repeat stars and any authorized letter devices.
  {
    name: "Navy and Marine Corps Achievement Medal",
    awardPriority: 16,
    medalPriority: 16,
    awardType: AwardType.Medal,
  },
  // TODO: DON gold/silver repeat stars and any authorized letter devices.
  {
    name: "Combat Action Ribbon",
    awardPriority: 17,
    awardType: AwardType.Ribbon,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Prisoner of War Medal",
    awardPriority: 18,
    medalPriority: 17,
    awardType: AwardType.Medal,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Marine Corps Good Conduct Medal",
    awardPriority: 19,
    medalPriority: 18,
    awardType: AwardType.Medal,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Marine Corps Expeditionary Medal",
    awardPriority: 20,
    medalPriority: 19,
    awardType: AwardType.Medal,
  },
  // TODO: campaign-phase stars, including initial phase; not row counts.
  {
    name: "European-African-Middle Eastern Campaign Medal",
    awardPriority: 21,
    medalPriority: 20,
    awardType: AwardType.Medal,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "National Defense Service Medal",
    awardPriority: 22,
    medalPriority: 21,
    awardType: AwardType.Medal,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Armed Forces Expeditionary Medal",
    awardPriority: 23,
    medalPriority: 22,
    awardType: AwardType.Medal,
  },
  // TODO: campaign-phase stars, including initial phase; not row counts.
  {
    name: "Afghanistan Campaign Medal",
    awardPriority: 24,
    medalPriority: 23,
    awardType: AwardType.Medal,
  },
  // TODO: campaign-phase stars, including initial phase; not row counts.
  {
    name: "Iraq Campaign Medal",
    awardPriority: 25,
    medalPriority: 24,
    awardType: AwardType.Medal,
  },
  // TODO: campaign-phase stars, including initial phase; not row counts.
  {
    name: "Inherent Resolve Campaign Medal",
    awardPriority: 26,
    medalPriority: 25,
    awardType: AwardType.Medal,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Global War on Terrorism Expeditionary Medal",
    awardPriority: 27,
    medalPriority: 26,
    awardType: AwardType.Medal,
  },
  // No devices authorized; duplicates must remain plain.
  {
    name: "Global War on Terrorism Service Medal",
    awardPriority: 28,
    medalPriority: 27,
    awardType: AwardType.Medal,
  },
  // No devices authorized; duplicates must remain plain.
  {
    name: "Korea Defense Service Medal",
    awardPriority: 29,
    medalPriority: 28,
    awardType: AwardType.Medal,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Armed Forces Service Medal",
    awardPriority: 30,
    medalPriority: 29,
    awardType: AwardType.Medal,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Humanitarian Service Medal",
    awardPriority: 31,
    medalPriority: 30,
    awardType: AwardType.Medal,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Military Outstanding Volunteer Service Medal",
    awardPriority: 32,
    medalPriority: 31,
    awardType: AwardType.Medal,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Sea Service Deployment Ribbon",
    awardPriority: 33,
    awardType: AwardType.Ribbon,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Navy and Marine Corps Overseas Service Ribbon",
    awardPriority: 34,
    awardType: AwardType.Ribbon,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Marine Corps Recruiting Ribbon",
    awardPriority: 35,
    awardType: AwardType.Ribbon,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Marine Corps Drill Instructor Ribbon",
    awardPriority: 36,
    awardType: AwardType.Ribbon,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Marine Corps Security Guard Ribbon",
    awardPriority: 37,
    awardType: AwardType.Ribbon,
  },
  // TODO: verified service-star assets and award-specific count rules.
  {
    name: "Marine Corps Combat Instructor Ribbon",
    awardPriority: 38,
    awardType: AwardType.Ribbon,
  },

  // Legacy UN identity/devices unresolved (plan U1); no guessed devices.
  {
    name: "United Nations Service Medal",
    awardPriority: 39,
    medalPriority: 32,
    awardType: AwardType.Medal,
  },

  // 15th MEU custom awards: preserve their local tier/device behavior.
  {
    name: "15th MEU Lifetime Achievement Award",
    awardPriority: 40,
    medalPriority: 34,
    awardType: AwardType.Medal,
  },
  // Row 41 RESERVED: future replacement for the old Coldblud award.
  // Lifetime Dedication is a separate badge PNG, not a ribbon or medal.
  {
    name: "15th MEU Donation Ribbon",
    awardPriority: 42,
    awardAttachmentType: AwardAttachmentType.STARS_DONATION,
    awardType: AwardType.RibbonDonationLogic,
  },
  {
    name: "15th MEU Server Upgrade Award",
    awardPriority: 43,
    medalPriority: 36,
    awardAttachmentType: AwardAttachmentType.STARS,
    awardType: AwardType.MedalTiered,
  },
  {
    name: "15th MEU Honor Graduate Ribbon",
    awardPriority: 44,
    awardType: AwardType.Ribbon,
  },
  {
    name: "15th MEU Centurion Medal",
    awardPriority: 45,
    medalPriority: 37,
    awardAttachmentType: AwardAttachmentType.SILVER_STARS,
    awardType: AwardType.Medal,
  },
  {
    name: "15th MEU Recruiting Ribbon",
    awardPriority: 46,
    awardAttachmentType: AwardAttachmentType.STARS_DONATION,
    awardType: AwardType.RibbonDonationLogic,
  },
  {
    name: "15th MEU Selection Ribbon",
    awardPriority: 47,
    awardType: AwardType.Ribbon,
  },
  {
    name: "15th MEU Sniper Ribbon",
    awardPriority: 48,
    medalPriority: 38,
    awardType: AwardType.Medal,
  },
  {
    name: "15th MEU Basic Assault Course Ribbon",
    awardPriority: 49,
    awardType: AwardType.Ribbon,
  },
  {
    name: "15th MEU Cadre Course Ribbon",
    awardPriority: 50,
    awardType: AwardType.Ribbon,
  },

  // Game/community awards: local medal forms and devices retained.
  {
    name: "StackUp Donation Medal",
    awardPriority: 51,
    medalPriority: 39,
    awardAttachmentType: AwardAttachmentType.GC_NOTCHES,
    awardType: AwardType.MedalTiered,
  },
  {
    name: "D-Day Commemorative Medal",
    awardPriority: 52,
    medalPriority: 40,
    awardType: AwardType.Medal,
  },
  {
    name: "D Day Participation Ribbon",
    awardPriority: 53,
    awardType: AwardType.Ribbon,
  },
  // Legacy Vietnam identity retained pending plan U2; not a real VSM claim.
  {
    name: "Vietnam Service Ribbon",
    awardPriority: 54,
    medalPriority: 41,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS_SERVICE,
    awardType: AwardType.Medal,
  },
  {
    name: "Ready or Not Service Ribbon",
    awardPriority: 55,
    medalPriority: 42,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS_SERVICE,
    awardType: AwardType.Medal,
  },
  {
    name: "DCS World Service Ribbon",
    awardPriority: 56,
    medalPriority: 43,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS_SERVICE,
    awardType: AwardType.Medal,
  },
  {
    name: "Squad Service Ribbon",
    awardPriority: 57,
    medalPriority: 44,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS_SERVICE,
    awardType: AwardType.Medal,
  },
  {
    name: "WWII Service Ribbon",
    awardPriority: 58,
    medalPriority: 45,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS_SERVICE,
    awardType: AwardType.Medal,
  },
  {
    name: "Hell Let Loose Service Ribbon",
    awardPriority: 59,
    medalPriority: 46,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS_SERVICE,
    awardType: AwardType.Medal,
  },
  {
    name: "Hell Let Loose Console Service Ribbon",
    awardPriority: 60,
    medalPriority: 47,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS_SERVICE,
    awardType: AwardType.Medal,
  },
  {
    name: "Battlefield 6 Service Ribbon",
    awardPriority: 61,
    medalPriority: 48,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS_SERVICE,
    awardType: AwardType.Medal,
  },
  {
    name: "Foxhole Service Ribbon",
    awardPriority: 62,
    medalPriority: 49,
    awardAttachmentType: AwardAttachmentType.OAK_CLUSTERS_SERVICE,
    awardType: AwardType.Medal,
  },

  //____ UNIT CITATIONS ____
  {
    name: "Army & Air Force Presidential Unit Citation",
    awardPriority: 0,
    awardAttachmentType: AwardAttachmentType.UNIT_CITATION_CLUSTERS,
    awardType: AwardType.UnitCitation,
  },
  {
    name: "Army Valorous Unit Citation",
    awardPriority: 1,
    awardAttachmentType: AwardAttachmentType.UNIT_CITATION_CLUSTERS,
    awardType: AwardType.UnitCitation,
  },
  {
    name: "Joint Meritorious Unit Citation",
    awardPriority: 2,
    awardAttachmentType: AwardAttachmentType.UNIT_CITATION_CLUSTERS,
    awardType: AwardType.UnitCitation,
  },
  {
    name: "Army Meritorious Unit Citation",
    awardPriority: 3,
    awardAttachmentType: AwardAttachmentType.UNIT_CITATION_CLUSTERS,
    awardType: AwardType.UnitCitation,
  },
  {
    name: "Army Superior Unit Citation",
    awardPriority: 4,
    awardAttachmentType: AwardAttachmentType.UNIT_CITATION_CLUSTERS,
    awardType: AwardType.UnitCitation,
  },
  {
    name: "7th Cavalry Black Ops Unit Citation",
    awardPriority: 5,
    awardAttachmentType: AwardAttachmentType.UNIT_CITATION_S_STARS,
    awardType: AwardType.UnitCitation,
  },

  // ____ COMBAT BADGES ____
  {
    name: "Flight Medic Badge",
    awardPriority: 6,
    awardType: AwardType.BadgeCombat,
    badgeImage: BadgeImages.flightMedicBadge,
    badgeFamily: BadgeFamily.FLIGHT_MEDIC,
  }, // (3/1/b/1-7) (4/1/b/1-7)
  {
    name: "Master Army Aviator Badge",
    awardPriority: 11,
    awardType: AwardType.BadgeCombat,
    badgeImage: BadgeImages.masterAviator,
    badgeFamily: BadgeFamily.AVIATOR,
  }, // (A/1-7) (A/ACD)
  {
    name: "Senior Army Aviator Badge",
    awardPriority: 10,
    awardType: AwardType.BadgeCombat,
    badgeImage: BadgeImages.seniorAviator,
    badgeFamily: BadgeFamily.AVIATOR,
  },
  {
    name: "Army Aviator Badge",
    awardPriority: 9,
    awardType: AwardType.BadgeCombat,
    badgeImage: BadgeImages.aviator,
    badgeFamily: BadgeFamily.AVIATOR,
  },
  {
    name: "Aircraft Master Crewman Badge",
    awardPriority: 8,
    awardType: AwardType.BadgeCombat,
    badgeImage: BadgeImages.masterAircrew,
    badgeFamily: BadgeFamily.AIRCREW,
  }, // (A/1-7) (A/ACD)
  {
    name: "Aircraft Senior Crewman Badge",
    awardPriority: 7,
    awardType: AwardType.BadgeCombat,
    badgeImage: BadgeImages.seniorAircrew,
    badgeFamily: BadgeFamily.AIRCREW,
  },
  {
    name: "Aircraft Crewman Badge",
    awardPriority: 6,
    awardType: AwardType.BadgeCombat,
    badgeImage: BadgeImages.aircrew,
    badgeFamily: BadgeFamily.AIRCREW,
  },
  {
    name: "Combat Infantry Badge 4th Award",
    awardPriority: 5,
    awardType: AwardType.BadgeCombat,
    badgeImage: BadgeImages.combatInfantryFourth,
    badgeFamily: BadgeFamily.INFANTRY,
  },
  {
    name: "Combat Infantry Badge 3rd Award",
    awardPriority: 4,
    awardType: AwardType.BadgeCombat,
    badgeImage: BadgeImages.combatInfantryThird,
    badgeFamily: BadgeFamily.INFANTRY,
  },
  {
    name: "Combat Infantry Badge 2nd Award",
    awardPriority: 3,
    awardType: AwardType.BadgeCombat,
    badgeImage: BadgeImages.combatInfantrySecond,
    badgeFamily: BadgeFamily.INFANTRY,
  },
  {
    name: "Combat Infantry Badge",
    awardPriority: 2,
    awardType: AwardType.BadgeCombat,
    badgeImage: BadgeImages.combatInfantry,
    badgeFamily: BadgeFamily.INFANTRY,
  },
  {
    name: "Expert Infantry Badge",
    awardPriority: 1,
    awardType: AwardType.BadgeCombat,
    badgeImage: BadgeImages.expertInfantry,
    badgeFamily: BadgeFamily.INFANTRY,
  }, // et. al.

  //____ WEAPON QUALS ____
  { name: "Rifle Expert", awardTag: "rifle", awardType: AwardType.WeaponQual },
  {
    name: "Rifle Sharpshooter",
    awardTag: "rifle",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Rifle Marksman",
    awardTag: "rifle",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Grenade Expert",
    awardTag: "grenade",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Grenade Sharpshooter",
    awardTag: "grenade",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Grenade Marksman",
    awardTag: "grenade",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Pistol Expert",
    awardTag: "pistol",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Pistol Sharpshooter",
    awardTag: "pistol",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Pistol Marksman",
    awardTag: "pistol",
    awardType: AwardType.WeaponQual,
  },
  { name: "M-203 Expert", awardTag: "m203", awardType: AwardType.WeaponQual },
  {
    name: "M-203 Sharpshooter",
    awardTag: "m203",
    awardType: AwardType.WeaponQual,
  },
  { name: "M-203 Marksman", awardTag: "m203", awardType: AwardType.WeaponQual },
  {
    name: "Machine Gun Expert",
    awardTag: "machineGun",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Machine Gun Sharpshooter",
    awardTag: "machineGun",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Machine Gun Marksman",
    awardTag: "machineGun",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Recoilless Rifle Expert",
    awardTag: "recoilless",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Recoilless Rifle Sharpshooter",
    awardTag: "recoilless",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Recoilless Rifle Marksman",
    awardTag: "recoilless",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Aeroweapons Expert",
    awardTag: "aeroweapons",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Aeroweapons Sharpshooter",
    awardTag: "aeroweapons",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Aeroweapons Marksman",
    awardTag: "aeroweapons",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Hydra-70 Expert",
    awardTag: "hydra70",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Hydra-70 Sharpshooter",
    awardTag: "hydra70",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Hydra-70 Marksman",
    awardTag: "hydra70",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Tank Weapons Expert",
    awardTag: "tankWeapons",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Tank Weapons Sharpshooter",
    awardTag: "tankWeapons",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Tank Weapons Marksman",
    awardTag: "tankWeapons",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Mk-82 Expert",
    awardTag: "mk82",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Mk-82 Sharpshooter",
    awardTag: "mk82",
    awardType: AwardType.WeaponQual,
  },
  {
    name: "Mk-82 Marksman",
    awardTag: "mk82",
    awardType: AwardType.WeaponQual,
  },

  //____ TABS ____
  { name: "Special Forces Tab", awardPriority: 0, awardType: AwardType.Tab },
  { name: "Ranger Tab", awardPriority: 1, awardType: AwardType.Tab },
  { name: "Sapper Tab", awardPriority: 2, awardType: AwardType.Tab },
  {
    name: "Long-Range Reconnaissance Patrol Tab",
    awardPriority: 3,
    awardType: AwardType.Tab,
  },
];
