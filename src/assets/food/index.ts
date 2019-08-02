import venison from "./ON-icon-food-Steak_Skillet.png";
import lilmoth from "./ON-icon-food-Fish_Skillet.png";
import millet from "./ON-icon-food-Grilled_Vegetables.png";
import fruitcheese from "./ON-icon-food-Grilled_Apples.png";
import gorapple from "./ON-icon-food-Fruit_Pie.png";
import chutney from "./ON-icon-food-Jam_Pot.png";
import risotto from "./ON-icon-food-Risotto.png";
import hearty from "./ON-icon-food-Brown_Soup.png";
import tenmar from "./ON-icon-food-Fried_Rice.png";
import melonbaked from "./ON-icon-food-Roast_Beef.png";
import mistral from "./ON-icon-food-Seafood_Skillet.png";
import solitude from "./ON-icon-food-Red_Chunky_Soup.png";
import braised from "./ON-icon-food-Stew.png";
import garliccod from "./ON-icon-food-Grilled_Fish.png";
import stickypork from "./ON-icon-food-Brown_Rice.png";
import chevre from "./ON-icon-food-Salad_04.png";
import falafel from "./ON-icon-food-Seafood_Skillet.png";
import tart from "./ON-icon-food-Green_Tart.png";
import capon from "./ON-icon-food-Open_Top_Pie.png";
import jugged from "./ON-icon-food-Jam_Pot.png";
import longfin from "./ON-icon-food-Crepe.png";
import withered from "./ON-icon-food-Stew_Pot.png";

export interface IFood {
  name: string;
  duration: number;
  type: string;
  quality: 1 | 2 | 3;
  maxMagicka: number;
  maxStamina: number;
  maxHealth: number;
  icon: string;
}
export const food: IFood[] = [
  {
    name: "Garlic-And-Pepper Venison Steak",
    duration: 35,
    type: "Meat",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 6608,
    maxStamina: 0,
    icon: venison
  },
  {
    name: "Lilmoth Garlic Hagfish",
    duration: 35,
    type: "Meat",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 6608,
    maxStamina: 0,
    icon: lilmoth
  },
  {
    name: "Millet and Beef Stuffed Peppers",
    duration: 35,
    type: "Meat",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 6608,
    maxStamina: 0,
    icon: millet
  },
  {
    name: "Firsthold Fruit and Cheese Plate",
    duration: 35,
    type: "Fruit",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 6048,
    maxStamina: 0,
    icon: fruitcheese
  },
  {
    name: "Thrice-Baked Gorapple Pie",
    duration: 35,
    type: "Fruit",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 6048,
    maxStamina: 0,
    icon: gorapple
  },
  {
    name: "Tomato Garlic Chutney",
    duration: 35,
    type: "Fruit",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 6048,
    maxStamina: 0,
    icon: chutney
  },
  {
    name: "Bravil's Best Beet Risotto",
    duration: 35,
    type: "Vegetable",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 0,
    maxStamina: 5320,
    icon: risotto
  },
  {
    name: "Hearty Garlic Corn Chowder",
    duration: 35,
    type: "Vegetable",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 0,
    maxStamina: 6048,
    icon: hearty
  },
  {
    name: "Tenmar Millet-Carrot Couscous",
    duration: 35,
    type: "Vegetable",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 0,
    maxStamina: 6048,
    icon: tenmar
  },
  {
    name: "Melon-Baked Parmesan Pork",
    duration: 60,
    type: "Savoury",
    quality: 2,
    maxMagicka: 4936,
    maxHealth: 5395,
    maxStamina: 0,
    icon: melonbaked
  },
  {
    name: "Mistral Banana-Bunny Hash",
    duration: 60,
    type: "Savoury",
    quality: 2,
    maxMagicka: 4936,
    maxHealth: 5395,
    maxStamina: 0,
    icon: mistral
  },
  {
    name: "Solitude Salmon-Millet Soup",
    duration: 60,
    type: "Savoury",
    quality: 2,
    maxMagicka: 4936,
    maxHealth: 5395,
    maxStamina: 0,
    icon: solitude
  },
  {
    name: "Braised Rabbit With Spring Vegetables",
    duration: 60,
    type: "Ragout",
    quality: 2,
    maxMagicka: 0,
    maxHealth: 5395,
    maxStamina: 4936,
    icon: braised
  },
  {
    name: "Garlic Cod With Potato Crust",
    duration: 60,
    type: "Ragout",
    quality: 2,
    maxMagicka: 0,
    maxHealth: 5395,
    maxStamina: 4936,
    icon: garliccod
  },
  {
    name: "Sticky Pork and Radish Noodles",
    duration: 60,
    type: "Ragout",
    quality: 2,
    maxMagicka: 0,
    maxHealth: 5395,
    maxStamina: 4936,
    icon: stickypork
  },
  {
    name: "Chevre-Radish Salad With Pumpkin Seeds",
    duration: 60,
    type: "Entremet",
    quality: 2,
    maxMagicka: 4936,
    maxHealth: 0,
    maxStamina: 4936,
    icon: chevre
  },
  {
    name: "Grapes and AshYam Falafel",
    duration: 60,
    type: "Entremet",
    quality: 2,
    maxMagicka: 4936,
    maxHealth: 0,
    maxStamina: 4936,
    icon: falafel
  },
  {
    name: "Late Hearthfire Vegetable Tart",
    duration: 60,
    type: "Entremet",
    quality: 2,
    maxMagicka: 4936,
    maxHealth: 0,
    maxStamina: 4936,
    icon: tart
  },
  {
    name: "Capon Tomato-Beet Casserole",
    duration: 120,
    type: "Gourmet",
    quality: 3,
    maxMagicka: 4105,
    maxHealth: 4462,
    maxStamina: 4105,
    icon: capon
  },
  {
    name: "Jugged Rabbit in Preserves",
    duration: 120,
    type: "Gourmet",
    quality: 3,
    maxMagicka: 4105,
    maxHealth: 4462,
    maxStamina: 4105,
    icon: jugged
  },
  {
    name: "Longfin Pasty With Melon Sauce",
    duration: 120,
    type: "Gourmet",
    quality: 3,
    maxMagicka: 4105,
    maxHealth: 4462,
    maxStamina: 4105,
    icon: longfin
  },
  {
    name: "Withered Tree Inn Venison Pot Roast",
    duration: 120,
    type: "Gourmet",
    quality: 3,
    maxMagicka: 4105,
    maxHealth: 4462,
    maxStamina: 4105,
    icon: withered
  }
];
