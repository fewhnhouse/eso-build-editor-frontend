import React from 'react'
import Flex from '../../components/Flex'
import { MenuCard, ContentCard } from '../overview/Overview'
import { Input, Checkbox, Divider, Rate, Select, Typography } from 'antd'
import { races, classes } from '../build/RaceAndClass/data'
import { applicationAreas } from '../build/RaceAndClass/RaceClass'
import styled from 'styled-components'
import RaidbuildCard from '../raid/Review/RaidbuildCard'

const { Option } = Select
const { Title } = Typography

const FeaturedCards = styled(Flex)`
  width: 100%;
`

export default () => {
  const featuredBuilds = [
    {
      role: 'Damage dealer',
      race: 'Breton',
      esoClass: 'Dragonknight',
      description: 'OP build 1 high ranking',
      rating: 5
    },
    {
      role: 'Healer',
      race: 'Imperial',
      esoClass: 'Templar',
      description: 'Great build good ranking',
      rating: 4
    },
    {
      role: 'Tank',
      race: 'Khajiit',
      esoClass: 'Necromancer',
      description: 'Some random build',
      rating: 2.5
    }
  ]
  return (
    <div>
      <FeaturedCards direction='row' justify='space-evenly' align='center'>
        <h1>Featured builds</h1>
        {featuredBuilds.map(build => (
          <Flex direction='column' align='center'>
            <RaidbuildCard
              role={build.role}
              race={build.race}
              esoClass={build.esoClass}
              description={build.description}
            />
            <Rate disabled defaultValue={build.rating} allowHalf />
          </Flex>
        ))}
      </FeaturedCards>
      <Flex
        direction='row'
        align='flex-start'
        style={{
          height: 'calc(100vh - 100px)',
          width: '100%',
          padding: 20
        }}
      >
        <MenuCard minWidth='400px'>
          <Title level={3}>Browse public builds</Title>
          <Title level={4}>Filters</Title>
          <Input placeholder='Build name...'></Input>
          <Divider>Classes</Divider>
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Select classes...'
          >
            {classes.map((esoClass, index) => (
              <Option key={index}>{esoClass.title}</Option>
            ))}
          </Select>
          <Divider>Races</Divider>
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Select races...'
          >
            {races.map((race, index) => (
              <Option key={index}>{race.title}</Option>
            ))}
          </Select>
          <Divider>Roles</Divider>
          <Checkbox>Damage dealer</Checkbox>
          <Checkbox>Healer</Checkbox>
          <Checkbox>Tank</Checkbox>
          <Checkbox>Support</Checkbox>
          <Divider>Applicaton areas</Divider>
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Select application areas...'
          >
            {applicationAreas.map((area, index) => (
              <Option key={index}>{area.label}</Option>
            ))}
          </Select>
          <Divider>Minimum rating</Divider>
          <Rate allowHalf defaultValue={2.5} />
        </MenuCard>
        <ContentCard
          bodyStyle={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <h1>Builds matching filters</h1>
        </ContentCard>
      </Flex>
    </div>
  )
}
