import React, { useContext } from "react";
import { Divider } from "antd";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import { SelectWithTitle } from "./CustomSelect";
import { SelectValue } from "antd/lib/select";
import { BuildContext, Slot, ISetSelection } from "../BuildStateContext";
import { jewelryGlyphs, jewelryTraits } from "./data";

const StyledFlex = styled(Flex)`
  margin-top: 20px;
  overflow-y: auto;
`;

interface IPiece {
  title: string;
  slot: Slot;
  value: ISetSelection | undefined;
}

interface IMode {
  title: string;
  type: "selectedGlyphs" | "selectedTraits";
}

export default () => {
  const [state, dispatch] = useContext(BuildContext);
  const { jewelrySelection } = state!;
  const neck = jewelrySelection.find(slot => slot.slot === Slot.neck);
  const ring1 = jewelrySelection.find(slot => slot.slot === Slot.ring1);
  const ring2 = jewelrySelection.find(slot => slot.slot === Slot.ring2);

  const pieces: IPiece[] = [
    { title: "Necklace", slot: Slot.neck, value: neck },
    { title: "Ring 1", slot: Slot.ring1, value: ring1 },
    { title: "Ring 2", slot: Slot.ring2, value: ring2 }
  ];

  const modes: IMode[] = [
    { title: "Enchants", type: "selectedGlyphs" },
    { title: "Traits", type: "selectedTraits" }
  ];
  const onChangeSelect = (
    slots: Slot[],
    actionType: string,
    type: "selectedTraits" | "selectedGlyphs"
  ) => (value: SelectValue) => {
    dispatch!({
      type: actionType,
      payload: {
        slots,
        value:
          type === "selectedTraits"
            ? jewelryTraits.find(trait => trait.type === value)
            : jewelryGlyphs.find(glyph => glyph.type === value),
        type
      }
    });
  };

  return (
    <StyledFlex direction="column" justify="center" align="center">
      {modes.map(mode => (
        <div key={mode.title}>
          <Divider>{mode.title}</Divider>
          <Flex
            style={{ width: "100%", minHeigt: 150, flexWrap: "wrap" }}
            direction="row"
            justify="space-between"
            align="flex-start"
          >
            {pieces.map(piece => (
              <StyledSelectWithTitle key={mode.title + "-" + piece.title}
                value={
                  piece && piece.value
                    ? mode.type === "selectedGlyphs"
                      ? piece.value.glyph
                        ? piece.value.glyph.type
                        : ""
                      : piece && piece.value.trait
                      ? piece.value.trait.type
                      : ""
                    : ""
                }
                onChange={onChangeSelect(
                  [piece.slot],
                  "SET_JEWELRY_STATS",
                  mode.type
                )}
                title={piece.title}
                items={
                  mode.type === "selectedGlyphs" ? jewelryGlyphs : jewelryTraits
                }
              />
            ))}
          </Flex>
        </div>
      ))}
    </StyledFlex>
  );
};

const StyledSelectWithTitle = styled(SelectWithTitle)`
  flex: 1;
  min-width: 250px;
  max-width: 250px;

  margin: 0px 10px;
`;
