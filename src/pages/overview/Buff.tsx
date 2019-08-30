import React from 'react'
import BuffMenu, {
  ISpecialBuff,
  AttributeTag,
  BuffTypeTag,
  QualityTag,
} from '../build/consumables/BuffMenu'
import Flex from '../../components/Flex'
import { MenuCard, ContentCard, Description, Image } from './Overview'
import { Typography, Divider, Card } from 'antd'

interface IBuffProps {
  context: React.Context<any>
  buff?: ISpecialBuff
}

export default ({ context, buff }: IBuffProps) => {
  return (
    <Flex
      direction='row'
      align='flex-start'
      style={{
        height: 'calc(100vh - 100px)',
        width: '100%',
        padding: 20,
      }}
    >
      <MenuCard minWidth='400px'>
        <BuffMenu context={context} />
      </MenuCard>
      <ContentCard
        bodyStyle={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {buff && (
          <Card>
            <Flex direction='row' align='flex-start' justify='center'>
              <Image
                src={
                  buff
                    ? `${process.env.REACT_APP_IMAGE_SERVICE}/buffs/${buff.icon}`
                    : ''
                }
              />
              <Flex
                direction='column'
                style={{ marginLeft: 20, maxWidth: 600 }}
              >
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {buff.name}
                </Typography.Title>
                <Divider style={{ margin: '10px 0px' }} />
                <Flex
                  direction='row'
                  wrap
                  style={{
                    width: '100%',
                    margin: '10px 0px',
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
                    isSpecialFood={
                      buff.buffType === 'food' && buff.type === null
                    }
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
        )}
      </ContentCard>
    </Flex>
  )
}