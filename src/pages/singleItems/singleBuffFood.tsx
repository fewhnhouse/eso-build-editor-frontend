import React from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps, withRouter } from 'react-router'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Card, Divider, Typography, Spin } from 'antd'
import { Description, Image } from '../overview/Overview'
import {
  AttributeTag,
  BuffTypeTag,
  QualityTag
} from '../build/consumables/BuffMenu'

const GET_BUFF_BY_ID = gql`
  query Buff($id: ID!) {
    buff(id: $id) {
      name
      icon
      buffDescription
      buffType
      quality
    }
  }
`

const SingleBuffFood = ({ match }: RouteComponentProps<any>) => {
  const { id } = match.params
  const { data } = useQuery(GET_BUFF_BY_ID, {
    variables: { id: id }
  })
  const buff = data.buff ? data.buff : ''

  return buff ? (
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
          <Flex direction='row' align='flex-start' justify='center'>
            <Image
              src={`${process.env.REACT_APP_IMAGE_SERVICE}/buffs/${buff.icon}`}
            />
            <Flex direction='column' style={{ marginLeft: 20, maxWidth: 600 }}>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {buff.name}
              </Typography.Title>
              <Divider style={{ margin: '10px 0px' }} />
              <Flex
                direction='row'
                wrap
                style={{
                  width: '100%',
                  margin: '10px 0px'
                }}
              >
                <AttributeTag
                  hasHealth={buff.buffDescription.includes('Health')}
                  hasMagicka={buff.buffDescription.includes('Magicka')}
                  hasStamina={buff.buffDescription.includes('Stamina')}
                />
                <BuffTypeTag
                  isSpecialDrink={
                    buff.buffType === 'drink' && buff.type === null
                  }
                  isSpecialFood={buff.buffType === 'food' && buff.type === null}
                  isFood={buff.buffType === 'food' && buff.type !== null}
                  isDrink={buff.buffType === 'drink' && buff.type !== null}
                />
                <QualityTag quality={buff.quality} />
              </Flex>
              <Description>{buff.buffDescription}</Description>
              {buff.description && (
                <>
                  <Divider style={{ margin: '5px 0px' }} />
                  <Description style={{ fontStyle: 'italic' }} newEffect>
                    {buff.description}
                  </Description>
                </>
              )}
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

export default withRouter(SingleBuffFood)
