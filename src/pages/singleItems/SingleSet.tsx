import React, { useContext, useEffect } from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps, withRouter } from 'react-router'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Card, Spin } from 'antd'
import GearCard from '../../components/gear/GearCard'
import { ISet } from '../../components/gear/GearSlot'
import styled from 'styled-components'
import { AppContext } from '../../components/AppContainer'
import Scrollbars from 'react-custom-scrollbars'
import { Helmet } from 'react-helmet'
import { useMediaQuery } from 'react-responsive'

const StyledFlex = styled(Flex)`
  height: calc(100vh - 100px);
  width: 100%;
  padding: ${(props) => props.theme.paddings.medium};
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

const setContent = (bonusArray: (string | null)[]) =>
  bonusArray.reduce<string>(
    (prev, curr) => prev + (curr !== null ? ' | ' + curr : ''),
    ''
  )

const SingleSet = ({ match }: RouteComponentProps<any>) => {
  const { id } = match.params
  const [, appDispatch] = useContext(AppContext)
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const { data, loading } = useQuery(GET_SETS_BY_ID, {
    variables: { id: id },
  })

  const set: ISet = data && data.set ? data.set : ''
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
  if (loading) {
    return (
      <Flex fluid justify='center'>
        <Spin />
      </Flex>
    )
  }
  if (set) {
    return (
      <>
        <Scrollbars autoHide>
          <StyledFlex direction='row' align='flex-start'>
            <Flex direction='column' fluid>
              <StyledCard bodyStyle={{ padding: isMobile ? 0 : 24 }}>
                <GearCard size='big' set={set} setSelectionCount={0} />
              </StyledCard>
            </Flex>
          </StyledFlex>
        </Scrollbars>
        <Helmet>
          <title>{set.name}</title>
          <meta
            property='og:url'
            content={`${window.location.origin}/overview/sets/${set.id}`}
          />
          <meta property='og:type' content={'website'} />
          <meta property='og:title' content={set.name} />
          <meta
            property='og:description'
            content={setContent([
              set.bonus_item_1,
              set.bonus_item_2,
              set.bonus_item_3,
              set.bonus_item_4,
              set.bonus_item_5,
            ])}
          />
        </Helmet>
      </>
    )
  }
  return null
}

export default withRouter(SingleSet)
