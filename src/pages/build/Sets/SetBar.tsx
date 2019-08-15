import React, { useContext } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import GearView from '../../../components/GearView';
import { ISet } from '../../../components/GearSlot';
import {
  BuildContext,
  Slot,
  ISetSelection,
  WeaponType,
  ArmorType,
  TwohandedWeapon,
  OnehandedWeapon,
  SetTab,
} from '../BuildStateContext';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const OuterContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 40px;
  overflow: auto;
  max-width: 400px;

  background: white;
`;

interface ISetup {
  id: string;
  label: string;
  data: ISetSelection[];
}
const getSetups = ({
  armorType,
  selectedSet,
  bigPieceSelection,
  smallPieceSelection,
  jewelrySelection,
}: {
  armorType: ArmorType;
  selectedSet?: ISet;
  bigPieceSelection: ISetSelection[];
  smallPieceSelection: ISetSelection[];
  jewelrySelection: ISetSelection[];
  frontbarSelection: ISetSelection[];
  backbarSelection: ISetSelection[];
}): ISetup[] => {
  return [
    {
      id: 'bigpieces',
      label: 'Big Pieces',
      data: bigPieceSelection.map(bigPiece => ({
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
      data: smallPieceSelection.map(smallPiece => ({
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
      ],
    },
  ];
};

export default () => {
  const [state] = useContext(BuildContext);

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
  } = state!;

  const mySetups = getSetups({
    armorType,
    selectedSet,
    bigPieceSelection,
    smallPieceSelection,
    frontbarSelection,
    backbarSelection,
    jewelrySelection,
  });
  const showGear = (key: string) => {
    if (key === SetTab.frontbar) {
      if (weaponType === WeaponType.onehanded) {
        return mySetups.filter(setup => setup.id === 'onehanded');
      } else {
        return mySetups.filter(setup => setup.id === 'twohanded');
      }
    } else if (key === SetTab.backbar) {
      if (weaponType === WeaponType.onehanded) {
        return mySetups.filter(setup => setup.id === 'onehanded');
      } else {
        return mySetups.filter(setup => setup.id === 'twohanded');
      }
    } else if (key === SetTab.armor) {
      return mySetups.filter(
        setup => setup.id === 'bigpieces' || setup.id === 'smallpieces'
      );
    } else {
      return mySetups.filter(setup => setup.id === 'jewelry');
    }
  };

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
  ];

  const showSetup = (key: string) => {
    if (key === SetTab.frontbar) {
      return selectedSetup.filter(setup => setup.id === 'frontbar');
    } else if (key === SetTab.backbar) {
      return selectedSetup.filter(setup => setup.id === 'backbar');
    } else if (key === SetTab.armor) {
      return selectedSetup.filter(
        setup => setup.id === 'bigpieces' || setup.id === 'smallpieces'
      );
    } else {
      return selectedSetup.filter(setup => setup.id === 'jewelry');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <OuterContainer>
        <Divider>Active Selection</Divider>
        <GearView setups={showGear(setTabKey)} />

        <Divider>Setup</Divider>
        <GearView droppable setups={showSetup(setTabKey)} />
      </OuterContainer>
    </DndProvider>
  );
};
