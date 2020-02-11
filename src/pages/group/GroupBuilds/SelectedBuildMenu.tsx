import React from 'react'
import styled from 'styled-components'
import SelectedBuildList from './SelectedBuildList'

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
      <SelectedBuildList dropType={'addBuild'} dispatchType={'ADD_BUILD'} />
    </ListContainer>
  )
}
