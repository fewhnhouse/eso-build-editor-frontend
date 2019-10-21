import { ISet } from './../../../components/GearSlot'
import {
  Slot,
  TwohandedWeapon,
  WeaponType,
  OnehandedWeapon,
  SetType,
  ISetSelection,
  ArmorType,
  IModification,
} from './../BuildStateContext'
export const specialWeaponSets = [
  {
    name: 'Precise Regeneration',
    type: 'twohanded',
    weaponTypes: [TwohandedWeapon.restorationStaff],
  },
  {
    name: 'Concentrated Force',
    type: 'twohanded',
    weaponTypes: [
      TwohandedWeapon.lightningStaff,
      TwohandedWeapon.fireStaff,
      TwohandedWeapon.iceStaff,
    ],
  },
  {
    name: 'Chaotic Whirlwind',
    type: 'onehanded',
    weaponTypes: [
      OnehandedWeapon.axe,
      OnehandedWeapon.dagger,
      OnehandedWeapon.mace,
      OnehandedWeapon.sword,
    ],
  },
  {
    name: 'Disciplined Slash',
    type: 'twohanded',
    weaponTypes: [
      TwohandedWeapon.axe,
      TwohandedWeapon.sword,
      TwohandedWeapon.mace,
    ],
  },
  {
    name: 'Timeless Blessing',
    type: 'twohanded',
    weaponTypes: [TwohandedWeapon.restorationStaff],
  },
  {
    name: 'Defensive Position',
    type: 'onehanded',
    weaponTypes: [
      OnehandedWeapon.shield,
      OnehandedWeapon.dagger,
      OnehandedWeapon.mace,
      OnehandedWeapon.sword,
      OnehandedWeapon.axe,
    ],
  },
  {
    name: 'Piercing Spray',
    type: 'twohanded',
    weaponTypes: [TwohandedWeapon.bow],
  },
  {
    name: 'Gallant Charge',
    type: 'onehanded',
    weaponTypes: [
      OnehandedWeapon.axe,
      OnehandedWeapon.dagger,
      OnehandedWeapon.mace,
      OnehandedWeapon.sword,
      OnehandedWeapon.shield,
    ],
  },
  {
    name: "Mender's Ward",
    type: 'twohanded',
    weaponTypes: [TwohandedWeapon.restorationStaff],
  },
  {
    name: 'Radial Uppercut',
    type: 'twohanded',
    weaponTypes: [
      TwohandedWeapon.axe,
      TwohandedWeapon.sword,
      TwohandedWeapon.mace,
    ],
  },
  {
    name: 'Spectral Cloak',
    type: 'onehanded',
    weaponTypes: [
      OnehandedWeapon.axe,
      OnehandedWeapon.dagger,
      OnehandedWeapon.mace,
      OnehandedWeapon.sword,
    ],
  },
  {
    name: 'Virulent Shot',
    type: 'twohanded',
    weaponTypes: [TwohandedWeapon.bow],
  },
  {
    name: 'Wild Impulse',
    type: 'twohanded',
    weaponTypes: [
      TwohandedWeapon.lightningStaff,
      TwohandedWeapon.iceStaff,
      TwohandedWeapon.fireStaff,
    ],
  },
  {
    name: 'Crushing Wall',
    type: 'twohanded',
    weaponTypes: [
      TwohandedWeapon.lightningStaff,
      TwohandedWeapon.iceStaff,
      TwohandedWeapon.fireStaff,
    ],
  },
  {
    name: 'Cruel Flurry',
    type: 'onehanded',
    weaponTypes: [OnehandedWeapon.axe, OnehandedWeapon.dagger],
  },
  {
    name: 'Merciless Charge',
    type: 'twohanded',
    weaponTypes: [
      TwohandedWeapon.axe,
      TwohandedWeapon.sword,
      TwohandedWeapon.mace,
    ],
  },
  {
    name: 'Rampaging Slash',
    type: 'onehanded',
    weaponTypes: [
      OnehandedWeapon.mace,
      OnehandedWeapon.sword,
      OnehandedWeapon.shield,
    ],
  },
  {
    name: 'Thunderous Volley',
    type: 'twohanded',
    weaponTypes: [TwohandedWeapon.bow],
  },
  {
    name: 'Destructive Impact',
    type: 'twohanded',
    weaponTypes: [
      TwohandedWeapon.lightningStaff,
      TwohandedWeapon.iceStaff,
      TwohandedWeapon.fireStaff,
    ],
  },
  {
    name: 'Stinging Slashes',
    type: 'onehanded',
    weaponTypes: [OnehandedWeapon.axe, OnehandedWeapon.dagger],
  },
  {
    name: 'Titanic Cleave',
    type: 'twohanded',
    weaponTypes: [
      TwohandedWeapon.axe,
      TwohandedWeapon.sword,
      TwohandedWeapon.mace,
    ],
  },
  {
    name: 'Grand Rejuvenation',
    type: 'twohanded',
    weaponTypes: [TwohandedWeapon.restorationStaff],
  },
  {
    name: 'Puncturing Remedy',
    type: 'onehanded',
    weaponTypes: [
      OnehandedWeapon.mace,
      OnehandedWeapon.shield,
      OnehandedWeapon.sword,
    ],
  },
  {
    name: 'Caustic Arrow',
    type: 'twohanded',
    weaponTypes: [TwohandedWeapon.bow],
  },
]

