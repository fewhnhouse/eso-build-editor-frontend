import React, { useContext } from "react";
import { Divider } from "antd";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import { SelectWithTitle } from "./CustomSelect";
import { SelectValue } from "antd/lib/select";
import { BuildContext } from "../BuildStateContext";
import { jewelryGlyphs, jewelryTraits } from "./data";

const StyledFlex = styled(Flex)`
  margin-top: 20px;
  overflow-y: auto;
`;

export default () => {
  const onChangeSelect = (
    indices: number[],
    actionType: string,
    type: "selectedTraits" | "selectedGlyphs"
  ) => (value: SelectValue) => {
    dispatch!({ type: actionType, payload: { indices, value, type } });
  };
  const [state, dispatch] = useContext(BuildContext);
  const { jewelryStats } = state!;

  return (
    <StyledFlex direction="column" justify="center" align="center">
      <Divider>Glyphs</Divider>
      <Flex
        style={{ width: "100%", minHeigt: 150, flexWrap: "wrap" }}
        direction="row"
        justify="space-between"
        align="flex-start"
      >
        <StyledSelectWithTitle
          value={jewelryStats.selectedGlyphs[0]}
          onChange={onChangeSelect([0], "SET_JEWELRY_STATS", "selectedGlyphs")}
          title="Necklace"
          items={jewelryGlyphs}
        />
        <StyledSelectWithTitle
          value={jewelryStats.selectedGlyphs[1]}
          onChange={onChangeSelect([1], "SET_JEWELRY_STATS", "selectedGlyphs")}
          title="Ring 1"
          items={jewelryGlyphs}
        />
        <StyledSelectWithTitle
          value={jewelryStats.selectedGlyphs[2]}
          onChange={onChangeSelect([2], "SET_JEWELRY_STATS", "selectedGlyphs")}
          title="Ring 2"
          items={jewelryGlyphs}
        />
      </Flex>

      <Divider>Traits</Divider>
      <Flex
        style={{ width: "100%", minHeigt: 150, flexWrap: "wrap" }}
        direction="row"
        justify="space-between"
        align="flex-start"
      >
        <StyledSelectWithTitle
          value={jewelryStats.selectedTraits[0]}
          onChange={onChangeSelect([0], "SET_JEWELRY_STATS", "selectedTraits")}
          title="Necklace"
          items={jewelryTraits}
        />
        <StyledSelectWithTitle
          value={jewelryStats.selectedTraits[1]}
          onChange={onChangeSelect([1], "SET_JEWELRY_STATS", "selectedTraits")}
          title="Ring 1"
          items={jewelryTraits}
        />
        <StyledSelectWithTitle
          value={jewelryStats.selectedTraits[2]}
          onChange={onChangeSelect([2], "SET_JEWELRY_STATS", "selectedTraits")}
          title="Ring 2"
          items={jewelryTraits}
        />
      </Flex>
    </StyledFlex>
  );
};

const StyledSelectWithTitle = styled(SelectWithTitle)`
  flex: 1;
  min-width: 250px;
  max-width: 250px;

  margin: 0px 10px;
`;
