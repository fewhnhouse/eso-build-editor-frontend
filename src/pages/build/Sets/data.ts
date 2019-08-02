import {
  amethyst,
  turquoise,
  jade,
  potentNirncrux,
  chysolite,
  ruby,
  fireOpal,
  carnelian,
  citrine,
  slaughterStone,
  dibellium,
  gildinWax,
  dawnPrism,
  titanium,
  aurbicAmber,
  zinc,
  antimony,
  cobalt,
  sapphire,
  garnet,
  diamond,
  bloodstone,
  fortifiedNirncrux,
  sardonyx,
  emerald,
  quartz,
  almandine
} from "../../../assets/traits";
import {
  flame,
  frost,
  shock,
  poison,
  foulness,
  decreaseHealth,
  hardening,
  absorbHealth,
  absorbMagicka,
  absorbStamina,
  weakening,
  crushing,
  prismatic,
  rage,
  health,
  magicka,
  stamina
} from "../../../assets/glyphs";
import { Gear } from "../../../assets/gear";

export interface IGlyph {
  type: string;
  description: string;
  icon: string;
}

export interface ITrait {
  type: string;
  description: string;
  icon: string;
}
export const weaponGlyphs = [
  { type: "Glyph of Flame", description: "Deals fire damage.", icon: flame },
  { type: "Glyph of Frost", description: "Deals cold damage.", icon: frost },
  { type: "Glyph of Shock", description: "Deals shock damage.", icon: shock },
  {
    type: "Glyph of Poison",
    description: "Deals poison damage.",
    icon: poison
  },
  {
    type: "Glyph of Foulness",
    description: "Deals disease damage.",
    icon: foulness
  },
  {
    type: "Glyph of Decrease Health",
    description: "Deals unresistable damage.",
    icon: decreaseHealth
  },
  {
    type: "Glyph of Hardening",
    description: "Grants a point damage shield for 5 seconds.",
    icon: hardening
  },
  {
    type: "Glyph of Absorb Health",
    description: "Deals magic damage and restores health.",
    icon: absorbHealth
  },
  {
    type: "Glyph of Absorb Magicka",
    description: "Deals magic damage and restores magicka.",
    icon: absorbMagicka
  },
  {
    type: "Glyph of Absorb Stamina",
    description: "Deals physical damage and restores stamina.",
    icon: absorbStamina
  },
  {
    type: "Glyph of Weapon Damage",
    description: "Increases your weapon/spell damage for 5 seconds.",
    icon: rage
  },
  {
    type: "Glyph of Weakening",
    description: "Reduces targets weapon damage for 5 seconds.",
    icon: weakening
  },
  {
    type: "Glyph of Crushing",
    description: "Reduces targets armor for 5 seconds.",
    icon: crushing
  },
  {
    type: "Glyph of Prismatic Onslaught",
    description: "Deals magic damage to undead and daedra.",
    icon: prismatic
  }
];

export const weaponTypes: {
  oneHanded: { type: Gear; label: string }[];
  twoHanded: { type: Gear; label: string }[];
} = {
  oneHanded: [
    {
      type: "axe1h",
      label: "Axe"
    },

    {
      type: "sword1h",
      label: "Sword"
    },

    {
      type: "hammer1h",
      label: "Hammer"
    },
    {
      type: "dagger",
      label: "Dagger"
    },
    {
      type: "shield",
      label: "Shield"
    }
  ],
  twoHanded: [
    {
      type: "hammer2h",
      label: "Hammer"
    },
    {
      type: "sword2h",
      label: "Sword"
    },
    {
      type: "bow",
      label: "Bow"
    },
    {
      type: "staff",
      label: "Staff"
    },

    {
      type: "axe2h",
      label: "Axe"
    }
  ]
};

export const weaponTraits = [
  {
    type: "Charged",
    description: "Increases chance to apply Status Effects by 110% / 220%",
    icon: amethyst
  },
  {
    type: "Defending",
    description:
      "Increases total Physical Resistance and Spell Resistance by 1376 / 2752.",
    icon: turquoise
  },
  {
    type: "Infused",
    description:
      "Reduces Enchantment Cooldown by 50%. Increases Weapon Enchantment effect by 30%.",
    icon: jade
  },
  {
    type: "Nirnhoned",
    description: "Increases Weapon Damage by 15%.",
    icon: potentNirncrux
  },
  {
    type: "Powered",
    description: "Increases healing done by 4.5% / 9%.",
    icon: chysolite
  },
  {
    type: "Precise",
    description: "Increases Weapon and Spell Critical Values by 3.5% / 7%.",
    icon: ruby
  },
  {
    type: "Sharpened",
    description: "Increase Armor and Spell Penetration by 1376 / 2752.",
    icon: fireOpal
  },
  {
    type: "Training",
    description: "Increases experience gained from kills by 4.5% / 9%.",
    icon: carnelian
  },
  {
    type: "Decisive",
    description:
      "20% / 40% Chance to gain 1 additional Ultimate anytime that Ultimate is gained.",
    icon: citrine
  }
];

