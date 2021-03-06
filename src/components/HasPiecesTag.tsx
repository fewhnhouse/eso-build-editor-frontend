import React from 'react'
import { ISet } from './gear/GearSlot'
import styled from 'styled-components'

const IconImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: ${(props) => props.theme.margins.mini};
`

const HasPiecesDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`

interface IHasPiecesTag {
  set: ISet
}

export default ({ set }: IHasPiecesTag) => {
  const hasJewel = set.has_jewels === 1 ? true : false
  const hasWpn = set.has_weapons === 1 ? true : false
  const hasArmor =
    set.has_heavy_armor === 1 ||
    set.has_light_armor === 1 ||
    set.has_medium_armor === 1
      ? true
      : false
  return (
    <HasPiecesDiv>
      {hasArmor ? (
        <IconImg
          src={`${process.env.REACT_APP_IMAGE_SERVICE}/gear/slots/chest.png`}
        />
      ) : (
        ''
      )}
      {hasWpn ? (
        <IconImg
          src={`${process.env.REACT_APP_IMAGE_SERVICE}/gear/slots/mainhand.png`}
        />
      ) : (
        ''
      )}
      {hasJewel ? (
        <IconImg
          src={`${process.env.REACT_APP_IMAGE_SERVICE}/gear/slots/ring.png`}
        />
      ) : (
        ''
      )}
    </HasPiecesDiv>
  )
}
