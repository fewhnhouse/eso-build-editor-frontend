import React, { useContext } from "react";
import styled from "styled-components";
import { Divider } from "antd";
import GearView from "../../../components/GearView";
import { ISet } from "../../../components/GearSlot";
import { BuildContext } from "../BuildStateContext";
import { selectIcon, actualRing, actualNeck } from "../../../assets/gear";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const OuterContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 40px;
  overflow: auto;
  max-width: 400px;

  background: white;
`;

const getSetups = ({
  armorType,
  selectedSet,
  mainHand,
  offHand,
  twoHand
}: {
  armorType: string;
  selectedSet: ISet;
  mainHand: string;
  offHand: string;
  twoHand: string;
}) => {
  return [
    {
      id: "bigpieces",
      label: "Big Pieces",
      data: [
        {
          slot: "head",
          icon: selectIcon(armorType + "Head"),
          set: selectedSet
        },

        {
          slot: "chest",
          icon: selectIcon(armorType + "Chest"),
          set: selectedSet
        },

        {
          slot: "legs",
          icon: selectIcon(armorType + "Legs"),
          set: selectedSet
        }
      ]
    },
    {
      id: "smallpieces",
      label: "Small Pieces",
      data: [
        {
          slot: "shoulders",
          icon: selectIcon(armorType + "Shoulders"),
          set: selectedSet
        },

        {
          slot: "waist",
          icon: selectIcon(armorType + "Waist"),
          set: selectedSet
        },
        {
          slot: "hands",
          icon: selectIcon(armorType + "Hands"),
          set: selectedSet
        },

        {
          slot: "feet",
          icon: selectIcon(armorType + "Feet"),
          set: selectedSet
        }
      ]
    },
    {
      id: "jewelry",
      label: "Jewelry",
      data: [
        {
          slot: "neck",
          icon: actualNeck,
          set: selectedSet
        },
        {
          slot: "ring1",
          icon: actualRing,
          set: selectedSet
        },
        {
          slot: "ring2",
          icon: actualRing,
          set: selectedSet
        }
      ]
    },
    {
      id: "onehanded",
      label: "One Handed",
      data: [
        {
          slot: "eitherHand",
          icon: selectIcon("dagger"),
          set: selectedSet
        },
        {
          slot: "eitherHand",
          icon: selectIcon("axe1h"),
          set: selectedSet
        },
        {
          slot: "eitherHand",
          icon: selectIcon("hammer1h"),
          set: selectedSet
        },
        {
          slot: "eitherHand",
          icon: selectIcon("sword1h"),
          set: selectedSet
        },
        {
          slot: "offHand",
          icon: selectIcon("shield"),
          set: selectedSet
        }
      ]
    },
    {
      id: "twohanded",
      label: "Two Handed",
      data: [
        {
          slot: "mainHand",
          icon: selectIcon("bow"),
          set: selectedSet
        },
        {
          slot: "mainHand",
          icon: selectIcon("staff"),
          set: selectedSet
        },
        {
          slot: "mainHand",
          icon: selectIcon("sword2h"),
          set: selectedSet
        },
        {
          slot: "mainHand",
          icon: selectIcon("axe2h"),
          set: selectedSet
        },
        {
          slot: "mainHand",
          icon: selectIcon("hammer2h"),
          set: selectedSet
        }
      ]
    }
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
    selectedSet
  } = state!;

  const mainWeapon =
    weaponType === "onehanded" && weapons[0]
      ? weapons[0]
          .toString()
          .split("main-")[1]
          .toLowerCase()
      : "";
  const offWeapon =
    weaponType === "onehanded" && weapons[1]
      ? weapons[1]
          .toString()
          .split("off-")[1]
          .toLowerCase()
      : "";
  const twoWeapon =
    weaponType === "twohanded" && weapons[0]
      ? weapons[0]
          .toString()
          .split("two-")[1]
          .toLowerCase()
      : "";
  const armor = armorType.split("armor")[0];
  const mySetups = getSetups({
    armorType: armor,
    mainHand: mainWeapon,
    selectedSet: selectedSet!,
    offHand: offWeapon,
    twoHand: twoWeapon
  });
  const showGear = (key: string) => {
    if (key === "weapons") {
      if (weaponType === "onehanded") {
        return mySetups.filter(setup => setup.id === "onehanded");
      } else {
        return mySetups.filter(setup => setup.id === "twohanded");
      }
    } else if (key === "armor") {
      return mySetups.filter(
        setup => setup.id === "bigpieces" || setup.id === "smallpieces"
      );
    } else {
      return mySetups.filter(setup => setup.id === "jewelry");
    }
  };

  const selectedSetup = [
    {
      id: "bigpieces",
      label: "Big Pieces",
      data: bigPieceSelection || []
    },
    {
      id: "smallpieces",
      label: "Small Pieces",
      data: smallPieceSelection || []
    },
    { id: "jewelry", label: "Jewelry", data: jewelrySelection || [] },
    {
      id: "frontbar",
      label: "Frontbar",
      data: frontbarSelection || []
    },
    { id: "backbar", label: "Backbar", data: backbarSelection || [] }
  ];

  const showSetup = (key: string) => {
    if (key === "weapons") {
      return selectedSetup.filter(
        setup => setup.id === "frontbar" || setup.id === "backbar"
      );
    } else if (key === "armor") {
      return selectedSetup.filter(
        setup => setup.id === "bigpieces" || setup.id === "smallpieces"
      );
    } else {
      return selectedSetup.filter(setup => setup.id === "jewelry");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <OuterContainer>
        <Divider>Active Selection</Divider>
        <GearView newGear setups={showGear(setTabKey)} />

        <Divider>Setup</Divider>
        <GearView newGear droppable setups={showSetup(setTabKey)} />
      </OuterContainer>
    </DndProvider>
  );
};
