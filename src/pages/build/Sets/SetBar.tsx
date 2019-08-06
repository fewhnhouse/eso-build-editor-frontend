import React, { useContext } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import GearView from '../../../components/GearView';
import { ISet } from '../../../components/GearSlot';
import { BuildContext, Slot, ISetSelection } from '../BuildStateContext';
import {
  selectArmor,
  selectWeapon,
  selectJewelry,
  actualRing,
  actualNeck,
} from '../../../assets/gear';
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
  data: {
    slot: Slot;
    icon: string | undefined;
    selectedSet: ISet | undefined;
  }[];
}
const getSetups = ({
  armorType,
  selectedSet,
  bigPieceSelection,
  smallPieceSelection,
  jewelrySelection,
  frontbarSelection,
  backbarSelection,
  weight,
}: {
  armorType: string;
  selectedSet?: ISet;
  bigPieceSelection: ISetSelection[];
  smallPieceSelection: ISetSelection[];
  jewelrySelection: ISetSelection[];
  frontbarSelection: ISetSelection[];
  backbarSelection: ISetSelection[];
  weight: string;
}): ISetup[] => {
  return [
    {
      id: 'bigpieces',
      label: 'Big Pieces',
      data: bigPieceSelection.map(bigPiece => ({
        slot: bigPiece.slot,
        type: weight,
        icon: selectArmor(armorType, bigPiece.slot),
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
        type: weight,
        icon: selectArmor(armorType, smallPiece.slot),
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
        icon: selectJewelry(jewelry.slot),
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
          icon: selectWeapon('dagger'),
          selectedSet,
        },
        {
          slot: Slot.eitherHand,
          icon: selectWeapon('axe1h'),
          selectedSet,
        },
        {
          slot: Slot.eitherHand,
          icon: selectWeapon('hammer1h'),
          selectedSet,
        },
        {
          slot: Slot.eitherHand,
          icon: selectWeapon('sword1h'),
          selectedSet,
        },
        {
          slot: Slot.offHand,
          icon: selectWeapon('shield'),
          selectedSet,
        },
      ],
    },
    {
      id: 'twohanded',
      label: 'Two Handed',
      data: [
        {
          slot: Slot.mainHand,
          icon: selectWeapon('bow'),
          selectedSet,
        },
        {
          slot: Slot.mainHand,
          icon: selectWeapon('staff'),
          selectedSet,
        },
        {
          slot: Slot.mainHand,
          icon: selectWeapon('sword2h'),
          selectedSet,
        },
        {
          slot: Slot.mainHand,
          icon: selectWeapon('axe2h'),
          selectedSet,
        },
        {
          slot: Slot.mainHand,
          icon: selectWeapon('hammer2h'),
          selectedSet,
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
    weapons,
    weaponType,
    bigPieceSelection,
    smallPieceSelection,
    frontbarSelection,
    backbarSelection,
    jewelrySelection,
    selectedSet,
  } = state!;

  const armor = armorType.split('armor')[0];
  const mySetups = getSetups({
    armorType: armor,
    selectedSet,
    bigPieceSelection,
    smallPieceSelection,
    frontbarSelection,
    backbarSelection,
    jewelrySelection,
    weight: armorType,
  });
  const showGear = (key: string) => {
    if (key === 'frontbar') {
      if (weaponType === 'onehanded') {
        return mySetups.filter(setup => setup.id === 'onehanded');
      } else {
        return mySetups.filter(setup => setup.id === 'twohanded');
      }
    } else if (key === 'backbar') {
      if (weaponType === 'onehanded') {
        return mySetups.filter(setup => setup.id === 'onehanded');
      } else {
        return mySetups.filter(setup => setup.id === 'twohanded');
      }
    } else if (key === 'armor') {
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
    if (key === 'frontbar') {
      return selectedSetup.filter(setup => setup.id === 'frontbar');
    } else if (key === 'backbar') {
      return selectedSetup.filter(setup => setup.id === 'backbar');
    } else if (key === 'armor') {
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
