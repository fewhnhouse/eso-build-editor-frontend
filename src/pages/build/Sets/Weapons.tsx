import React, { useContext, useState } from "react";
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

export default () => {
  const [state, dispatch] = useContext(BuildContext);
  const [shieldFront, setShieldFront] = useState(false);
  const [shieldBack, setShieldBack] = useState(false);
  const { weaponType, frontbarSelection, backbarSelection } = state!;

  const frontMainHand = frontbarSelection.find(
    slot => slot.slot === Slot.mainHand
  );
  const frontOffHand = frontbarSelection.find(
    slot => slot.slot === Slot.offHand
  );
  const backMainHand = backbarSelection.find(
    slot => slot.slot === Slot.mainHand
  );
  const backOffHand = backbarSelection.find(slot => slot.slot === Slot.offHand);

  const onChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: "SET_WEAPON_TYPE",
      payload: { weaponType: e.target.value }
    });
  };

  const onChangeSelect = (
    slots: Slot[],
    actionType: string,
    type: "selectedTraits" | "selectedGlyphs",
    itemType: "frontbar" | "backbar"
  ) => (value: SelectValue) => {
    if (
      (itemType === "frontbar" && shieldFront) ||
      (itemType === "backbar" && shieldBack)
    ) {
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
    onChangeSelect([Slot.offHand], "SET_WEAPON_STATS", type, itemType)("");
    setState(e.target.checked);
  };

  return (
    <StyledFlex direction="column" justify="center" align="center">
      <Radio.Group onChange={onChange} defaultValue={weaponType || "onehanded"}>
        <Radio.Button value="onehanded">One Handed</Radio.Button>
        <Radio.Button value="twohanded">Two Handed</Radio.Button>
      </Radio.Group>

      <Divider>Enchants</Divider>

      {weaponType === "twohanded" ? (
        <StyledSelectWithTitle
          value={
            frontMainHand && frontMainHand.glyph ? frontMainHand.glyph.type : ""
          }
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
            value={
              frontMainHand && frontMainHand.glyph
                ? frontMainHand.glyph.type
                : ""
            }
            onChange={onChangeSelect(
              [Slot.mainHand],
              "SET_WEAPON_STATS",
              "selectedGlyphs",
              "frontbar"
            )}
            title="Main Hand"
            items={weaponGlyphs}
          />
          <StyledSelectWithTitle
            value={
              frontOffHand && frontOffHand.glyph ? frontOffHand.glyph.type : ""
            }
            onChange={onChangeSelect(
              [Slot.offHand],
              "SET_WEAPON_STATS",
              "selectedGlyphs",
              "frontbar"
            )}
            title={
              <OffHandTitle>
                <span>Off hand</span>
                <Checkbox
                  onChange={onChangeCheckbox(
                    setShieldFront,
                    "selectedGlyphs",
                    "frontbar"
                  )}
                  value={shieldFront}
                >
                  Use Shield
                </Checkbox>
              </OffHandTitle>
            }
            items={shieldFront ? armorGlyphs : weaponGlyphs}
          />
        </Flex>
      )}

      <Divider>Traits</Divider>
      {weaponType === "twohanded" ? (
        <StyledSelectWithTitle
          value={
            backMainHand && backMainHand.trait ? backMainHand.trait.type : ""
          }
          onChange={onChangeSelect(
            [Slot.mainHand],
            "SET_WEAPON_STATS",
            "selectedTraits",
            "backbar"
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
            value={
              backMainHand && backMainHand.trait ? backMainHand.trait.type : ""
            }
            onChange={onChangeSelect(
              [Slot.mainHand],
              "SET_WEAPON_STATS",
              "selectedTraits",
              "backbar"
            )}
            title="Main Hand"
            items={weaponTraits}
          />
          <StyledSelectWithTitle
            value={
              backOffHand && backOffHand.trait ? backOffHand.trait.type : ""
            }
            onChange={onChangeSelect(
              [Slot.offHand],
              "SET_WEAPON_STATS",
              "selectedTraits",
              "backbar"
            )}
            title={
              <OffHandTitle>
                <span>Off hand</span>
                <Checkbox
                  onChange={onChangeCheckbox(
                    setShieldBack,
                    "selectedTraits",
                    "backbar"
                  )}
                  value={shieldBack}
                >
                  Use Shield
                </Checkbox>
              </OffHandTitle>
            }
            items={shieldBack ? armorTraits : weaponTraits}
          />
        </Flex>
      )}
    </StyledFlex>
  );
};
