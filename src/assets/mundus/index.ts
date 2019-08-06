import apprentice from "./ON-icon-mundusstone-Apprentice.png";
import atronarch from "./ON-icon-mundusstone-Atronach.png";
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
  id: number;
}

export const mundusStones: IMundus[] = [
  {
    name: "The Apprentice",
    location: {
      aldmeri: "Reaper's March",
      daggerfall: "Bangkorai",
      ebonheart: "The Rift"
    },
    effect: "Increases Spell Damage",
    value: 238,
    icon: apprentice,
    id: 1
  },
  {
    name: "The Atronach",
    location: {
      aldmeri: "Greenshade",
      daggerfall: "Rivenspire",
      ebonheart: "Shadowfen"
    },
    effect: "Increases Magicka Recovery	",
    value: 238,
    icon: atronarch,
    id: 2
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
    icon: lady,
    id: 3
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
    icon: lord,
    id: 4
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
    icon: lover,
    id: 5
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
    icon: mage,
    id: 6
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
    icon: ritual,
    id: 7
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
    icon: serpent,
    id: 8
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
    icon: shadow,
    id: 9
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
    icon: steed,
    id: 10
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
    icon: thief,
    id: 11
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
    icon: tower,
    id: 12
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
    icon: warrior,
    id: 13
  }
];
