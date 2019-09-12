import React from 'react'
import Flex from '../../components/Flex'
import { MenuCard, ContentCard, Description } from '../overview/Overview'
import {
  Input,
  Checkbox,
  Divider,
  Rate,
  Select,
  Typography,
  Carousel,
  Card,
} from 'antd'
import { races, classes } from '../build/RaceAndClass/data'
import { applicationAreas } from '../build/RaceAndClass/RaceClass'
import styled from 'styled-components'
import RaidbuildCard from '../raid/Review/RaidbuildCard'
import { useMediaQuery } from 'react-responsive'

const { Option } = Select
const { Title } = Typography

const FeaturedCards = styled(Flex)`
  width: 100%;
`

const MenuFlex = styled(Flex)`
  height: calc(100vh - 100px);
  width: 100%;
  padding: ${props => props.theme.paddings.medium};
`

const StyledBuildCard = styled(Card)`
  max-width: 400px;
`

export default () => {
  const featuredBuilds = [
    {
      role: 'Damage dealer',
      race: 'Breton',
      esoClass: 'Dragonknight',
      description: 'OP build 1 high ranking',
      rating: 5,
    },
    {
      role: 'Healer',
      race: 'Imperial',
      esoClass: 'Templar',
      description: 'Great build good ranking',
      rating: 4,
    },
    {
      role: 'Tank',
      race: 'Khajiit',
      esoClass: 'Necromancer',
      description: 'Some random build',
      rating: 2.5,
    },
  ]
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return (
    <div>
      <Carousel autoplay>
        {featuredBuilds.map(build => (
          <Flex direction='column' align='center' justify='center'>
            <StyledBuildCard title={`${build.role}`}>
              <Description>
                <p>
                  {build.race} {build.esoClass}
                </p>
                <p>{build.description}</p>
              </Description>
              <Rate disabled defaultValue={build.rating} allowHalf />
            </StyledBuildCard>
          </Flex>
        ))}
      </Carousel>

      <MenuFlex direction='row' align='flex-start'>
        <MenuCard isMobile={isMobile}>
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
            alignItems: 'center',
          }}
        >
          <h1>Builds matching filters</h1>
        </ContentCard>
      </MenuFlex>
    </div>
  )
}
