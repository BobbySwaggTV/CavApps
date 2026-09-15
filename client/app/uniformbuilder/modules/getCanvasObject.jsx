import { AwardRegistry } from "./AwardRegistry";
import GetIndividual from "../../reusableModules/getIndividual";
import {
  Award,
  Ribbon,
  Medal,
  MedalWithValor,
  MedalTiered,
  RibbonDonationLogic,
  RibbonByHighestRank,
  UnitCitation,
  BadgeCombat,
  WeaponQual,
  Tab,
} from "./AwardClasses";
import GetUserInfo from "./GetUserInfo";
import {
  AwardType,
  AwardAttachmentType,
  hasValorDevice,
  stripValorDevice,
  displayableBadgeFamilies,
} from "./constants";

// The catalog is static, so one registry serves every lookup instead of
// rebuilding the Map on each call.
const awardRegistry = new AwardRegistry();

// Concurrent requests for the same username (StrictMode remounts, rapid
// resubmits) share one build instead of firing duplicate API calls. Only
// in-flight work is deduped — settled results are never cached, so a later
// lookup still fetches fresh data.
const pendingBuilds = new Map();

export default function GetCanvasObject(userName) {
  let pending = pendingBuilds.get(userName);
  if (!pending) {
    pending = buildCanvasObject(userName);
    pendingBuilds.set(userName, pending);
    const forget = () => pendingBuilds.delete(userName);
    pending.then(forget, forget);
  }
  return pending;
}

