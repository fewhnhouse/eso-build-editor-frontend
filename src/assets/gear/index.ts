import belt from "./gearslot_belt.png";
import chest from "./gearslot_chest.png";
import feet from "./gearslot_feet.png";
import hands from "./gearslot_hands.png";
import head from "./gearslot_head.png";
import legs from "./gearslot_legs.png";
import mainHand from "./gearslot_mainhand.png";
import neck from "./gearslot_neck.png";
import offHand from "./gearslot_offhand.png";
import quickslot from "./gearslot_quickslot.png";
import ring from "./gearslot_ring.png";
import shoulders from "./gearslot_shoulders.png";
import axe1h from "./gear__1haxe_a.png";
import hammer1h from "./gear__1hhammer_a.png";
import sword1h from "./gear__1hsword_a.png";
import axe2h from "./gear__2haxe_a.png";
import hammer2h from "./gear__2hhammer_a.png";
import sword2h from "./gear__2hsword_a.png";
import bow from "./gear__bow_a.png";
import shield from "./gear__shield_a.png";
import staff from "./gear__staff_a.png";
import dagger from "./gear__dagger_a.png";
import heavyChest from "./gear__heavy_chest_a.png";
import heavyFeet from "./gear__heavy_feet_a.png";
import heavyHands from "./gear__heavy_hands_a.png";
import heavyHead from "./gear__heavy_head_a.png";
import heavyLegs from "./gear__heavy_legs_a.png";
import heavyShoulders from "./gear__heavy_shoulders_a.png";
import heavyWaist from "./gear__heavy_waist_a.png";
import mediumChest from "./gear__medium_chest_a.png";
import mediumFeet from "./gear__medium_feet_a.png";
import mediumHands from "./gear__medium_hands_a.png";
import mediumHead from "./gear__medium_head_a.png";
import mediumLegs from "./gear__medium_legs_a.png";
import mediumShoulders from "./gear__medium_shoulders_a.png";
import mediumWaist from "./gear__medium_waist_a.png";
import lightChest from "./gear__light_robe_a.png";
import lightFeet from "./gear__light_feet_a.png";
import lightHands from "./gear__light_hands_a.png";
import lightHead from "./gear__light_head_a.png";
import lightLegs from "./gear__light_legs_a.png";
import lightShoulders from "./gear__light_shoulders_a.png";
import lightWaist from "./gear__light_waist_a.png";

export {
  belt,
  legs,
  chest,
  feet,
  hands,
  head,
  mainHand,
  neck,
  offHand,
  quickslot,
  ring,
  shoulders,
  axe1h,
  axe2h,
  sword1h,
  sword2h,
  hammer1h,
  hammer2h,
  dagger,
  bow,
  staff,
  shield,
  heavyChest,
  heavyLegs,
  heavyShoulders,
  heavyFeet,
  heavyHands,
  heavyWaist,
  heavyHead,
  mediumChest,
  mediumLegs,
  mediumShoulders,
  mediumFeet,
  mediumHands,
  mediumWaist,
  mediumHead,
  lightChest,
  lightLegs,
  lightShoulders,
  lightFeet,
  lightHands,
  lightHead,
  lightWaist
};

export type Gear =
  | "axe1h"
  | "axe2h"
  | "hammer1h"
  | "hammer2h"
  | "sword1h"
  | "sword2h"
  | "dagger"
  | "bow"
  | "shield"
  | "staff"
  | "heavyChest"
  | "heavyLegs"
  | "heavyWaist"
  | "heavyHands"
  | "heavyHead"
  | "heavyShoulders"
  | "heavyFeet"
  | "mediumChest"
  | "mediumShoulders"
  | "mediumHead"
  | "mediumWaist"
  | "mediumLegs"
  | "mediumFeet"
  | "mediumHands"
  | "lightHead"
  | "lightShoulders"
  | "lightChest"
  | "lightWaist"
  | "lightFeet"
  | "lightHands"
  | "lightLegs";

export const selectIcon = (gear: Gear) => {
  switch (gear) {
    case "axe1h":
      return axe1h;
    case "axe2h":
      return axe2h;
    case "hammer1h":
      return hammer1h;
    case "hammer2h":
      return hammer2h;
    case "sword1h":
      return sword1h;
    case "sword2h":
      return sword2h;
    case "dagger":
      return dagger;
    case "bow":
      return bow;
    case "staff":
      return staff;
    case "heavyChest":
      return heavyChest;
    case "heavyLegs":
      return heavyLegs;
    case "heavyWaist":
      return heavyWaist;
    case "heavyFeet":
      return heavyFeet;
    case "heavyHands":
      return heavyHands;
    case "heavyHead":
      return heavyHead;
    case "heavyShoulders":
      return heavyShoulders;
    case "mediumChest":
      return mediumChest;
    case "mediumLegs":
      return mediumLegs;
    case "mediumWaist":
      return mediumWaist;
    case "mediumFeet":
      return mediumFeet;
    case "mediumHands":
      return mediumHands;
    case "mediumHead":
      return mediumHead;
    case "mediumShoulders":
      return mediumShoulders;
    case "lightHead":
      return lightHead;
    case "lightShoulders":
      return lightShoulders;
    case "lightChest":
      return lightChest;
    case "lightFeet":
      return lightFeet;
    case "lightLegs":
      return lightLegs;
    case "lightWaist":
      return lightWaist;
    case "lightHands":
      return lightHands;
    case "shield":
      return shield;
    default:
      return;
  }
};
