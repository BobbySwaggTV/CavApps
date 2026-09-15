import assert from "node:assert/strict";
import { createHarness } from "../../../test-harness.mjs";
import GetUserInfo, { checkMos } from "./GetUserInfo.jsx";
import { MosGroup } from "./constants/mos.js";

const { test, report } = createHarness();

for (const [mos, grade, passes] of [
  ["0302", "O3", true],
  ["0302", "E4", false],
  ["0311", "E4", true],
  ["0311", "O3", false],
  ["0306", "W2", true],
  ["0306", "O3", false],
  ["0306", "E4", false],
  ["0205", "W1", true],
  ["0205", "O1", false],
  ["9999", "E4", false],
  ["0365", "O3", false],
  ["0365", "E4", false],
  ["11B", "E4", false],
  ["153A", "W1", false],
  ["0302", undefined, false],
  ["0302", "W5", false],
  ["0311", "W1", false],
  [302, "O3", false],
]) {
  await test(`${mos} with ${grade}: ${passes ? "valid" : "invalid"}`, () => {
    const result = checkMos(mos, grade);
    if (passes) assert.equal(result, null);
    else {
      assert.equal(result[0], "Failed");
      assert.ok(result[1].includes(String(mos)));
    }
  });
}

await test("blank and absent MOS return null", () => {
  for (const mos of ["", "  ", null, undefined]) {
    assert.equal(checkMos(mos, "O3"), null);
  }
});

await test("every supported category is exclusive and validates separately", () => {
  const seen = new Set();
  for (const [category, prefix] of [
    ["OFFICER", "O"],
    ["WARRANT_OFFICER", "W"],
    ["ENLISTED", "E"],
  ]) {
    for (const mos of MosGroup[category]) {
      assert.ok(!seen.has(mos), `duplicate category for ${mos}`);
      seen.add(mos);
      for (const grade of ["O", "W", "E"]) {
        const result = checkMos(mos, grade);
        if (grade === prefix) assert.equal(result, null);
        else assert.equal(result[0], "Failed");
      }
    }
  }
  assert.equal(seen.size, 28);
});

const infoFor = (rankId, mos) =>
  GetUserInfo(
    {
      user: { username: "Marine.T" },
      rank: { rankId, rankShort: "Test" },
      mos,
    },
    0,
    0,
    0,
    0,
  );

await test("all remapped rank IDs reach validation with the correct grade", () => {
  const grades = [
    "O10",
    "O9",
    "O8",
    "O7",
    "O6",
    "O5",
    "O4",
    "O3",
    "O2",
    "O1",
    "W5",
    "W4",
    "W3",
    "W2",
    "W1",
    "E9",
    "E8",
    "E9",
    "E8",
    "E7",
    "E6",
    "E5",
    "E4",
    "E3",
    "E2",
    "E1",
  ];
  for (const [index, grade] of grades.entries()) {
    const mos = { O: "0302", W: "0306", E: "0311" }[grade[0]];
    for (const rankId of [index + 2, String(index + 2)]) {
      const info = infoFor(rankId, mos);
      assert.equal(info.rankGrade, grade);
      assert.equal(info.mosCheck, null);
      const wrongMos = grade.startsWith("W") ? "0302" : "0306";
      assert.equal(infoFor(rankId, wrongMos).mosCheck[0], "Failed");
    }
  }
});

await test("0365 produces a user-facing validation failure without crashing", () => {
  const info = infoFor("9", "0365");
  assert.equal(info.mosCheck[0], "Failed");
  assert.match(info.mosCheck[1], /Unknown or unsupported USMC MOS 0365/);
  assert.equal(info.shoulderCord, false);
  assert.equal(info.neckPins, false);
});

await test("Marine infantry and supply roles retain existing asset selections", () => {
  for (const mos of ["0311", "0331", "0341", "0352", "0369"]) {
    const info = infoFor("24", mos);
    assert.equal(info.mosCheck, null);
    assert.equal(info.shoulderCord, "Infantry");
    assert.equal(info.neckPins, "InfantryNCO");
  }
  for (const mos of ["0402", "3002"]) {
    const info = infoFor("9", mos);
    assert.equal(info.mosCheck, null);
    assert.equal(info.shoulderCord, "Logistics");
    assert.equal(info.neckPins, "LogisticsOfficer");
  }
});

report();
