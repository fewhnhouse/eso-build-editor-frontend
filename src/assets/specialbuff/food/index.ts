import alcaire from "./ON-icon-food-Alcaire_Festival_Sword-Pie.png";
import aldmeri from "./ON-icon-food-Old_Aldmeri_Orphan_Gruel.png";
import princess from "./ON-icon-food-Princess'_Delight.png";
import rajhin from "./ON-icon-food-Rajhin's_Sugar_Claws.png";
import sanguine from "./ON-icon-food-Sweet_Sanguine_Apples.png";
import candied from "./ON-icon-food-Candied_Jester's_Coins.png";
import crisp from "./ON-icon-food-Crisp_and_Crunchy_Pumpkin_Snack_Skewer.png";
import crunchy from "./ON-icon-food-Crunchy_Spider_Skewer.png";
import deregulated from "./ON-icon-food-Brown_Soup.png";
import frosted from "./ON-icon-food-Frosted_Brains.png";
import jagga from "./ON-icon-food-Jagga-Drenched__Mud_Ball_.png";
import lavafoot from "./ON-icon-food-Lava_Foot_Soup-And-Saltrice.png";
import orzorgapie from "./ON-icon-food-Fruit_Pie.png";
import orzorgatrifle from "./ON-icon-food-Crepe.png";
import artaeumfish from "./ON-icon-food-Artaeum_Pickled_Fish_Bowl.png";
import misrule from "./ON-icon-food-Jewels_of_Misrule.png";
import artaeumbroth from "./ON-icon-food-Artaeum_Pickled_Fish_Bowl.png";
import citrus from "./ON-icon-food-Seafood_Skillet.png";
import orzorgabear from "./ON-icon-food-Roast_Beef.png";
import { ISpecialBuff } from "../drinks";

