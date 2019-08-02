import apprentice from "./ON-icon-mundusstone-Apprentice.png";
import atronarch from "./ON-icon-mundusstone-Atronarch.png";
import lady from "./ON-icon-mundusstone-Lady.png";
import lord from "./ON-icon-mundusstone-Lord.png";
import lover from "./ON-icon-mundusstone-Lover.png";
import mage from "./ON-icon-mundusstone-Mage.png";
import ritual from "./ON-icon-mundusstone-Ritual.png";
import serpent from "./ON-icon-mundusstone-Serpent.png";
import shadow from "./ON-icon-mundusstone-Shadow.png";
import steed from "./ON-icon-mundusstone-Steed.png";
import thief from "./ON-icon-mundusstone-Thief.png";
import tower from "./ON-icon-mundusstone-Tower.png";
import warrior from "./ON-icon-mundusstone-Warrior.png";

export interface IMundus {
  name: string;
  location: {
    aldmeri: string;
    daggerfall: string;
    ebonheart: string;
  };
  effect: string;
  value: string | number;
  icon: string;
}

export const mundus: IMundus[] = [
  {
    name: "The Apprentice",
    location: {
      aldmeri: "Reaper's March",
      daggerfall: "Bangkorai",
      ebonheart: "The Rift"
    },
    effect: "Increases Spell Damage",
    value: 238,
    icon: apprentice
  },
  {
    name: "The Atronarch",
    location: {
      aldmeri: "Greenshade",
      daggerfall: "Rivenspire",
      ebonheart: "Shadowfen"
    },
    effect: "Increases Magicka Recovery	",
    value: 238,
    icon: atronarch
  },
  {
    name: "The Lady",
    location: {
      aldmeri: "Auridon",
      daggerfall: "Glenumbra",
      ebonheart: "Stonefalls"
    },
    effect: "Increases Physical and Spell Resistance",
    value: 2752,
    icon: lady
  },
  {
    name: "The Lord",
    location: {
      aldmeri: "Grahtwood",
      daggerfall: "Stormhaven",
      ebonheart: "Deshaan"
    },
    effect: "Increases Maximum Health",
    value: 2231,
    icon: lord
  },
  {
    name: "The Lover",
    location: {
      aldmeri: "Auridon",
      daggerfall: "Glenumbra",
      ebonheart: "Stonefalls"
    },
    effect: "Increases Physical and Spell Penetration",
    value: 2752,
    icon: lover
  },
  {
    name: "The Mage",
    location: {
      aldmeri: "Grahtwood",
      daggerfall: "Stormhaven",
      ebonheart: "Deshaan"
    },
    effect: "Increases Maximum Magicka",
    value: 2028,
    icon: mage
  },
  {
    name: "The Ritual",
    location: {
      aldmeri: "Malabal Tor",
      daggerfall: "Alik'r Desert",
      ebonheart: "Eastmarch"
    },
    effect: "Increases Healing Done",
    value: "10%",
    icon: ritual
  },
  {
    name: "The Serpent",
    location: {
      aldmeri: "Greenshade",
      daggerfall: "Rivenspire",
      ebonheart: "Shadowfen"
    },
    effect: "Increases Stamina Recovery",
    value: 238,
    icon: serpent
  },
  {
    name: "The Shadow",
    location: {
      aldmeri: "Greenshade",
      daggerfall: "Rivenspire",
      ebonheart: "Shadowfen"
    },
    effect: "Increases Critical Damage done",
    value: "13%",
    icon: shadow
  },
  {
    name: "The Steed",
    location: {
      aldmeri: "Reaper's March",
      daggerfall: "Bangkorai",
      ebonheart: "The Rift"
    },
    effect: "Increases Health Recovery and Movement Speed",
    value: "238 / 10%",
    icon: steed
  },
  {
    name: "The Theif",
    location: {
      aldmeri: "Malabal Tor",
      daggerfall: "Alik'r Desert",
      ebonheart: "Eastmarch"
    },
    effect: "Increases Weapon and Spell Critical Strike ratings",
    value: 1633,
    icon: thief
  },
  {
    name: "The Tower",
    location: {
      aldmeri: "Grathwood",
      daggerfall: "Stormhaven",
      ebonheart: "Deshaan"
    },
    effect: "Increases Maximum Stamina",
    value: 2028,
    icon: tower
  },
  {
    name: "The Warrior",
    location: {
      aldmeri: "Malabal Tor",
      daggerfall: "Alik'r Desert",
      ebonheart: "Eastmarch"
    },
    effect: "Increases Weapon Damage",
    value: 238,
    icon: warrior
  }
];
