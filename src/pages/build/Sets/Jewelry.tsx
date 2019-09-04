import React, { useContext } from "react"
import { Divider, Spin } from "antd"
import Flex from "../../../components/Flex"
import styled from "styled-components"
import { SelectWithTitle } from "./CustomSelect"
import { SelectValue } from "antd/lib/select"
import {
  BuildContext,
  Slot,
  ISetSelection,
  IModification,
} from "../BuildStateContext"
import { useQuery } from "react-apollo"
import gql from "graphql-tag"

const StyledFlex = styled(Flex)`
  margin-top: 20px;
  overflow-y: auto;
`

interface IPiece {
  title: string
  slot: Slot
  value: ISetSelection | undefined
}

interface IMode {
  title: string
  type: "selectedGlyphs" | "selectedTraits"
}

const GET_MODIFICATIONS = gql`
  query modifications($where: ModificationWhereInput) {
    modifications(where: $where) {
      type
      itemType
      modificationType
      description
      icon
    }
  }
`

export default () => {
  const [state, dispatch] = useContext(BuildContext)
  const { jewelrySelection } = state!
  const neck = jewelrySelection.find(slot => slot.slot === Slot.neck)
  const ring1 = jewelrySelection.find(slot => slot.slot === Slot.ring1)
  const ring2 = jewelrySelection.find(slot => slot.slot === Slot.ring2)

  const pieces: IPiece[] = [
    { title: "Necklace", slot: Slot.neck, value: neck },
    { title: "Ring 1", slot: Slot.ring1, value: ring1 },
    { title: "Ring 2", slot: Slot.ring2, value: ring2 },
  ]

  const modes: IMode[] = [
    { title: "Enchants", type: "selectedGlyphs" },
    { title: "Traits", type: "selectedTraits" },
  ]
  const glyphQuery = useQuery(GET_MODIFICATIONS, {
    variables: { where: { modificationType: "glyph", itemType: "jewelry" } },
  })
  const traitQuery = useQuery(GET_MODIFICATIONS, {
    variables: { where: { modificationType: "trait", itemType: "jewelry" } },
  })
  if (glyphQuery.loading || traitQuery.loading) {
    return <Spin />
  } else if (glyphQuery.error || traitQuery.error) {
    console.error(glyphQuery.error || traitQuery.error)
    return <div>"Error"</div>
  } else if (glyphQuery.data && traitQuery.data) {
    const jewelryGlyphs: IModification[] = glyphQuery.data.modifications
    const jewelryTraits: IModification[] = traitQuery.data.modifications

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
          type,
        },
      })
    }

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
                <StyledSelectWithTitle
                  key={mode.title + "-" + piece.title}
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
                    mode.type === "selectedGlyphs"
                      ? jewelryGlyphs
                      : jewelryTraits
                  }
                />
              ))}
            </Flex>
          </div>
        ))}
      </StyledFlex>
    )
  } else {
    return null
  }
}

const StyledSelectWithTitle = styled(SelectWithTitle)`
  flex: 1;
  min-width: 300px;
  max-width: 300px;

  margin: 0px 10px;
`