async function buildCanvasObject(userName) {
  const data = await GetIndividual(userName);

  const displayableFamilies = displayableBadgeFamilies(data.mos);

  let awardCounts = [];
  let totalRibbonCount = 0;
  let totalUnitCitationCount = 0;
  let yearsInService = 0;
  let tabCount = 0;

  const awardMap = new Map();

  for (let i in data.awards) {
    //Check to see if the API medal is one with valor. If so, flag it w/ hasValorDevice.
    //Set the key of the Award to be the Award Name.

    const awardName = data.awards[i].awardName;
    const valorDevice = hasValorDevice(awardName);
    const key = valorDevice ? stripValorDevice(awardName) : awardName;

    let useCombatBadgeLogic = false;
    let combatBadgeKey;

    const registryDetails = awardRegistry.getAwardDetails(key);
    const awardType = registryDetails.awardType;

    //A member can hold a combat badge their MOS does not wear — an aircrew
    //badge earned by a medic, say. It stays on their record; it just never
    //reaches the uniform.
    if (
      awardType == AwardType.BadgeCombat &&
      !displayableFamilies.includes(registryDetails.badgeFamily)
    ) {
      continue;
    }

    if (
      awardType == AwardType.BadgeCombat ||
      awardType == AwardType.WeaponQual
    ) {
      useCombatBadgeLogic = true;
      combatBadgeKey = awardType;
    }

    //If there is already an award with the key, add the valor device to the existing obj if true and increment AttachmentCount
    //Otherwise, create the award, and add it (and the key) to the Map.

    if (key == "Army Good Conduct Medal") {
      yearsInService++;
    }

    if (
      awardMap.has(key) ||
      (useCombatBadgeLogic && awardMap.has(combatBadgeKey))
    ) {
      let existingAward;

      if (useCombatBadgeLogic) {
        existingAward = awardMap.get(combatBadgeKey);
      } else {
        existingAward = awardMap.get(key);
      }

      if ((!existingAward) instanceof Ribbon) {
        continue;
      }

      if (existingAward instanceof MedalWithValor) {
        if (valorDevice) {
          existingAward.hasValorDevice = true;
          existingAward.ribbonAttachmentType =
            AwardAttachmentType.OAK_CLUSTERS_VALOR;
        }
      }

      if (existingAward instanceof MedalTiered) {
        existingAward.updateTieredMedal(data.awards[i].awardDetails);
      }

      if (existingAward instanceof BadgeCombat) {
        existingAward.updateBadgeCombat(data.awards[i], awardRegistry);
      }

      if (existingAward instanceof WeaponQual) {
        existingAward.addAward(data.awards[i], awardRegistry);
      }

      if (
        existingAward instanceof Ribbon ||
        existingAward instanceof UnitCitation
      ) {
        existingAward.incrementAwardCount(data.awards[i]);
      }
    } else {
      //If there is an entry in the registry for the award, Make the relevent object,
      //If not add generic award object

      //This can probably be written better, but thats a later problem
      if (awardRegistry.isInRegistry(key)) {
        switch (awardType) {
          case AwardType.Ribbon:
            const newRibbon = new Ribbon(data.awards[i], awardRegistry);
            awardMap.set(key, newRibbon);
            totalRibbonCount++;
            break;
          case AwardType.RibbonDonationLogic:
            const newRibbonDonation = new RibbonDonationLogic(
              data.awards[i],
              awardRegistry,
            );
            awardMap.set(key, newRibbonDonation);
            totalRibbonCount++;
            break;
          case AwardType.RibbonByHighestRank:
            const newRibbonByHighestRank = new RibbonByHighestRank(
              data.awards[i],
              awardRegistry,
            );
            awardMap.set(key, newRibbonByHighestRank);
            totalRibbonCount++;
            break;
          case AwardType.Medal:
            const newMedal = new Medal(data.awards[i], awardRegistry);
            awardMap.set(key, newMedal);
            totalRibbonCount++;
            break;
          case AwardType.MedalTiered:
            const newTiered = new MedalTiered(data.awards[i], awardRegistry);
            awardMap.set(key, newTiered);
            totalRibbonCount++;
            break;
          case AwardType.MedalWithValor:
            const newMedalWithValor = new MedalWithValor(
              data.awards[i],
              awardRegistry,
            );
            awardMap.set(key, newMedalWithValor);
            totalRibbonCount++;
            break;
          case AwardType.UnitCitation:
            const newUnitCitation = new UnitCitation(
              data.awards[i],
              awardRegistry,
            );
            awardMap.set(key, newUnitCitation);
            totalUnitCitationCount++;
            break;
          case AwardType.BadgeCombat:
            const newBadgeCombat = new BadgeCombat(
              data.awards[i],
              awardRegistry,
            );
            awardMap.set(AwardType.BadgeCombat, newBadgeCombat);
            break;
          case AwardType.WeaponQual:
            const newWeaponQual = new WeaponQual(data.awards[i], awardRegistry);
            awardMap.set(AwardType.WeaponQual, newWeaponQual);
            break;
          case AwardType.Tab:
            const newTab = new Tab(data.awards[i], awardRegistry);
            tabCount++;
            awardMap.set(key, newTab);
            break;
        }
      }
    }
  }
  //Create an output array from the Map and return it.

  const userInfo = GetUserInfo(
    data,
    totalRibbonCount,
    totalUnitCitationCount,
    yearsInService,
    tabCount,
  );

  const arr = [];
  arr.push(userInfo);

  let ribbons = [];
  let medals = [];
  let unitCitations = [];
  let combatBadge = null;
  let weaponQual = null;
  let tabs = [];

  for (const award of awardMap.values()) {
    if (award instanceof Ribbon) {
      ribbons.push(award);
    }
    if (award instanceof Medal) {
      medals.push(award);
    }
    if (award instanceof UnitCitation) {
      unitCitations.push(award);
    }
    if (award instanceof BadgeCombat) {
      combatBadge = award;
    }
    if (award instanceof WeaponQual) {
      weaponQual = award;
    }
    if (award instanceof Tab) {
      tabs.push(award);
    }
  }

  weaponQual = weaponQual ?? 0;

  arr.push(ribbons.sort((a, b) => a.awardPriority - b.awardPriority));
  arr.push(unitCitations.sort((a, b) => a.awardPriority - b.awardPriority));
  arr.push(medals.sort((a, b) => a.awardPriority - b.awardPriority));
  arr.push(combatBadge);
  arr.push(weaponQual);
  arr.push(tabs.sort((a, b) => a.awardPriority - b.awardPriority));

  return arr;
}
