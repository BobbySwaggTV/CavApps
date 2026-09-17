/**
 * Seam: AWARD_CATALOG as data.
 *
 * Combat badges are only displayed to members whose MOS wears that badge's
 * family, so a combat-badge entry without a badgeFamily is worn by nobody. That
 * failure is silent — the badge simply never appears on a uniform — and no
 * behavioural test catches it, because a test only covers the badges it names.
 * This reads the real catalog rather than a fixture, for the reason
 * generateAwardSprites.test.js records: a fixture cannot catch the award data
 * moving or changing shape.
 *
 * The weapon qual plate check at the end is the same kind of guard. It was
 * added with the Recoilless Rifle sort fix (#229) as an acceptance criterion,
 * not as evidence for that fix: it was green before and after the fix.
 *
 * Run with `npm run test:client`.
 */

import assert from "node:assert";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHarness } from "../../../../test-harness.mjs";
import { AWARD_CATALOG } from "./awardCatalog.js";
import { AwardAttachmentType } from "./awardAttachmentTypes.js";
import { AwardType } from "./awardTypes.js";
import { BadgeFamily } from "./badgeFamilies.js";
import { BadgeImages, combatBadgeImagePath } from "./badgeImages.js";
import { weaponQualPlatePath } from "./weaponQualPlates.js";

// combatBadgeImagePath returns the path the browser requests, relative to the
// public directory the app is served from.
const PUBLIC_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../public",
);

const { test, report } = createHarness();

const combatBadges = AWARD_CATALOG.filter(
  (award) => award.awardType === AwardType.BadgeCombat,
);

await test("the catalog still contains combat badges to check", () => {
  // Guards the filter above: if awardType or the catalog shape moves, every
  // other assertion here would pass vacuously over an empty list.
  assert.ok(combatBadges.length > 0);
});

const knownFamilies = Object.values(BadgeFamily);
const knownImages = Object.values(BadgeImages);

for (const badge of combatBadges) {
  await test(`${badge.name} belongs to a known badge family`, () => {
    assert.ok(
      knownFamilies.includes(badge.badgeFamily),
      `badgeFamily was ${JSON.stringify(badge.badgeFamily)}; a combat badge ` +
        `without a recognised family is displayed to nobody`,
    );
  });

  await test(`${badge.name} names an image that exists`, () => {
    assert.ok(
      knownImages.includes(badge.badgeImage),
      `badgeImage was ${JSON.stringify(badge.badgeImage)}, which is not one ` +
        `of the images BadgeImages names`,
    );
    // Reached through the same helper canvas.jsx renders from, so a badge whose
    // artwork was never committed fails here rather than 404ing on a uniform.
    const path = join(PUBLIC_DIR, combatBadgeImagePath(badge.badgeImage));
    assert.ok(existsSync(path), `no image file at ${path}`);
  });
}

// The canvas loads one plate per weapon qual tag, so a tag with no plate file
// draws nothing for that weapon and logs a 404.
const weaponQualTags = [
  ...new Set(
    AWARD_CATALOG.filter(
      (award) => award.awardType === AwardType.WeaponQual,
    ).map((award) => award.awardTag),
  ),
];

await test("the catalog still contains weapon quals to check", () => {
  assert.ok(weaponQualTags.length > 0);
});

for (const tag of weaponQualTags) {
  await test(`weapon qual tag ${tag} has a plate file`, () => {
    const path = join(PUBLIC_DIR, weaponQualPlatePath(tag));
    assert.ok(existsSync(path), `no plate file at ${path}`);
  });
}

// Mainline priorities are a separate namespace from unit citations and badges.
const mainlineTypes = new Set([
  AwardType.Medal,
  AwardType.MedalTiered,
  AwardType.MedalWithValor,
  AwardType.Ribbon,
  AwardType.RibbonDonationLogic,
  AwardType.RibbonByHighestRank,
]);
const medalTypes = new Set([
  AwardType.Medal,
  AwardType.MedalTiered,
  AwardType.MedalWithValor,
]);
const mainline = AWARD_CATALOG.filter((a) => mainlineTypes.has(a.awardType));
const medals = mainline.filter((a) => medalTypes.has(a.awardType));
const byName = new Map(AWARD_CATALOG.map((a) => [a.name, a]));

