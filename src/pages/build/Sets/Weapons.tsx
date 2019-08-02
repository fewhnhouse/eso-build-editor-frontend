import React, { useContext, useState, useEffect } from "react";
import { Divider, Radio, Checkbox } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import Flex from "../../../components/Flex";
import styled from "styled-components";

import { SelectValue } from "antd/lib/select";
import { SelectWithTitle } from "./CustomSelect";
import { BuildContext, Slot } from "../BuildStateContext";
import { weaponGlyphs, weaponTraits, armorGlyphs, armorTraits } from "./data";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const StyledFlex = styled(Flex)`
  margin-top: 20px;
`;
const OffHandTitle = styled.div`
  display: flex;
  width: 350px;
  justify-content: space-between;
`;
const StyledSelectWithTitle = styled(SelectWithTitle)`
  min-width: 350px;
  max-width: 350px;
  flex: 1;
  margin: 0px 10px;
`;

export default ({ bar }: { bar: "frontbar" | "backbar" }) => {
  const [state, dispatch] = useContext(BuildContext);
  const [shield, setShield] = useState(false);
  const { weaponType, frontbarSelection, backbarSelection } = state!;

  const [mainHand, setMainHand] = useState<any>(undefined);
  const [offHand, setOffHand] = useState<any>(undefined);

  const onChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: "SET_WEAPON_TYPE",
      payload: { weaponType: e.target.value }
    });
  };

  useEffect(() => {
    console.log("state update");
    const { weaponType, frontbarSelection, backbarSelection } = state!;
    setMainHand(
      [...(bar === "frontbar" ? frontbarSelection : backbarSelection)].find(
        slot => slot.slot === Slot.mainHand
      )
    );
    setOffHand(
      [...(bar === "frontbar" ? frontbarSelection : backbarSelection)].find(
        slot => slot.slot === Slot.offHand
      )
    );
  }, [state]);

  const onChangeSelect = (
    slots: Slot[],
    actionType: string,
    type: "selectedTraits" | "selectedGlyphs",
    itemType: "frontbar" | "backbar"
  ) => (value: SelectValue) => {
    if (shield && slots[0] === Slot.offHand) {
      const itemValue =
        type === "selectedTraits"
          ? armorTraits.find(trait => trait.type === value)
          : armorGlyphs.find(glyph => glyph.type === value);

      dispatch!({
        type: actionType,
        payload: {
          slots,
          value: itemValue,
          type,
          itemType
        }
      });
    } else {
      const itemValue =
        type === "selectedTraits"
          ? weaponTraits.find(trait => trait.type === value)
          : weaponGlyphs.find(glyph => glyph.type === value);

      dispatch!({
        type: actionType,
        payload: {
          slots,
          value: itemValue,
          type,
          itemType
        }
      });
    }
  };
  const onChangeCheckbox = (
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    type: "selectedTraits" | "selectedGlyphs",
    itemType: "frontbar" | "backbar"
  ) => (e: CheckboxChangeEvent) => {
    onChangeSelect(
      [Slot.offHand],
      "SET_WEAPON_STATS",
      "selectedGlyphs",
      itemType
    )("");
    onChangeSelect(
      [Slot.offHand],
      "SET_WEAPON_STATS",
      "selectedTraits",
      itemType
    )("");
    setState(e.target.checked);
  };

  return (
    <StyledFlex direction="column" justify="center" align="center">
      <Radio.Group onChange={onChange} defaultValue={weaponType || "onehanded"}>
        <Radio.Button value="onehanded">One Handed</Radio.Button>
        <Radio.Button value="twohanded">Two Handed</Radio.Button>
      </Radio.Group>
      {weaponType !== "twohanded" && (
        <Checkbox
          style={{ margin: "20px 0px 10px 0px" }}
          onChange={onChangeCheckbox(setShield, "selectedGlyphs", bar)}
          value={shield}
        >
          Use Shield
        </Checkbox>
      )}
      <Divider>Enchants</Divider>

      {weaponType === "twohanded" ? (
        <StyledSelectWithTitle
          value={mainHand && mainHand.glyph ? mainHand.glyph.type : ""}
          onChange={onChangeSelect(
            [Slot.mainHand],
            "SET_WEAPON_STATS",
            "selectedGlyphs",
            "frontbar"
          )}
          title="Main Hand"
          items={weaponGlyphs}
        />
      ) : (
        <Flex
          style={{ width: "100%", minHeigt: 150, flexWrap: "wrap" }}
          direction="row"
          justify="center"
          align="flex-start"
        >
          <StyledSelectWithTitle
            value={mainHand && mainHand.glyph ? mainHand.glyph.type : ""}
            onChange={onChangeSelect(
              [Slot.mainHand],
              "SET_WEAPON_STATS",
              "selectedGlyphs",
              bar
            )}
            title="Main Hand"
            items={weaponGlyphs}
          />
          <StyledSelectWithTitle
            value={offHand && offHand.glyph ? offHand.glyph.type : ""}
            onChange={onChangeSelect(
              [Slot.offHand],
              "SET_WEAPON_STATS",
              "selectedGlyphs",
              bar
            )}
            title="Off Hand"
            items={shield ? armorGlyphs : weaponGlyphs}
          />
        </Flex>
      )}

      <Divider>Traits</Divider>
      {weaponType === "twohanded" ? (
        <StyledSelectWithTitle
          value={mainHand && mainHand.trait ? mainHand.trait.type : ""}
          onChange={onChangeSelect(
            [Slot.mainHand],
            "SET_WEAPON_STATS",
            "selectedTraits",
            bar
          )}
          title="Main Hand"
          items={weaponTraits}
        />
      ) : (
        <Flex
          style={{ width: "100%", minHeight: 150, flexWrap: "wrap" }}
          direction="row"
          justify="center"
          align="flex-start"
        >
          <StyledSelectWithTitle
            value={mainHand && mainHand.trait ? mainHand.trait.type : ""}
            onChange={onChangeSelect(
              [Slot.mainHand],
              "SET_WEAPON_STATS",
              "selectedTraits",
              bar
            )}
            title="Main Hand"
            items={weaponTraits}
          />
          <StyledSelectWithTitle
            value={offHand && offHand.trait ? offHand.trait.type : ""}
            onChange={onChangeSelect(
              [Slot.offHand],
              "SET_WEAPON_STATS",
              "selectedTraits",
              bar
            )}
            title="Off Hand"
            items={shield ? armorTraits : weaponTraits}
          />
        </Flex>
      )}
    </StyledFlex>
  );
};
