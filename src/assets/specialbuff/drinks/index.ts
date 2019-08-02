import bergama from "./ON-icon-food-Bergama_Warning_Fire.png";
import betnikh from "./ON-icon-food-Betnikh_Twice-Spiked_Ale.png";
import peeledEyeballs from "./ON-icon-food-Bowl_of__Peeled_Eyeballs_.png";
import bloodyMara from "./ON-icon-food-Double_Bloody_Mara.png";
import camoranThrone from "./ON-icon-food-Dubious_Camoran_Throne.png";
import ghastlyEyeBowl from "./ON-icon-food-Ghastly_Eye_Bowl.png";
import hissimir from "./ON-icon-food-Hissmir_Fish-Eye_Rye.png";
import snowBear from "./ON-icon-food-Snow_Bear_Glow-Wine.png";
import tea from "./ON-icon-food-Tea_05.png";
import witchmotherPartyPunch from "./ON-icon-food-Witchmothers_Party_Punch.png";
import witchmotherPotentBrew from "./ON-icon-food-Witchmothers_Potent_Brew.png";
import tin from "./ON-icon-stolen-Tin.png";

export interface ISpecialBuff {
  name: string;
  buffDescription: string;
  description: string;
  duration: number;
  notes: string;
  icon: string;
}

export const specialDrinks: ISpecialBuff[] = [
  {
    name: "Snow Bear Glow-Wine",
    buffDescription:
      "Increase Stamina Recovery by 532 for 2 hours. These effects are scaled based on your level.",
    description:
      "A hearty mulled wine enjoyed during the New Life Festival. This Nord drink is always served piping hot.	",
    duration: 120,
    notes: "New Life Festival",
    icon: snowBear
  },
  {
    name: "Bergama Warning Fire",
    buffDescription:
      "Increase Max Stamina by 4575 and Health Recovery by 500 for 2 hours. These effects are scaled based on your level.",
    description:
      "A seasonal drink enjoyed during the New Life Festival. This Redguard drink is served piping hot, and sharpens the imbiber's wits rather than dulls them.",
    duration: 120,
    notes: "New Life Festival",
    icon: bergama
  },
  {
    name: "Betnikh Twice-Spiked Ale",
    buffDescription:
      "Increase Magicka Recovery and Health Recovery by 425 for 2 hours. These effects are scaled based on your level.",
    description:
      'A seasonal drink enjoyed during the New Life Festival. This Orc ale is exceptionally foamy, which helps create "gastric affirmation."',
    duration: 120,
    notes: "New Life Festival",
    icon: betnikh
  },
  {
    name: 'Bowl of "Peeled Eyeballs"',
    buffDescription:
      "Increase Magicka Recovery and Health Recovery by 425 for 2 hours. These effects are scaled based on your level.",
    description:
      "A bowl of peeled grapes and cold noodles in fruit broth. Tasty, and a laugh riot at coven parties!",
    duration: 120,
    notes: "Witches Festival",
    icon: peeledEyeballs
  },
  {
    name: "Ghastly Eye Bowl",
    buffDescription:
      "Increase Max Magicka by 4256 and Magicka Recovery by 425 for 2 hours. These effects are scaled based on your level.",
    description:
      '"Eyeballs" and live worms in a chilled banana and fleshfly broth. Squirms inside all the way down!',
    duration: 120,
    notes: "Witches Festival",
    icon: ghastlyEyeBowl
  },
  {
    name: "Orzorga's Red Frothgar",
    buffDescription: "",
    description: "Ice-cold dredged berry mash, in the old Orcish style.",
    duration: 120,
    notes: "Orsinium",
    icon: tea
  },
  {
    name: "Dubious Camoran Throne",
    buffDescription:
      "Increase Stamina Recovery by 319 and Max Stamina by 3192 and Max Health by 3511 for 2 hours. These effects are scaled based on your level.",
    description:
      "A dessert cocktail of jagga, rotmeth, and sweetbread puree. Definitely Green Pact Compliant.",
    duration: 120,
    notes: "Jester's Festival",
    icon: camoranThrone
  },
  {
    name: "Spring-Loaded Infusion",
    buffDescription:
      "Increase Max Health by 3724, and Max Magicka and Stamina by 3458 for 2 hours.",
    description:
      "Brewed from potable liquids in the Clockwork City. Probably volatile, and quite eye-opening.",
    duration: 120,
    notes: "Clockwork City",
    icon: tin
  },
  {
    name: "Witchmother's Party Punch",
    buffDescription:
      "Increase Magicka Recovery, Stamina Recovery, and Health Recovery by 319 for 2 hours. These effects are scaled based on your level.",
    description: "An ice-cold punch of fruit mash and rye alcohol.",
    duration: 120,
    notes: "Witches Festival",
    icon: witchmotherPartyPunch
  },
  {
    name: "Witchmother's Potent Brew",
    buffDescription:
      "Increase Max Magicka by 3192, Magicka Recovery by 319, and Max Health by 3511 for 2 hours. These effects are scaled based on your level.",
    description: "It smells… dangerous. Toxic. And those are definitely bones.",
    duration: 120,
    notes: "Witches Festival",
    icon: witchmotherPotentBrew
  },
  {
    name: "Double Bloody Mara",
    buffDescription:
      "Increase Max Health by 5054 and Max Magicka by 4575 for 2 hours. If you are a vampire, the blood in this drink will also mildly sate you. These effects are scaled based on your level.",
    description:
      "It reeks of cold blood, herbs, spices, and alcohol. Down the hatch!",
    duration: 120,
    notes: "Witches Festival",
    icon: bloodyMara
  },
  {
    name: "Hissmir Fish-Eye Rye",
    buffDescription:
      "Increase Magicka and Stamina Recovery by 457 for 2 hours. This drink will also grant you insights into what manner of fish spawn in various bodies of water, as well as alertness for nearby fish activity. These effects are scaled based on your level.",
    description:
      "A seasonal beverage enjoyed during the New Life Festival. This Argonian drink has a terrible smell, which is why it should be imbibed only with plugged nostrils.",
    duration: 120,
    notes: "New Life Festival",
    icon: hissimir
  }
];
