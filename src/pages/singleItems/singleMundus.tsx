import React from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps, withRouter } from 'react-router'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Card, Divider, Typography, Spin } from 'antd'
import { Description, Image } from '../overview/Overview'

const GET_MUNDUS_BY_ID = gql`
  query Munduses($id: ID!) {
    mundusStones(where: { id: $id }) {
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
const { Title } = Typography

const SingleMundus = ({ match }: RouteComponentProps<any>) => {
  const { id } = match.params
  const { data } = useQuery(GET_MUNDUS_BY_ID, {
    variables: { id: id }
  })
  const mundusStone = data.mundusStones ? data.mundusStones[0] : ''
  const parsedMundusValue = parseInt(mundusStone ? mundusStone.value : '')

  return mundusStone ? (
    <Flex
      direction='row'
      align='flex-start'
      style={{
        height: 'calc(100vh - 100px)',
        width: '100%',
        padding: 20
      }}
    >
      <Flex direction='column' fluid>
        <Card style={{ width: '100%' }}>
          <Flex direction='row' align='flex-start' justify='center' fluid>
            <Image
              src={`${process.env.REACT_APP_IMAGE_SERVICE}/mundusStones/${mundusStone.icon}`}
            />
            <Flex
              direction='column'
              fluid
              style={{ marginLeft: 20, maxWidth: 600 }}
            >
              <Title style={{ margin: 0 }}>{mundusStone.name}</Title>
              <Divider style={{ margin: '10px 0px' }} />
              <Description>
                {mundusStone.effect.trim() + ' by ' + mundusStone.value}
                <span style={{ fontStyle: 'italic' }}>
                  {' '}
                  ({Math.round(
                    parsedMundusValue * 0.525 + parsedMundusValue
                  )}{' '}
                  with 7 divines)
                </span>
              </Description>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  ) : (
    <Flex fluid justify='center'>
      <Spin />
    </Flex>
  )
}

export default withRouter(SingleMundus)
