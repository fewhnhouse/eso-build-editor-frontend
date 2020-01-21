import React from 'react'
import styled from 'styled-components'
import DroppableBuildsArea from './DroppableBuildsArea'

const ListContainer = styled.div`
  width: 100%;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
`

export default () => {
  return (
    <ListContainer>
      <DroppableBuildsArea dropType={'addBuild'} dispatchType={'ADD_BUILD'} />
    </ListContainer>
  )
}
