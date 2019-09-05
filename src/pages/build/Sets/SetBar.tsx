import React, { useContext } from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'
import GearView from '../../../components/GearView'
import { ISet } from '../../../components/GearSlot'
import {
  BuildContext,
  Slot,
  ISetSelection,
  WeaponType,
  ArmorType,
  TwohandedWeapon,
  OnehandedWeapon,
  SetTab,
  SetType,
  IModification,
} from '../BuildStateContext'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Scrollbars from 'react-custom-scrollbars'

const OuterContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: ${props => props.theme.paddings.medium};
  max-width: ${props => props.theme.widths.medium};
  background: white;
`

const StyledScrollbars = styled(Scrollbars)`
  background-color: white;
  max-width: ${props => props.theme.widths.medium};
`

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
const getSetups = ({
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

export default () => {
  const [state] = useContext(BuildContext)
  const {
    setTabKey,
    armorType,
    weaponType,
    bigPieceSelection,
    smallPieceSelection,
    frontbarSelection,
    backbarSelection,
    jewelrySelection,
    selectedSet,
  } = state!

  const mySetups = getSetups({
    armorType,
    selectedSet,
    bigPieceSelection,
    smallPieceSelection,
    frontbarSelection,
    backbarSelection,
    jewelrySelection,
  })

  const showGear = (key: string) => {
    const specialWeaponSet: any = specialWeaponSets.find(
      set => selectedSet && selectedSet.name.includes(set.name)
    )
    if (specialWeaponSet) {
      const actualSetup: ISetup | undefined = mySetups.find(
        setup => setup.id === specialWeaponSet.type
      )
      return actualSetup
        ? [
            {
              ...actualSetup,
              data: actualSetup.data.filter(setupData =>
                specialWeaponSet
                  ? specialWeaponSet.weaponTypes.find(
                      (type: any) => setupData.weaponType === type
                    )
                  : false
              ),
            },
          ]
        : []
    }

    if (key === SetTab.frontbar) {
      if (weaponType === WeaponType.onehanded) {
        return mySetups.filter(setup => setup.id === 'onehanded')
      } else {
        return mySetups.filter(setup => setup.id === 'twohanded')
      }
    } else if (key === SetTab.backbar) {
      if (weaponType === WeaponType.onehanded) {
        return mySetups.filter(setup => setup.id === 'onehanded')
      } else {
        return mySetups.filter(setup => setup.id === 'twohanded')
      }
    } else if (key === SetTab.armor) {
      return mySetups.filter(
        setup => setup.id === 'bigpieces' || setup.id === 'smallpieces'
      )
    } else {
      return mySetups.filter(setup => setup.id === 'jewelry')
    }
  }

  const selectedSetup = [
    {
      id: 'bigpieces',
      label: 'Big Pieces',
      data: bigPieceSelection || [],
    },
    {
      id: 'smallpieces',
      label: 'Small Pieces',
      data: smallPieceSelection || [],
    },
    { id: 'jewelry', label: 'Jewelry', data: jewelrySelection || [] },
    {
      id: 'frontbar',
      label: 'Frontbar',
      data: frontbarSelection || [],
    },
    { id: 'backbar', label: 'Backbar', data: backbarSelection || [] },
  ]

  const showSetup = (key: string) => {
    if (key === SetTab.frontbar) {
      return selectedSetup.filter(setup => setup.id === 'frontbar')
    } else if (key === SetTab.backbar) {
      return selectedSetup.filter(setup => setup.id === 'backbar')
    } else if (key === SetTab.armor) {
      return selectedSetup.filter(
        setup => setup.id === 'bigpieces' || setup.id === 'smallpieces'
      )
    } else {
      return selectedSetup.filter(setup => setup.id === 'jewelry')
    }
  }

  const concat = frontbarSelection.concat(
    backbarSelection,
    smallPieceSelection,
    bigPieceSelection,
    jewelrySelection
  )
  const setsCount = concat
    .map(setSelection =>
      setSelection.selectedSet ? setSelection.selectedSet.name : ''
    )
    .reduce<Map<string, number>>(
      (acc, curr) => acc.set(curr, 1 + (acc.get(curr) || 0)),
      new Map()
    )

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledScrollbars autoHide>
        <OuterContainer>
          <Divider>Active Selection</Divider>
          <GearView setups={showGear(setTabKey)} setsCount={setsCount} />

          <Divider>Setup</Divider>
          <GearView
            droppable
            setups={showSetup(setTabKey)}
            setsCount={setsCount}
          />
        </OuterContainer>
      </StyledScrollbars>
    </DndProvider>
  )
}
