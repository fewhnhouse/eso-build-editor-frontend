import React, { useContext, useState } from "react";
import { Divider, Radio, Checkbox } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import Flex from "../../../components/Flex";
import styled from "styled-components";

import { SelectValue } from "antd/lib/select";
import { SelectWithTitle } from "./CustomSelect";
import { BuildContext } from "../BuildStateContext";
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
  const onChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: "SET_WEAPON_TYPE",
      payload: { weaponType: e.target.value }
    });
  };

  const onChangeSelect = (
    indices: number[],
    actionType: string,
    type: "selectedTraits" | "selectedGlyphs"
  ) => (value: SelectValue) => {
    dispatch!({ type: actionType, payload: { indices, value, type } });
  };
  const onChangeCheckbox = (
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    type: "selectedTraits" | "selectedGlyphs"
  ) => (e: CheckboxChangeEvent) => {
    onChangeSelect([1], "SET_WEAPON_STATS", type)("");
    setState(e.target.checked);
  };

  const [state, dispatch] = useContext(BuildContext);
  const [shieldFront, setShieldFront] = useState(false);
  const [shieldBack, setShieldBack] = useState(false);
  const { weaponType, weaponStats } = state!;

  return (
    <StyledFlex direction="column" justify="center" align="center">
      <Radio.Group onChange={onChange} defaultValue={weaponType || "onehanded"}>
        <Radio.Button value="onehanded">One Handed</Radio.Button>
        <Radio.Button value="twohanded">Two Handed</Radio.Button>
      </Radio.Group>

      <Divider>Enchants</Divider>

      {weaponType === "twohanded" ? (
        <StyledSelectWithTitle
          value={weaponStats.selectedGlyphs[0]}
          onChange={onChangeSelect([0], "SET_WEAPON_STATS", "selectedGlyphs")}
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
            value={weaponStats.selectedGlyphs[0]}
            onChange={onChangeSelect([0], "SET_WEAPON_STATS", "selectedGlyphs")}
            title="Main Hand"
            items={weaponGlyphs}
          />
          <StyledSelectWithTitle
            value={weaponStats.selectedGlyphs[1]}
            onChange={onChangeSelect([1], "SET_WEAPON_STATS", "selectedGlyphs")}
            title={
              <OffHandTitle>
                <span>Off hand</span>
                <Checkbox
                  onChange={onChangeCheckbox(setShieldFront, "selectedGlyphs")}
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
          value={weaponStats.selectedTraits[0]}
          onChange={onChangeSelect([0], "SET_WEAPON_STATS", "selectedTraits")}
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
            value={weaponStats.selectedTraits[0]}
            onChange={onChangeSelect([0], "SET_WEAPON_STATS", "selectedTraits")}
            title="Main Hand"
            items={weaponTraits}
          />
          <StyledSelectWithTitle
            value={weaponStats.selectedTraits[1]}
            onChange={onChangeSelect([1], "SET_WEAPON_STATS", "selectedTraits")}
            title={
              <OffHandTitle>
                <span>Off hand</span>
                <Checkbox
                  onChange={onChangeCheckbox(setShieldBack, "selectedTraits")}
                  value={shieldBack}
                >
                  Use Shield
                </Checkbox>
              </OffHandTitle>
            }
            items={shieldBack ? armorGlyphs : weaponGlyphs}
          />
        </Flex>
      )}
    </StyledFlex>
  );
};
