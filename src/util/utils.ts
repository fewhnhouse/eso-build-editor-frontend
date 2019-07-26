import {
  orc,
  khajiit,
  dunmer,
  breton,
  bosmer,
  altmer,
  argonian,
  imperial,
  nord,
  redguard
} from "../assets/races";

import {
  dragonknight,
  nightblade,
  necromancer,
  sorcerer,
  templar,
  warden
} from "../assets/classes";

const chooseClass = (esoClass: string) => {
  switch (esoClass) {
    case "Necromancer":
      return necromancer;
    case "Warden":
      return warden;
    case "Templar":
      return templar;
    case "Nightblade":
      return nightblade;
    case "Sorcerer":
      return sorcerer;
    case "Dragonknight":
      return dragonknight;
  }
};

const chooseRace = (esoRace: string) => {
  switch (esoRace) {
    case "Altmer":
      return altmer;
    case "Breton":
      return breton;
    case "Imperial":
      return imperial;
    case "Redguard":
      return redguard;
    case "Orc":
      return orc;
    case "Khajiit":
      return khajiit;
    case "Dunmer":
      return dunmer;
    case "Bosmer":
      return bosmer;
    case "Argonian":
      return argonian;
    case "Nord":
      return nord;
  }
};

export { chooseRace, chooseClass };
