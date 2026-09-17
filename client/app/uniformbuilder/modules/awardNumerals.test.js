/**
 * Catalog conversion regression tests through GetCanvasObject.
 * DON numerals/devices are pending; do not retain the old Army numeral rules
 * as expectations. Existing custom tiers and Joint repeats remain supported.
 * Run with npm run test:client:numerals.
 */
process.env.NEXT_PUBLIC_INDIVIDUAL_API_URL ??=
  "http://uniform-builder.test/individual";
process.env.NEXT_PUBLIC_CLIENT_TOKEN ??= "test-client-token";

import assert from "node:assert/strict";
import { createHarness } from "../../../test-harness.mjs";
import { AwardAttachmentType } from "./constants/awardAttachmentTypes.js";
const { default: GetCanvasObject } = await import("./getCanvasObject.jsx");
const { test, report } = createHarness();

const build = async (awardName, details) => {
  const payload = {
    user: { username: "Marine.T" },
    rank: { rankShort: "Cpl", rankId: "24" },
    mos: "0311",
    awards: details.map((awardDetails) => ({ awardName, awardDetails })),
  };
  globalThis.fetch = async () => ({ status: 200, json: async () => payload });
  return GetCanvasObject(payload.user.username);
};
const awardFor = async (name, details) => {
  const data = await build(name, details);
  assert.equal(
    data[1].length,
    1,
    "duplicates should aggregate into one ribbon",
  );
  return data[1][0];
};

for (const name of [
  "Air Medal",
  "Navy Cross",
  "Navy and Marine Corps Commendation Medal",
  "Bronze Star Medal",
  "Meritorious Service Medal",
  "Marine Corps Good Conduct Medal",
  "Afghanistan Campaign Medal",
  "Combat Action Ribbon",
  "Global War on Terrorism Service Medal",
  "Korea Defense Service Medal",
  "United Nations Service Medal",
]) {
  await test(`${name} stays plain for single and repeated awards until devices are supported`, async () => {
    for (const count of [1, 2, 7]) {
      const award = await awardFor(name, Array(count).fill(""));
      assert.equal(award.ribbonAttachmentType, null);
      assert.equal(award.ribbonDisplayedAttachmentCount, 0);
    }
  });
}
await test("DON valor-suffixed records do not activate Army oak-leaf overlays", async () => {
  const award = await awardFor("Bronze Star Medal with Valor Device", ["", ""]);
  assert.equal(award.ribbonAttachmentType, null);
  assert.equal(award.ribbonDisplayedAttachmentCount, 0);
});
for (const name of [
  "Army Service Ribbon",
  "NCO Professional Development Ribbon",
  "Womens Army Corp Service Medal",
]) {
  await test(`${name} no longer creates active ribbons or medals`, async () => {
    const data = await build(name, ["Staff Sergeant Promotion", ""]);
    assert.deepEqual(data[1], []);
    assert.deepEqual(data[3], []);
  });
}
await test("Joint repeats still use oak leaves", async () => {
  const award = await awardFor("Defense Meritorious Service Medal", ["", ""]);
  assert.equal(award.ribbonAttachmentType, AwardAttachmentType.OAK_CLUSTERS);
  assert.equal(award.ribbonDisplayedAttachmentCount, 1);
});
for (const name of ["15th MEU Donation Ribbon", "15th MEU Recruiting Ribbon"]) {
  await test(`${name} preserves donation-style thresholds`, async () => {
    for (const [count, expected] of [
      [1, 0],
      [2, 1],
      [7, 5],
      [11, 6],
      [101, 12],
    ]) {
      const award = await awardFor(name, Array(count).fill(""));
      assert.equal(
        award.ribbonAttachmentType,
        AwardAttachmentType.STARS_DONATION,
      );
      assert.equal(award.ribbonDisplayedAttachmentCount, expected);
    }
  });
}
await test("renamed Server Upgrade award keeps the highest custom tier", async () => {
  const award = await awardFor("15th MEU Server Upgrade Award", [
    "Gold Star",
    "Silver Star",
    "",
  ]);
  assert.equal(award.ribbonAttachmentType, AwardAttachmentType.STARS);
  assert.equal(award.ribbonDisplayedAttachmentCount, 10);
});
await test("StackUp retains custom knot tiers", async () => {
  const award = await awardFor("StackUp Donation Medal", [
    "Gold Knot",
    "Bronze Knot",
    "Silver Knot",
  ]);
  assert.equal(award.ribbonAttachmentType, AwardAttachmentType.GC_NOTCHES);
  assert.equal(award.ribbonDisplayedAttachmentCount, 7);
});
await test("Centurion and game awards retain their custom repeat devices", async () => {
  for (const [name, type] of [
    ["15th MEU Centurion Medal", AwardAttachmentType.SILVER_STARS],
    ["Ready or Not Service Ribbon", AwardAttachmentType.OAK_CLUSTERS_SERVICE],
  ]) {
    const award = await awardFor(name, ["", ""]);
    assert.equal(award.ribbonAttachmentType, type);
    assert.equal(award.ribbonDisplayedAttachmentCount, 1);
  }
});
report();
