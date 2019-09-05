import React, { useContext, useEffect } from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps, withRouter } from 'react-router'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Card, Spin } from 'antd'
import GearCard from '../../components/GearCard'
import { ISet } from '../../components/GearSlot'
import styled from 'styled-components'
import { AppContext } from '../../components/AppContainer'

const StyledFlex = styled(Flex)`
  height: calc(100vh - 100px);
  width: 100%;
  padding: ${props => props.theme.paddings.medium};
`

const StyledCard = styled(Card)`
  width: 100%;
`

const GET_SETS_BY_ID = gql`
  query Set($id: ID!) {
    set(id: $id) {
      id
      setId
      name
      location
      type
      slug
      bonus_item_1
      bonus_item_2
      bonus_item_3
      bonus_item_4
      bonus_item_5
      has_jewels
      has_weapons
      has_heavy_armor
      has_light_armor
      has_medium_armor
      traits_needed
      pts
      eso_id
    }
  }
`

const SingleSet = ({ match }: RouteComponentProps<any>) => {
  const { id } = match.params
  const [, appDispatch] = useContext(AppContext)

  const { data } = useQuery(GET_SETS_BY_ID, {
    variables: { id: id },
  })

  const set: ISet = data.set ? data.set : ''
  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Set' },
    })
    if (set) {
      appDispatch!({
        type: 'SET_HEADER_SUBTITLE',
        payload: { headerSubTitle: set.name },
      })
    }
  }, [appDispatch, set])

  return set ? (
    <StyledFlex direction='row' align='flex-start'>
      <Flex direction='column' fluid>
        <StyledCard>
          <GearCard size='big' set={set} setSelectionCount={0} />
        </StyledCard>
      </Flex>
    </StyledFlex>
  ) : (
    <Flex fluid justify='center'>
      <Spin />
    </Flex>
  )
}

export default withRouter(SingleSet)