await test("all award names are unique", () => {
  assert.strictEqual(byName.size, AWARD_CATALOG.length);
});
await test("62 mainline ribbon priorities match the sheet with row 41 reserved", () => {
  assert.strictEqual(mainline.length, 62);
  assert.strictEqual(new Set(mainline.map((a) => a.awardPriority)).size, 62);
  assert.deepStrictEqual(
    mainline.map((a) => a.awardPriority),
    Array.from({ length: 63 }, (_, i) => i).filter((i) => i !== 41),
  );
});
await test("surviving medal priorities retain their existing sheet rows", () => {
  assert.strictEqual(medals.length, 48);
  assert.strictEqual(new Set(medals.map((a) => a.medalPriority)).size, 48);
  assert.deepStrictEqual(
    medals.map((a) => a.medalPriority),
    Array.from({ length: 50 }, (_, i) => i).filter((i) => i !== 33 && i !== 35),
  );
  for (const award of mainline.filter((a) => !medalTypes.has(a.awardType))) {
    assert.ok(
      !Object.hasOwn(award, "medalPriority"),
      `${award.name} is ribbon-only`,
    );
  }
});
await test("CAR immediately follows Navy/Marine Achievement and has no medal", () => {
  const car = byName.get("Combat Action Ribbon");
  assert.strictEqual(car.awardPriority, 17);
  assert.strictEqual(
    car.awardPriority,
    byName.get("Navy and Marine Corps Achievement Medal").awardPriority + 1,
  );
  assert.strictEqual(car.awardType, AwardType.Ribbon);
  assert.ok(!Object.hasOwn(car, "medalPriority"));
});
await test("Marine duty ribbons follow the approved precedence and are ribbon-only", () => {
  const names = [
    "Sea Service Deployment Ribbon",
    "Navy and Marine Corps Overseas Service Ribbon",
    "Marine Corps Recruiting Ribbon",
    "Marine Corps Drill Instructor Ribbon",
    "Marine Corps Security Guard Ribbon",
    "Marine Corps Combat Instructor Ribbon",
  ];
  assert.deepStrictEqual(
    names.map((name) => byName.get(name).awardPriority),
    [33, 34, 35, 36, 37, 38],
  );
  for (const name of names)
    assert.strictEqual(byName.get(name).awardType, AwardType.Ribbon);
});
await test("obsolete and replaced Army mainline names are not active", () => {
  for (const name of [
    "15th MEU Lifetime Dedication Award",
    'James "Krazee" Foster Lifetime Achievement Medal',
    'Ronnie "Coldblud" Bussey Lifetime Achievement Medal',
    "Army Service Ribbon",
    "NCO Professional Development Ribbon",
    "Womens Army Corp Service Medal",
    "Army Distinguished Service Cross",
    "Army Distinguished Service Medal",
    "Soldiers Medal",
    "Army Commendation Medal",
    "Army Achievement Medal",
    "Army Good Conduct Medal",
    "Bronze Star",
    "Outstanding Volunteer Service Medal",
    "Overseas Service Ribbon",
  ]) {
    assert.ok(!byName.has(name), name);
  }
});
await test("all ten rebranded 15th MEU custom awards are present", () => {
  for (const suffix of [
    "Lifetime Achievement Award",
    "Donation Ribbon",
    "Server Upgrade Award",
    "Honor Graduate Ribbon",
    "Centurion Medal",
    "Recruiting Ribbon",
    "Selection Ribbon",
    "Sniper Ribbon",
    "Basic Assault Course Ribbon",
    "Cadre Course Ribbon",
  ]) {
    assert.ok(byName.has(`15th MEU ${suffix}`), suffix);
  }
});
await test("real awards only reuse Joint oak leaves; unimplemented devices stay plain", () => {
  const joint = new Set([
    "Defense Distinguished Service Medal",
    "Defense Superior Service Medal",
    "Defense Meritorious Service Medal",
    "Joint Service Commendation Medal",
    "Joint Service Achievement Medal",
  ]);
  for (const award of mainline.filter((a) => a.awardPriority < 39)) {
    assert.strictEqual(
      award.awardAttachmentType,
      joint.has(award.name) ? AwardAttachmentType.OAK_CLUSTERS : undefined,
      award.name,
    );
    assert.notStrictEqual(
      award.awardType,
      AwardType.MedalWithValor,
      award.name,
    );
  }
});
await test("approved custom and game device families remain intact", () => {
  for (const [name, type, attachment] of [
    [
      "15th MEU Donation Ribbon",
      AwardType.RibbonDonationLogic,
      AwardAttachmentType.STARS_DONATION,
    ],
    [
      "15th MEU Recruiting Ribbon",
      AwardType.RibbonDonationLogic,
      AwardAttachmentType.STARS_DONATION,
    ],
    [
      "15th MEU Server Upgrade Award",
      AwardType.MedalTiered,
      AwardAttachmentType.STARS,
    ],
    [
      "StackUp Donation Medal",
      AwardType.MedalTiered,
      AwardAttachmentType.GC_NOTCHES,
    ],
    [
      "15th MEU Centurion Medal",
      AwardType.Medal,
      AwardAttachmentType.SILVER_STARS,
    ],
  ]) {
    assert.strictEqual(byName.get(name).awardType, type);
    assert.strictEqual(byName.get(name).awardAttachmentType, attachment);
  }
  for (const award of mainline.filter((a) => a.awardPriority >= 54)) {
    assert.strictEqual(
      award.awardAttachmentType,
      AwardAttachmentType.OAK_CLUSTERS_SERVICE,
    );
    assert.strictEqual(award.awardType, AwardType.Medal);
  }
});

report();