interface IData {
  slot: Slot
  type?: ArmorType | WeaponType
  weaponType?: OnehandedWeapon | TwohandedWeapon
  selectedSet?: ISet
  glyph?: IModification
  trait?: IModification
}
interface ISetup {
  id: string
  label: string
  data: IData[]
}

export const getSetups = ({
  armorType,
  selectedSet,
  bigPieceSelection,
  smallPieceSelection,
  jewelrySelection,
}: {
  armorType: ArmorType
  selectedSet?: ISet
  bigPieceSelection: ISetSelection[]
  smallPieceSelection: ISetSelection[]
  jewelrySelection: ISetSelection[]
  frontbarSelection: ISetSelection[]
  backbarSelection: ISetSelection[]
}): ISetup[] => {
  return [
    {
      id: 'bigpieces',
      label: 'Big Pieces',
      data: bigPieceSelection
        .filter(bigPiece =>
          selectedSet && selectedSet.type === SetType.undaunted
            ? bigPiece.slot === Slot.head || bigPiece.slot === Slot.shoulders
            : true
        )
        .map(bigPiece => ({
          slot: bigPiece.slot,
          type: armorType,
          selectedSet,
          glyph: bigPiece.glyph,
          trait: bigPiece.trait,
        })),
    },
    {
      id: 'smallpieces',
      label: 'Small Pieces',
      data: smallPieceSelection
        .filter(smallPiece =>
          selectedSet && selectedSet.type === SetType.undaunted
            ? smallPiece.slot === Slot.head ||
              smallPiece.slot === Slot.shoulders
            : true
        )
        .map(smallPiece => ({
          slot: smallPiece.slot,
          type: armorType,
          selectedSet,
          glyph: smallPiece.glyph,
          trait: smallPiece.trait,
        })),
    },
    {
      id: 'jewelry',
      label: 'Jewelry',
      data: jewelrySelection.map(jewelry => ({
        slot: jewelry.slot,
        selectedSet,
        glyph: jewelry.glyph,
        trait: jewelry.trait,
      })),
    },
    {
      id: 'onehanded',
      label: 'One Handed',
      data: [
        {
          slot: Slot.eitherHand,
          selectedSet,
          type: WeaponType.onehanded,
          weaponType: OnehandedWeapon.dagger,
        },
        {
          slot: Slot.eitherHand,
          selectedSet,
          type: WeaponType.onehanded,
          weaponType: OnehandedWeapon.axe,
        },
        {
          slot: Slot.eitherHand,
          selectedSet,
          type: WeaponType.onehanded,
          weaponType: OnehandedWeapon.mace,
        },
        {
          slot: Slot.eitherHand,
          selectedSet,
          type: WeaponType.onehanded,
          weaponType: OnehandedWeapon.sword,
        },
        {
          slot: Slot.offHand,
          selectedSet,
          type: WeaponType.onehanded,
          weaponType: OnehandedWeapon.shield,
        },
      ],
    },
    {
      id: 'twohanded',
      label: 'Two Handed',
      data: [
        {
          slot: Slot.mainHand,
          selectedSet,
          weaponType: TwohandedWeapon.axe,
          type: WeaponType.twohanded,
        },
        {
          slot: Slot.mainHand,
          selectedSet,
          weaponType: TwohandedWeapon.bow,
          type: WeaponType.twohanded,
        },
        {
          slot: Slot.mainHand,
          selectedSet,
          weaponType: TwohandedWeapon.sword,
          type: WeaponType.twohanded,
        },
        {
          slot: Slot.mainHand,
          selectedSet,
          weaponType: TwohandedWeapon.mace,
          type: WeaponType.twohanded,
        },
        {
          slot: Slot.mainHand,
          selectedSet,
          weaponType: TwohandedWeapon.fireStaff,
          type: WeaponType.twohanded,
        },
        {
          slot: Slot.mainHand,
          selectedSet,
          weaponType: TwohandedWeapon.lightningStaff,
          type: WeaponType.twohanded,
        },
        {
          slot: Slot.mainHand,
          selectedSet,
          weaponType: TwohandedWeapon.iceStaff,
          type: WeaponType.twohanded,
        },
        {
          slot: Slot.mainHand,
          selectedSet,
          weaponType: TwohandedWeapon.restorationStaff,
          type: WeaponType.twohanded,
        },
      ],
    },
  ]
}
