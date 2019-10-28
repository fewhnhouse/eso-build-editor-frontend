import React, { useContext } from 'react'
import styled from 'styled-components'
import { GroupContext } from '../GroupStateContext'
import DroppableRaidsArea from './DroppableRaidsArea'

const ListContainer = styled.div`
  width: 100%;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
`

export default () => {
  const [state] = useContext(GroupContext)
  const { raids } = state!

  return (
    <ListContainer>
      <DroppableRaidsArea
        raids={raids}
        dropType={'addRaid'}
        dispatchType={'ADD_RAID'}
      />
    </ListContainer>
  )
}
