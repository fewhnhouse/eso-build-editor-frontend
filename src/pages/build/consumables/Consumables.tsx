import React, { useContext, useEffect } from 'react'
import BuffMenu from './buff/BuffMenu'
import MundusMenu from './mundus/MundusMenu'
import { BuildContext } from '../BuildStateContext'
import styled from 'styled-components'
import Flex from '../../../components/Flex'

const StyledFlex = styled(Flex)`
  width: 100%;
  height: 100%;
`

export default ({ edit }: { edit: boolean }) => {
  const [state] = useContext(BuildContext)

  useEffect(() => {
    if (!edit) {
      localStorage.setItem('buildState', JSON.stringify(state))
    }
  }, [state, edit])
  return (
    <StyledFlex direction='row'>
      <BuffMenu context={BuildContext} />
      <MundusMenu context={BuildContext} />
    </StyledFlex>
  )
}