export const jewelryGlyphs = [
  {
    type: "Glyph of Increase Physical Harm",
    description: "Adds 174 Weapon Damage.",
    icon: flame
  },
  {
    type: "Glyph of Increase Magical Harm",
    description: "Adds 174 Spell Damage",
    icon: frost
  },
  {
    type: "Glyph of Health Recovery",
    description: "Adds 169 Health Recovery",
    icon: shock
  },
  {
    type: "Glyph of Magicka Recovery",
    description: "Adds 169 Magicka Recovery.",
    icon: poison
  },
  {
    type: "Glyph of Stamina Recovery",
    description: "Adds 169 Stamina Recovery.",
    icon: foulness
  },
  {
    type: "Glyph of Reduce Spell Cost",
    description: "Reduce Magicka cost of spells by 203.",
    icon: decreaseHealth
  },
  {
    type: "Glyph of Reduce Feat Cost",
    description: "Reduce Stamina cost of abilities by 203.",
    icon: hardening
  },
  {
    type: "Glyph of Shielding",
    description:
      "Reduce cost of bash by 304 and reduce cost of blocking by 203.",
    icon: absorbHealth
  },
  {
    type: "Glyph of Bashing",
    description: "Increase Bash Damage by 288.",
    icon: absorbMagicka
  },
  {
    type: "Glyph of Decrease Physical Harm",
    description: "Adds 927 Physical Resistance.",
    icon: absorbStamina
  },
  {
    type: "Glyph of Decrease Spell Harm",
    description: "Adds 927 Spell Resistance.",
    icon: rage
  },
  {
    type: "Glyph of Flame Resist",
    description: "Adds 3520 Flame Resistance.",
    icon: weakening
  },
  {
    type: "Glyph of Frost Resist",
    description: "Adds 3520 Cold Resistance.",
    icon: crushing
  },
  {
    type: "Glyph of Shock Resist",
    description: "Adds 3520 Shock Resistance.",
    icon: prismatic
  },
  {
    type: "Glyph of Poison Resist",
    description: "Adds 3520 Poison Resistance.",
    icon: prismatic
  },
  {
    type: "Glyph of Disease Resist",
    description: "Adds 3520 Disease Resistance.",
    icon: prismatic
  },
  {
    type: "Glyph of Potion Speed",
    description:
      "Reduce the cooldown of potions below this item's level by 5 seconds.",
    icon: prismatic
  },
  {
    type: "Glyph of Potion Boost",
    description: "Increase the duration of potion effects by 3.6 seconds.",
    icon: prismatic
  }
];

export const jewelryTraits = [
  {
    type: "Arcane",
    description: "Increases Max Magicka by 870.",
    icon: cobalt
  },
  {
    type: "Healthy",
    description: "Increases Max Health 957.",
    icon: antimony
  },
  {
    type: "Robust",
    description: "Increases Max Stamina by 870.",
    icon: zinc
  },
  {
    type: "Infused",
    description: "Increases Enchantment Effectiveness by 60%.",
    icon: aurbicAmber
  },
  {
    type: "Protective",
    description: "Increases Physical and Spell Resistance by 1844.",
    icon: titanium
  },
  {
    type: "Triune",
    description: "Increases Health by 478, Stamina by 435 & Magicka by 435.",
    icon: dawnPrism
  },
  {
    type: "Swift",
    description: "Increases Movement Speed by 6%.",
    icon: gildinWax
  },
  {
    type: "Harmony",
    description: "Increases Synergy Effectiveness by 35%.",
    icon: dibellium
  },
  {
    type: "Bloodthirsty",
    description: "Increases Damage against low-health foes by 10%.",
    icon: slaughterStone
  }
];

export const armorGlyphs = [
  {
    type: "Glyph of Health",
    description: "Adds 954 Max Health.",
    icon: health
  },
  {
    type: "Glyph of Magicka",
    description: "Adds 868 Max Magicka.",
    icon: magicka
  },
  {
    type: "Glyph of Stamina",
    description: "Adds 868 Max Stamina.",
    icon: stamina
  },
  {
    type: "Glyph of Prismatic Defense",
    description: "Adds 477 Health, 434 Stamina and 434 Magicka.",
    icon: prismatic
  }
];

export const armorTraits = [
  {
    type: "Divines",
    description: "Increases Mundus Stone effects by 7.5%",
    icon: sapphire
  },
  {
    type: "Invigorating",
    description: "Increases Magicka, Stamina and Health Recovery 11.",
    icon: garnet
  },
  {
    type: "Impenetrable",
    description:
      "Reduces item's durability damage 50%. Increases Critical Resistance by 258.",
    icon: diamond
  },
  {
    type: "Infused",
    description: "Increase Armor Enchantment effect by 20%",
    icon: bloodstone
  },
  {
    type: "Nirnhoned",
    description: "Increases Spell Resistance and Physical Resistance by 301",
    icon: fortifiedNirncrux
  },
  {
    type: "Reinforced",
    description: "Increases Armor by 16%",
    icon: sardonyx
  },
  { type: "Sturdy", description: "Reduced Block cost by 4%.", icon: quartz },
  {
    type: "Training",
    description: "Increases experience gained from kills by 11%.",
    icon: emerald
  },
  {
    type: "Well-Fitted",
    description: "Reduces the cost of Sprinting and Roll Dodge by 5%.",
    icon: almandine
  }
];
