import React, { useContext } from "react";
import styled from "styled-components";
import { Divider } from "antd";
import GearView from "../../../components/GearView";
import { ISet } from "../../../components/GearSlot";
import { BuildContext, Slot } from "../BuildStateContext";
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
  mainHand,
  offHand,
  twoHand
}: {
  armorType: string;
  selectedSet: ISet;
  mainHand: string;
  offHand: string;
  twoHand: string;
}): ISetup[] => {
  return [
    {
      id: "bigpieces",
      label: "Big Pieces",
      data: [
        {
          slot: Slot.head,
          icon: selectIcon(armorType + "Head"),
          selectedSet
        },

        {
          slot: Slot.chest,
          icon: selectIcon(armorType + "Chest"),
          selectedSet
        },

        {
          slot: Slot.legs,
          icon: selectIcon(armorType + "Legs"),
          selectedSet
        }
      ]
    },
    {
      id: "smallpieces",
      label: "Small Pieces",
      data: [
        {
          slot: Slot.shoulders,
          icon: selectIcon(armorType + "Shoulders"),
          selectedSet
        },

        {
          slot: Slot.waist,
          icon: selectIcon(armorType + "Waist"),
          selectedSet
        },
        {
          slot: Slot.hands,
          icon: selectIcon(armorType + "Hands"),
          selectedSet
        },

        {
          slot: Slot.feet,
          icon: selectIcon(armorType + "Feet"),
          selectedSet
        }
      ]
    },
    {
      id: "jewelry",
      label: "Jewelry",
      data: [
        {
          slot: Slot.neck,
          icon: actualNeck,
          selectedSet
        },
        {
          slot: Slot.ring1,
          icon: actualRing,
          selectedSet
        },
        {
          slot: Slot.ring2,
          icon: actualRing,
          selectedSet
        }
      ]
    },
    {
      id: "onehanded",
      label: "One Handed",
      data: [
        {
          slot: Slot.eitherHand,
          icon: selectIcon("dagger"),
          selectedSet
        },
        {
          slot: Slot.eitherHand,
          icon: selectIcon("axe1h"),
          selectedSet
        },
        {
          slot: Slot.eitherHand,
          icon: selectIcon("hammer1h"),
          selectedSet
        },
        {
          slot: Slot.eitherHand,
          icon: selectIcon("sword1h"),
          selectedSet
        },
        {
          slot: Slot.offHand,
          icon: selectIcon("shield"),
          selectedSet
        }
      ]
    },
    {
      id: "twohanded",
      label: "Two Handed",
      data: [
        {
          slot: Slot.mainHand,
          icon: selectIcon("bow"),
          selectedSet
        },
        {
          slot: Slot.mainHand,
          icon: selectIcon("staff"),
          selectedSet
        },
        {
          slot: Slot.mainHand,
          icon: selectIcon("sword2h"),
          selectedSet
        },
        {
          slot: Slot.mainHand,
          icon: selectIcon("axe2h"),
          selectedSet
        },
        {
          slot: Slot.mainHand,
          icon: selectIcon("hammer2h"),
          selectedSet
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
    if (key === "frontbar") {
      if (weaponType === "onehanded") {
        return mySetups.filter(setup => setup.id === "onehanded");
      } else {
        return mySetups.filter(setup => setup.id === "twohanded");
      }
    } else if (key === "backbar") {
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
    if (key === "frontbar") {
      return selectedSetup.filter(setup => setup.id === "frontbar");
    } else if (key === "backbar") {
      return selectedSetup.filter(setup => setup.id === "backbar");
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
        <GearView setups={showGear(setTabKey)} />

        <Divider>Setup</Divider>
        <GearView droppable setups={showSetup(setTabKey)} />
      </OuterContainer>
    </DndProvider>
  );
};