export const specialFood: ISpecialBuff[] = [
  {
    name: "Alcaire Festival Sword-Pie",
    buffDescription:
      "Increase Max Health by 5852 for 2 hours. These effects are scaled based on your level.",
    description:
      "A hearty meat pie enjoyed during the New Life Festival. This Breton meal is served with a miniature bone sword cooked inside. Recovering the sword is said to grant the luck of Magnus—and an occasional cracked tooth.",
    duration: 120,
    notes: "New Life Festival",
    icon: alcaire,
    quality: 1,
  },
  {
    name: "Old Aldmeri Orphan Gruel",
    buffDescription:
      "Increase Max Magicka by 5320 for 2 hours. These effects are scaled based on your level.",
    description:
      "A porridge traditionally served during the New Life Festival. As porridge goes, this High Elf meal is surprisingly tasty",
    duration: 120,
    notes: "New Life Festival",
    icon: aldmeri,
    quality: 1
  },
  {
    name: "Princess' Delight",
    buffDescription:
      "Increase Max Magicka by 5320 for 2 hours. These effects are scaled based on your level. May also surprise and delight. (6s cooldown)",
    description:
      "A butterfly-shaped puff pastry stuffed with apples and... well, magic?",
    duration: 120,
    notes: "Jester's Festival",
    icon: princess,
    quality: 1
  },
  {
    name: "Rajhin's Sugar Claws",
    buffDescription:
      "Increase Max Stamina by 5320 for 2 hours. These effects are scaled based on your level.",
    description:
      "A mischievous dessert enjoyed during the New Life Festival. This Khajiit treat is more moon-sugar than pastry.",
    duration: 120,
    notes: "New Life Festival",
    icon: rajhin,
    quality: 1
  },
  {
    name: "Sweet Sanguine Apples",
    buffDescription:
      "Increase Max Magicka by 5320 for 2 hours. These effects are scaled based on your level.",
    description:
      "Delicious and candy-coated treats to tempt one into mischief!",
    duration: 120,
    notes: "Witches Festival",
    icon: sanguine,
    quality: 1
  },
  {
    name: "Candied Jester's Coins",
    buffDescription:
      "Increase Max Stamina by 4256 and Magicka Recovery by 425 for 2 hours. These effects are scaled based on your level.",
    description: "Delightful confection coins for the famished numismatist.",
    duration: 120,
    notes: "Jester's Festival",
    icon: candied,
    quality: 2
  },
  {
    name: "Crisp and Crunchy Pumpkin Snack Skewer",
    buffDescription:
      "Increase Max Magicka and Max Stamina by 4256 for 2 hours. These effects are scaled based on your level.",
    description: "A lip-smacking skewer of roasted pumpkin and potato slices.",
    duration: 120,
    notes: "Witches Festival",
    icon: crisp,
    quality: 2
  },
  {
    name: "Crunchy Spider Skewer",
    buffDescription:
      "Increase Max Magicka by 4256 and Stamina Recovery by 425 for 2 hours. These effects are scaled based on your level.",
    description:
      "Savoury spider eggs and centipedes glazed in a spicy acai sauce.",
    duration: 120,
    notes: "Witches Festival",
    icon: crunchy,
    quality: 2
  },
  {
    name: "Deregulated Mushroom Stew",
    buffDescription:
      "Increase Health Recovery by 500 and Magicka Recovery by 457 for 2 hours.",
    description:
      "A piping hot stew of savoury truffles and fabricant flesh. Perfectly edible.",
    duration: 120,
    notes: "Clockwork City",
    icon: deregulated,
    quality: 2
  },
  {
    name: "Frosted Brains",
    buffDescription:
      "Increase Max Magicka by 4256 and Health Recovery by 425 for 2 hours. These effects are scaled based on your level.",
    description:
      "Candy-coated jellied brains on a convenient stick for eating on the go.",
    duration: 120,
    notes: "Witches Festival",
    icon: frosted,
    quality: 2
  },
  {
    name: 'Jagga-Drenched "Mud Ball"',
    buffDescription:
      "Increase Max Magicka and Max Stamina by 4575 for 2 hours. These effects are scaled based on your level.",
    description:
      "A seasonal dessert enjoyed during the New Life Festival. This Wood Elf treat is made with bone flour and senche-passed coffee beans. It is quite sticky.",
    duration: 120,
    notes: "New Life Festival",
    icon: jagga,
    quality: 2
  },
  {
    name: "Lava Foot Soup-And-Saltrice",
    buffDescription:
      "Increase Max Stamina by 4575 and Stamina Recovery by 457 for 2 hours. These effects are scaled based on your level.",
    description:
      "A seasonal meal enjoyed during the New Life Festival. A good serving of this Dark Elf meal keeps the scrib on the surface of the broth.",
    duration: 120,
    notes: "New Life Festival",
    icon: lavafoot,
    quality: 2
  },
  {
    name: "Orzorga's Blood Price Pie",
    buffDescription:
      "Increase Max Health by 5000 and Health Recovery by 500 for 2 hours.",
    description:
      "A pie of stewed blood and minced heart, among other things. Served cold.",
    duration: 120,
    notes: "Orsinium",
    icon: orzorgapie,
    quality: 2
  },
  {
    name: "Orzorga's Tripe Trifle Pocket",
    buffDescription:
      "Increase Max Health by 5000 and Stamina Recovery by 457 for 2 hours.",
    description:
      "A breaded pocket of minced gut and less appealing things, sweetened with beet sugar.",
    duration: 120,
    notes: "Orsinium",
    icon: orzorgatrifle,
    quality: 2
  },
  {
    name: "Artaeum Pickled Fish Bowl",
    buffDescription:
      "Increase Max Health by 5054 and Max Magicka by 4575 for 2 hours. These effects are scaled based on your level. Additionally, fish may be drawn to you.",
    description:
      "Mildly tart and mildly sweet, yet oddly delicious. And entirely raw.",
    duration: 120,
    notes: "Summerset",
    icon: artaeumfish,
    quality: 3
  },
  {
    name: "Jewels of Misrule",
    buffDescription:
      "Increase Stamina and Magicka Recovery by 319 and Max Health by 3511 for 2 hours. These effects are scaled based on your level.",
    description: 'Candy "gems" to fill you with vim and energy.',
    duration: 120,
    notes: "Jester's Festival",
    icon: misrule,
    quality: 3
  },
  {
    name: "Artaeum Takeaway Broth",
    buffDescription:
      "Increase Max Health by 3724 and Health Recovery by 351 and Max Stamina by 3458 and Stamina Recovery by 319 for 2 hours. These effects are scaled based on your level.",
    description:
      "A Broth of many different fish and mussels, boiled continuosly for a fortnight before being called ready. Hearty, if pungent.",
    duration: 120,
    notes: "Summerset",
    icon: artaeumbroth,
    quality: 4
  },
  {
    name: "Clockwork Citrus Filet",
    buffDescription:
      "Increase Max Health by 3724, Health Recovery by 351, Max Magicka by 3458 and Magicka Recovery by 319 for 2 hours.",
    description:
      "Fabricant flesh, perfectly seared and braised in local fruits. What passes for fruit, at least.",
    duration: 120,
    notes: "Clockwork City",
    icon: citrus,
    quality: 4
  },
  {
    name: "Orzorga's Smoked Bear Haunch",
    buffDescription:
      "Increase Max Health by 3724, Health Recovery by 351 and Stamina and Magicka Recovery by 319",
    description:
      "Wrothgar's hearth-wives agree — the bear's haunch is just as tasty as its stuffed head.",
    duration: 120,
    notes: "Orsinium",
    icon: orzorgabear,
    quality: 4
  }
];
