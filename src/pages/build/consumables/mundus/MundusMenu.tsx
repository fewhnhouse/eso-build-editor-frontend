import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import MundusMenuList from './MundusMenuList'

export const ListContainer = styled.div`
  flex: 1;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const StyledSpin = styled(Spin)`
  margin-top: ${props => props.theme.margins.mini};
`

export interface IMundusData {
  id?: string
  name: string
  effect: string
  value: string
  icon: string
}

const GET_MUNDUS_STONES = gql`
  query {
    mundusStones {
      id
      name
      effect
      value
      icon
      aldmeri
      daggerfall
      ebonheart
    }
  }
`
export default ({ context }: { context: React.Context<any> }) => {
  const { data, loading, error } = useQuery<
    { mundusStones: IMundusData[] },
    {}
  >(GET_MUNDUS_STONES)

  if (loading) {
    return (
      <ListContainer>
        <StyledSpin />
      </ListContainer>
    )
  }
  if (error) {
    return <div>Error.</div>
  }
  if (data) {
    return <MundusMenuList context={context} data={data} />
  }
  return null
}
