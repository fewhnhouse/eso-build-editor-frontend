import beer1 from "./ON-icon-food-Beer_01.png";
import beer3 from "./ON-icon-food-Beer_03.png";
import beer from "./ON-icon-food-Beer.png";
import blackTea from "./ON-icon-food-Black_Tea.png";
import brownBottle from "./ON-icon-food-Brown_Bottle.png";
import chai from "./ON-icon-food-Chai.png";
import jug from "./ON-icon-food-Jug.png";
import pigsMilk from "./ON-icon-food-Pigs_Milk.png";
import profundity from "./ON-icon-food-Profundity.png";
import redBottle from "./ON-icon-food-Red_Bottle.png";
import spiritsBlue from "./ON-icon-food-Spirits_Blue.png";
import spiritsGreen from "./ON-icon-food-Spirits_Green.png";
import spirits from "./ON-icon-food-Spirits.png";
import tea3 from "./ON-icon-food-Tea_03.png";
import tea4 from "./ON-icon-food-Tea_04.png";
import tea5 from "./ON-icon-food-Tea_05.png";
import tea6 from "./ON-icon-food-Tea_06.png";
import wine from "./ON-icon-food-Wine.png";

export interface IDrink {
  name: string;
  duration: number;
  type: string;
  quality: 1 | 2 | 3;
  magickaRec: number;
  staminaRec: number;
  healthRec: number;
  icon: string;
}
export const drinks: IDrink[] = [
  {
    name: "Colovian Ginger Beer",
    duration: 35,
    type: "Alcohol",
    quality: 1,
    magickaRec: 0,
    healthRec: 660,
    staminaRec: 0,
    icon: beer3
  },
  {
    name: "Kragenmoor Zinger Mazte",
    duration: 35,
    type: "Alcohol",
    quality: 1,
    magickaRec: 0,
    healthRec: 660,
    staminaRec: 0,
    icon: redBottle
  },
  {
    name: "Markarth Mead",
    duration: 35,
    type: "Alcohol",
    quality: 1,
    magickaRec: 0,
    healthRec: 660,
    staminaRec: 0,
    icon: brownBottle
  },
  {
    name: "Heart's Day Rose Tea",
    duration: 35,
    type: "Tea",
    quality: 1,
    magickaRec: 604,
    healthRec: 0,
    staminaRec: 0,
    icon: tea6
  },
  {
    name: "Muthsera's Remorse",
    duration: 35,
    type: "Tea",
    quality: 1,
    magickaRec: 604,
    healthRec: 0,
    staminaRec: 0,
    icon: tea5
  },
  {
    name: "Soothing Bard's-Throat Tea",
    duration: 35,
    type: "Tea",
    quality: 1,
    magickaRec: 604,
    healthRec: 0,
    staminaRec: 0,
    icon: tea3
  },
  {
    name: "Fredas Night Infusion",
    duration: 35,
    type: "Tonic",
    quality: 1,
    magickaRec: 0,
    healthRec: 0,
    staminaRec: 604,
    icon: spiritsBlue
  },
  {
    name: "Hagraven's Tonic",
    duration: 35,
    type: "Tonic",
    quality: 1,
    magickaRec: 0,
    healthRec: 0,
    staminaRec: 604,
    icon: chai
  },
  {
    name: "Old Hegathe Lemon Kaveh",
    duration: 35,
    type: "Tonic",
    quality: 1,
    magickaRec: 0,
    healthRec: 0,
    staminaRec: 604,
    icon: blackTea
  },
  {
    name: "Bravil Bitter Barley Beer",
    duration: 60,
    type: "Liqueur",
    quality: 2,
    magickaRec: 493,
    healthRec: 539,
    staminaRec: 0,
    icon: beer1
  },
  {
    name: "Dragontail Blended Whisky",
    duration: 60,
    type: "Liqueur",
    quality: 2,
    magickaRec: 493,
    healthRec: 539,
    staminaRec: 0,
    icon: spirits
  },
  {
    name: "Port Hunding Pinot Noir",
    duration: 60,
    type: "Liqueur",
    quality: 2,
    magickaRec: 493,
    healthRec: 539,
    staminaRec: 0,
    icon: beer
  },
  {
    name: "Camlorn Sweet Brown Ale",
    duration: 60,
    type: "Tincture",
    quality: 2,
    magickaRec: 0,
    healthRec: 539,
    staminaRec: 493,
    icon: wine
  },
  {
    name: "Flowing Bowl Green Port",
    duration: 60,
    type: "Tincture",
    quality: 2,
    magickaRec: 0,
    healthRec: 539,
    staminaRec: 493,
    icon: spiritsGreen
  },
  {
    name: "Wide-Eye Double Rye",
    duration: 60,
    type: "Tincture",
    quality: 2,
    magickaRec: 0,
    healthRec: 539,
    staminaRec: 493,
    icon: pigsMilk
  },
  {
    name: "Cloudrest Clarified Coffee",
    duration: 60,
    type: "Cordial",
    quality: 2,
    magickaRec: 493,
    healthRec: 0,
    staminaRec: 493,
    icon: jug
  },
  {
    name: "Honest Lassie Honey Tea",
    duration: 60,
    type: "Cordial",
    quality: 2,
    magickaRec: 493,
    healthRec: 0,
    staminaRec: 493,
    icon: tea4
  },
  {
    name: "Rosy Disposition Tonic",
    duration: 60,
    type: "Cordial",
    quality: 2,
    magickaRec: 493,
    healthRec: 0,
    staminaRec: 493,
    icon: profundity
  },
  {
    name: "Lusty Argonian Maid Mazte",
    duration: 120,
    type: "Distillate",
    quality: 3,
    magickaRec: 410,
    healthRec: 446,
    staminaRec: 410,
    icon: jug
  },
  {
    name: "Senche-Tiger Single Malt",
    duration: 120,
    type: "Distillate",
    quality: 3,
    magickaRec: 410,
    healthRec: 446,
    staminaRec: 410,
    icon: spirits
  },
  {
    name: "Velothi View Vintage Malbec",
    duration: 120,
    type: "Distillate",
    quality: 3,
    magickaRec: 410,
    healthRec: 446,
    staminaRec: 410,
    icon: redBottle
  },
  {
    name: "Orcrest Agony Pale Ale",
    duration: 120,
    type: "Distillate",
    quality: 3,
    magickaRec: 410,
    healthRec: 446,
    staminaRec: 410,
    icon: beer3
  }
];
